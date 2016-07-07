//General purpose namespace function

var MY_APP = MY_APP || {};

MY_APP.namespace = function(nsString) {
	//variable parts will store dot separated values in an array
	var parts = nsString.split("."),
	    parentElement = MY_APP,
		i;
	//strip redundant leading global
    if (parts[0] === "MY_APP") {
		parts = parts.slice(1);
	}

	for (i = 0; i < parts.length; i++) {
		//create a property if it doesn't exist
		if (typeof parentElement[parts[i]] === "undefined") {
			parentElement[parts[i]] = {};
		}
		//New defined property itself become new parent element
		parentElement = parentElement[parts[i]];
	}
	return parentElement;
}

var temp = MY_APP.namespace("MY_APP.module1.utilities");

//Private members (properties or methods) in constructors

function Gadget() {
	//private member
	var name = "iPod"; //we need to use var declaration instead of `this`
	//public function
	this.getName = function() {
		return name;
	};
}

//Object literals and privacy

var myobj; //this will be the object

var myModule = (function() {
	//private members
	var name = "EURO 2016";

	//implement the public part, note -- no `var`
	return {
		//privileged method
		getName: function() {
			return name;
		}
	}
}());

//Prototypes and pivacy

function NewGadget(name) {
	//private member
	//this.name = name;
	//public function
	this.getName = function() {
		return name;
	};
	this.isShiny = function() {
		return "you bet!";
	}
}

NewGadget.prototype = (function() {
	//private member
	var browser = "Mobile Webkit";
	//public prototype members
	return {
		getBrowser: function() {
			return browser;
		},
		constructor: NewGadget
	}
}());

var myarray;
(function () {
	var astr = "[object Array]",
		toString = Object.prototype.toString;
	function isArray(a) {
		return toString.call(a) === astr;
	}
	function indexOf(haystack, needle) {
		var i = 0,
			max = haystack.length;
		for (; i < max; i += 1) {
			if (haystack[i] === needle) {
				return i;
			}
		}
		return -1;
	}
	myarray = {
		isArray: isArray,
		indexOf: indexOf,
		inArray: indexOf
	};
}());


//MODULE PATTERN

MY_APP.namespace("MY_APP.utilities.array");

MY_APP.utilities.array = (function() {
	//dependecies
	var uobject = MY_APP.utilities.object,
	    ulang = MY_APP.utilities.lang,

		//private properties
		arrayString = "[object Array]",
		ops = Object.prototype.toString;

		//private methods
		//...


		//optionally one-time init procedures
		//...

	//public API
	return {
		inArray: function(needle, haystack) {
			for (var i = 0, max = haystack.length; i < max; i += 1) {
				if (haystack[i] === needle) {
					return true;
				}
			}
		},
		isArray: function(a) {
			return ops.call(a) === arrayString;
		}
		//more methods and properties
	};
}());

//REVEALING MODULE PATTERN

MY_APP.utilities.array = (function() {
	//dependecies
	var uobject = MY_APP.utilities.object,
	    ulang = MY_APP.utilities.lang,

		//private properties
		arrayString = "[object Array]",
		ops = Object.prototype.toString,

		//private methods
		inArray = function(needle, haystack) {
			for (var i = 0, max = haystack.length; i < max; i += i) {
				if (haystack[i] === needle) {
					return true;
				}
			}
		},
		isArray = function(a) {
			return ops.call(a) === arrayString;
		};
		//end var

	//public API
	return {
		inArray: inArray,
		isArray: isArray
	};

}());


//MODULES THAT CREATE CONSTRUCTORS

MY_APP.namespace("MY_APP.utilities.Array");

MY_APP.utilities.Array = (function() {
	//dependecies
	var uobject = MY_APP.utilities.object,
	    ulang = MY_APP.utilities.lang,

		//private properties and methods...
		Constr;
		//end var

	//optionally one-time init procedures
	//...

	//public API -- constructor
	Constr = function(o) {
		this.elements = this.toArray(o);
	};
	//public API -- prototype
	Constr.prototype = {
		constructor: MY_APP.utilities.Array,
		version: "1.0",
		toArray: function(obj) {
			for (var i = 0, a = [], len = obj.length; i < len; i += 1) {
				a[i] = obj[i];
			}
			return a;
		}
	};

	//return the constructor
	//to be assigned to the new namespace
	return Constr;
}());

//PRIVATE STATIC MEMBERS

/* Definition of `private static member` in JS Patterns:
   - shared by all the objects created with the same constructor;
   - not accessible outside the constructor.

   Better example is given in N. Zachas book `Principles of OO JS`
 */

 //Private member inside the constructor

 var Person = (function() {
	 //private member shared among all instances
	 var age = 31;
	 //function below will be returned as a constructor
	 function InnerPerson(name) {
		 this.name = name;
	 }
	 //setting methods on a prototype
	 InnerPerson.prototype.getAge = function() {
		 return age;
	 };
	 InnerPerson.prototype.growOlder = function() {
		 age++;
	 };

	 return InnerPerson;
 }());

