// define all of our methods that we will use on the webpage
function createFunction() {
    // literal syntax
    var shape1 = { };

    // constructor syntax
    var shape2 = new Object();
    var result = 
        'Not much to see but we did create TWO objects!' + "<br>" +
        'These objects are currently empty. They do not' + "<br>" +
        'have anything inside of them right now.';

    document.getElementById("create_results").innerHTML = result;
    document.getElementById("create_results").classList.add("result");

    // hide the button
    document.getElementById("b_create").style.display = "none";
}

function retrieve() {
    // literal syntax
    var shape1 = { 
    //  key      : value
        name     : "Square",        // string
        length   : 5,               // number
        height   : 10,              // number
        color    : "Red",           // string
        favorite : true,            // boolean
        extra    : { },             // object
        sides    : [5, 10, 5, 10],  // array (number)
        area     : function () {    // function (number)
            return this.height * this.length;
        }
    };

    // retrive data from our object and send it to the webpage
    var result =
        'shape1 is a ' + shape1.name + '<br>' +
        'It is ' + shape1["length"] + 'x' + shape1["height"] + ' with an area of: ' + shape1.area() + '<br>' +
        'Try to picture a ' + shape1.color + ' one right now!';

    document.getElementById("retrieve_results").innerHTML = result;
    document.getElementById("retrieve_results").classList.add("result");
    
    // hide the button
    document.getElementById("b_retrieve").style.display = "none";
}

function methods() {
    // literal syntax
    var shape1 = { 
    //  key      : value
        name     : "Square",        // string
        length   : 5,               // number
        height   : 10,              // number
        color    : "Red",           // string
        favorite : true,            // boolean
        extra    : { },             // object
        sides    : [5, 10, 5, 10],  // array (number)
        area     : function () {    // function (number)
            return this.height * this.length;
        }
    };

    // retrive data from our object and send it to the webpage
    var result =
        'shape1 is a ' + shape1.name.toUpperCase() + '<br>' +
        'It is ' + shape1["length"] + 'x' + shape1["height"] + ' with an area of: ' + shape1.area() + '<br>' +
        'Try to picture a ' + shape1.color.toUpperCase() + ' one right now!';

    document.getElementById("methods_results").innerHTML = result;
    document.getElementById("methods_results").classList.add("result");

    // hide the button
    document.getElementById("b_methods").style.display = "none";
}

function inheritance() {
    // literal syntax
    var shape1 = { 
    //  key      : value
        name     : "Square",        // string
        length   : 5,               // number
        height   : 10,              // number
        color    : "Red",           // string
        favorite : true,            // boolean
        extra    : { },             // object
        sides    : [5, 10, 5, 10],  // array (number)
        area     : function () {    // function (number)
            return this.height * this.length;
        }
    };

    // create a copy of our shape1
    var shape1copy = Object.create(shape1);

    // retrive data from our object and send it to the webpage
    var result = 
        'shape1copy is a ' + shape1copy.name + '<br>' +
        'It is ' + shape1copy["length"] + 'x' + shape1copy["height"] + ' with an area of: ' + shape1copy.area() + '<br>' +
        'Try to picture a ' + shape1copy.color + ' one right now!' + '<br>';

    // prove that they are the same
    if (shape1.length == shape1copy.length) {
        result = result + 'They ARE the same!';
    }
    else {
        result = result + 'They are NOT the same!';
    }

    document.getElementById("inheritance_results").innerHTML = result;
    document.getElementById("inheritance_results").classList.add("result");

    document.getElementById("b_inheritance").style.display = "none";
}

/*
 *  Functional
 */

