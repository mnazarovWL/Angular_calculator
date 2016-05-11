(function() {
  'use strict';

  angular
    .module('angularTesting')
    .controller('MainController',["$scope","calculator", MainController]);

  /** @ngInject */
  function MainController($scope,calculator) {
    //This calculator works on a flow, means the calculating will be works, till you click on = or C.
    var firstArg=null;
    var method=null;
    var lastResult=null;
    var input=angular.element(document).find("input")[0];
    var history=angular.element(document).find("span");

    $scope.getArgument=function(argument,operator){
      //getting the argument and handling the click on operations
      if(argument.value){
        if(firstArg&&method){
          handleResponse(operator,argument);
        } else{
          firstArg=argument.value;
          method=operator;
          argument.value="";
        }
      }
      input.focus();
    };

    $scope.getAnswer=function(argument){
      //handles the click on =
      if(argument.value&&firstArg){
        handleResponse(null,argument);
      } else if(firstArg&&!argument.value) {
        argument.value=lastResult;
        firstArg=null;
        method=null;
      }
      input.focus();
    };
    $scope.clear=function(argument){
      //handles the click on C, clear all the stuff, except history
      firstArg=null;
      method=null;
      lastResult=null;
      argument.value="";
      input.focus();
    };
    function handleResponse(operator,argument){
      //call to a calculating service and retrieving the result
      var calculated=calculator(firstArg,argument.value,method);
      if(calculated.error){
        argument.value=calculated.error;
        method=false;
        firstArg=false;
        lastResult=null;
      } else {
        addToHistory(argument.value,calculated.result);
        method=operator?operator:null;
        argument.value=operator?"":calculated.result;
        firstArg=operator?calculated.result:null;
        lastResult=calculated.result;
      }
    }
    function addToHistory(secArg,answer){
      //add a result of an operations to a history
      history.append("<p>"+firstArg+" "+method+" "+secArg+" = "+answer+"</p>");
    }
  }
})();