//constructor
var Gadget = (function() {
	//static variable/property
	var counter = 0;
	    NewGadget;
	//returning the new implementation
	//of the constructor
	NewGadget = function() {
		counter += 1;
		this.counter = counter; //`this.counter` points to the variable within this scope, this way it would be ensured that every instance have a unique counter property
	};

	//a privileged method
	NewGadget.prototype.getLastId = function() {
		return counter;
	};

	//overwrite the constructor
	return NewGadget;
}());

/* DESIGN PATTERNS */

//INHERITANCE BY COPYING PROPERTIES

//Creating shallow copy

function extend(parentEl, childEl) {
	var i;
	childEl = childEl || {};
	for (i in parentEl) {
		if (parentEl.hasOwnProperty(i)) {
			childEl[i] = parentEl[i];
		}
	}
	return child;
}

//Creating deep copy

function extendDeep(parentEl, childEl) {
	var i,
	    toStr = Object.prototype.toString,
		astr = "[object Array]";

	childEl = childEl || {};

    for (i in parentEl) {
		if (parentEl.hasOwnProperty(i)) {
			if (typeof parentEl[i] === "object") {
				childEl[i] = (toStr.call(parentEl[i]) === astr) ? [] : {};
				extendDeep(parentEl[i], childEl[i]);
			} else {
				childEl[i] = parentEl[i];
			}
		}
	}
    return childEl;
}

//MIX-IN -- copying properties from more than one object

function mix() {
	var arg, prop, child = {};
	for (arg = 0; arg < arguments.length; arg += 1) {
		for (prop in arguments[arg]) {
			if (arguments[arg].hasOwnProperty(prop)) {
				child[prop] = arguments[arg][prop];
			}
		}
	}
	return child;
}

var cake = mix(
	{eggs: 2, large: true},
	{butter: 1, salted: true},
	{flour: "3 cups"},
	{sugar: "sure!"}
);

//BORROWING METHODS

function f() {
	var arraySlice = [].slice.call(arguments, 1, 3);
	return arraySlice;
}

//implenting Function.prototype.bind in pre ES5 enviroment

if (typeof Function.prototype.bind === "undefined") {
	Function.prototype.bind = function(thisArg) {
		var fn = this,
		    slice = Array.prototype.slice,
			args = slice.call(arguments, 1);

		return function() {
			return fn.apply(thisArg, args.concat(slice.call(arguments)));
		};
	};
}

//Creating singleton with a constructor

/*
  Concept:
    var uni = new Universe();
	var uni2 = new Universe();

	uni === uni2; // true
 */

 function Universe() {
	 //do we have an existing instance?
	 if (typeof Universe.instance === "object") {
		 return Universe.instance;
	 }

	 //proceed as normal
	 this.startTime = 0;
	 this.bang = "big";

	 //cache
	 Universe.instance = this;

	 //implicit return
	 return this;
 }

 //The drawback of the above implementation is that `Universe.instance` is public

 //Implementing sigleton with a costructor with a use of IIFE

 var Universe = (function() {

	 var instance;

	 function Universe() {
		 if (instance) {
			 return instance;
		 }
		 instance = this;
	 }

	 Universe.prototype.startTime = 0;
	 Universe.prototype.bang = "BiG";

	 return Universe;
 }());


 //FACTORY

 //parent constructor
 function CarMaker() {}

 //a method of the parent
 CarMaker.prototype.drive = function() {
	 return "Vroom, I have " + this.doors + " doors";
 };

 //the static factory method
 CarMaker.factory = function(type) {
	 var constr = type,
	     newcar;
	 //error if the constructor doesn't exist
	 if (typeof CarMaker[constr] !== "function") {
		 throw {
			 name: "Error",
			 message: constr + " doesn't exist"
		 };
	 }

	 //at this point the constructor is known to exist
	 //let's have it inherit the parent but only once
	 if (typeof CarMaker[constr].prototype.drive !== "function") {
		 CarMaker[constr].prototype = Object.create(CarMaker.prototype);

		 //fragment below will have the same effect

		 //CarMaker[constr].prototype = new CarMaker();
	 }
	 //create a new instance
	 newcar = new CarMaker[constr]();
	 //optionally call some methods
	 //...
	 return newcar;
 };

 //define specific car makers
 CarMaker.Compact = function() {
	 this.doors = 4;
 };

 CarMaker.Convertible = function() {
	 this.doors = 2;
 };

 CarMaker.SUV = function() {
	 this.doors = 24;
 };