function functional() {
    var myShape = Shape1('Square', 10, 5, 'Red');

    // retrive data from our object and send it to the webpage
    var result = 
        'shape1 is a ' + myShape.name + '<br>' +
        'It is ' + myShape["length"] + 'x' + myShape["height"] + ' with an area of: ' + myShape.area() + '<br>' +
        'Try to picture a ' + myShape.color + ' one right now!' + 
        '<ul>Pros:' + 
            '<li>Easy to understand because all the functions are contained within the object</li>' + 
            '<li>Properties are private since they are contained within the closure scope</li>' + 
        '</ul>' +
        '<ul>Cons:' + 
            '<li>If you create a second instance of that object, you will have duplicated all the properties and methods in memory</li>' + 
            '<li>If you create a new object using this method, then change any of the methods and create a new instance, the two objects will be referencing different methods</li>' + 
        '</ul>';

    document.getElementById("functional_results").innerHTML = result;
    document.getElementById("functional_results").classList.add("result");

    document.getElementById("b_functional").style.display = "none";
}

var Shape1 = function(name, length, height, color) {
    var obj = { };

    // .key    = value
    obj.name   = name;
    obj.length = length;
    obj.height = height;
    obj.color  = color;

    // functions
    obj.area = function() {
        return length * height;
    }

    obj.perimeter = function() {
        return (2 * length) + (2 * height);
    }

    // return our object to the caller
    return obj;
}

/*
 *  Functional-Shared
 */

function functionalshared() {
    var myShape = Shape2('Square', 10, 5, 'Red');

    // retrive data from our object and send it to the webpage
    result = 
        'shape2 is a ' + myShape.name + '<br>' +
        'It is ' + myShape["length"] + 'x' + myShape["height"] + ' with an area of: ' + myShape.area() + '<br>' +
        'Try to picture a ' + myShape.color + ' one right now!' + 
        '<ul>Pros:' + 
            '<li>Removes the duplication of methods that was found in functional instantiation</li>' +
            '<li>Improves memory management</li>' + 
        '</ul>' +
        '<ul>Cons:' +
            '<li>The pointers to the shared methods are created when the object is instantiated</li>' +
            '<li>If you modify the methods and then create new objects, they original object and the new object will refer to different methods</li>' +
        '</ul>';

    document.getElementById("functionalshared_results").innerHTML = result;
    document.getElementById("functionalshared_results").classList.add("result");

    document.getElementById("b_functionalshared").style.display = "none";
}

var Shape2 = function(name, length, height, color) {
    var obj = { };

    // .key    = value
    obj.name   = name;
    obj.length = length;
    obj.height = height;
    obj.color  = color;

    // call our extend() to add the functions
    extend(obj, obj2Methods);

    // return our object to the caller
    return obj;
}

// add the passed in function object to the passed in object
var extend = function(obj, methods) {
    for (var key in methods) {
        obj[key] = methods[key];
    }
}

// our object with all of the functions
var obj2Methods = {
    area      : function() {
        return this.length * this.height;
    },
    perimeter : function() {
        return (2 * this.length) + (2 * this.height);
    }
}

/*
 *  Prototypal
 */

function prototypal() {
    var myShape = Shape3('Square', 10, 5, 'Red');

    // retrive data from our object and send it to the webpage
    result = 
        'shape3 is a ' + myShape.name + '<br>' +
        'It is ' + myShape["length"] + 'x' + myShape["height"] + ' with an area of: ' + myShape.area() + '<br>' +
        'Try to picture a ' + myShape.color + ' one right now!' + 
        '<ul>Pros:' + 
            '<li>Methods are attached to the object’s prototype instead of being returned within the object</li>' +
            '<li>Every method is available to every object created without duplicating methods in memory</li>' + 
        '</ul>' +
        '<ul>Cons:' +
            '<li>You have to create an object, decorate it and then return it from the constructor function</li>' +
        '</ul>';

    document.getElementById("prototypal_results").innerHTML = result;
    document.getElementById("prototypal_results").classList.add("result");

    document.getElementById("b_prototypal").style.display = "none";
}

var Shape3 = function(name, length, height, color) {
    var obj = Object.create(obj3Methods);

    // .key    = value
    obj.name   = name;
    obj.length = length;
    obj.height = height;
    obj.color  = color;

    // return our object to the caller
    return obj;
}

