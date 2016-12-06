/*
function connect()
{
	// Retrieve
	var MongoClient = require('mongodb').MongoClient;

	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
	  if(!err) {
	    console.log("We are connected");
	  }
	});
}
*/


"use strict";

var R = require('ramda');

var square = function square (x) { return x * x; }  
var squares = R.chain(square, [1, 2, 3, 4, 5]); 

document.getElementById('response').innerHTML = squares;