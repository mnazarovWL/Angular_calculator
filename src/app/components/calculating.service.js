angular.
module('angularTesting').
factory('calculator', calculate);
function calculate(){
	return doMath;
	function doMath(firstArg,secondArg,operator){
		var result=null;
		var error=null;
		firstArg=parseFloat(firstArg);
		secondArg=parseFloat(secondArg);
		if(isNaN(firstArg)||isNaN(secondArg)){
			//check if arguments is valid
			if(operator=="="){
				return {
					error:null,
					result:firstArg
				};
			} else{
				return {
					result:null,
					error:"Invalid operation"
				};
			}
		}
		//all the math magic
		switch(operator){
			case("+"):
				result=firstArg+secondArg;
				break;
			case("-"):
				result=firstArg-secondArg;
				break;
			case("*"):
				result=firstArg*secondArg;
				break;
			case("/"):
				result=firstArg/secondArg;
				break;
			case("^"):
				result=Math.pow(firstArg,secondArg);
				if(firstArg===0&&secondArg===0){
					//pow doesn't resolve the 0^0 math issue actually, need to handle that by myself
					result=null;
					error="Invalid operation";
				}
				break;
		}
		if(isNaN(result)){
			//handle other issues that math can miss, retrieving the error
			result=null;
			error="Invalid operation";
		}
		return {
			error:error,
			result:result
		};
	}
}