var obj3Methods = {
    area      : function() {
        return this.length * this.height;
    },
    perimeter : function() {
        return (2 * this.length) + (2 * this.height);
    }
}

/*
 *  Pseudoclassical
 */

function pseudoclassical() {
    var myShape = new Shape4('Square', 10, 5, 'Red');

    // retrive data from our object and send it to the webpage
    result = 
        'shape4 is a ' + myShape.name + '<br>' +
        'It is ' + myShape["length"] + 'x' + myShape["height"] + ' with an area of: ' + myShape.area() + '<br>' +
        'Try to picture a ' + myShape.color + ' one right now!' + 
        '<ul>Pros:' + 
            '<li>The most optimized method of object creation</li>' + 
        '</ul>' +
        '<ul>Cons:' +
            '<li>It is a little more complex in its design</li>' +
        '</ul>';

    document.getElementById("pseudoclassical_results").innerHTML = result;
    document.getElementById("pseudoclassical_results").classList.add("result");

    document.getElementById("b_pseudoclassical").style.display = "none";
}

var Shape4 = function(name, length, height, color) {
    //  .key    = value
    this.name   = name;
    this.length = length;
    this.height = height;
    this.color  = color;
}

// functions
Shape4.prototype.area = function() {
    return this.length * this.height;
}

Shape4.prototype.perimeter = function() {
    return (2 * this.length) + (2 * this.height);
}

/*
 * Update 1
 */

var ShapeExample = function(name, numSides, length) {
    this.name = name.toUpperCase();
    this.numSides = Number(numSides);
    this.length = Number(length);

    switch (this.numSides) {
        case 3:
            this.area = TriArea(this.length);
            break;
        case 4:
            this.area = SquareArea(this.length);
            break;
        case 5:
            this.area = PentaArea(this.length);
            break;
        case 6:
            this.area = HexaArea(this.length);
            break;
        case 7:
            this.area = HeptaArea(this.length);
            break;
        case 8:
            this.area = OctaArea(this.length);
            break;
        case 9:
            this.area = NonaArea(this.length);
            break;
        case 10:
            this.area = DecaArea(this.length);
            break;
    }
}

ShapeExample.prototype.perimeter = function() {
    return this.length * this.numSides;
}

function TriArea(length) {
    var a = b = c = length;

    return (0.25 * Math.sqrt( (a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c) ));
}

function SquareArea(length) {
    var a = b = length;

    return (a * b);
}

function PentaArea(length) {
    var a = length;

    return (0.25 * Math.sqrt( 5 * (5 + 2 * Math.sqrt(5))) * (a * a));
}

function HexaArea(length) {
    var a = length;

    return (((3 * Math.sqrt(3)) / 2) * (a * a));
}

function HeptaArea(length) {
    var a = length;

    return (((a * a) * 7) / (4 * Math.tan(Math.PI/7)));
}

function OctaArea(length) {
    var a = length;

    return (2 * (1 + Math.sqrt(2)) * (a * a));
}

function NonaArea(length) {
    var a = length;

    return ((a * a) * 9) / (4 * Math.tan(Math.PI/9));
}

function DecaArea(length) {
    var a = length;

    return ((5/2) * (a * a) * Math.sqrt(5 + 2 * Math.sqrt(5)));
}

function parameter() {
    var sel = document.getElementById("shape");

    var name = sel.options[sel.selectedIndex].text;
    var numSides = document.getElementById("shape").value;
    var length = document.getElementById("length").value;
    var result = "";

    var objShape = new ShapeExample(name, numSides, length);

    result = 
    'A ' + objShape.name + ' has ' + objShape.numSides + ' sides. <br>' +
    'With your length of ' + objShape.length + '  ... <br>' +
    'Area: ' + objShape.area + '<br>' +
    'Perimeter: ' + objShape.perimeter() + '<br>';;

    document.getElementById("calculate_results").innerHTML = result;
    document.getElementById("calculate_results").classList.add("result");
}