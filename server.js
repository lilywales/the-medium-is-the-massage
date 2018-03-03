//load in express, handlebars and file system
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

//creates new app
var app = express();

//partial is a resuable component of the site and define the directory
hbs.registerPartials(__dirname + "/views/partials");

// passing in key value pair, key is what you want to set and the value is what
// you want to use
app.set("view engine", "hbs");

//app.use is how you register middleware, here it is taking in a function
//use function takes in just one function, it gets called with req object
//and the response is the res object, a third arguement is next, which allows
//the app to move on
app.use((req, res, next) => {
	//variable creating a new instance of date object, toSting formats date
	var now = new Date().toString();
	//stores timestamp using variable above, Http method and what page was requested
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	//lets you add on to a file taking in 2 arguements, the file name and the thing
	//you want to add./n allows each log to start a new line
	fs.appendFile("server.log", log + "\n", err => {
		if (err) {
			console.log("Unable to append to server.log.");
		}
	});
	next();
});

//maintenance page for when site is being updated etc
// app.use((req, res, next) => {
// 	res.render("maintenance.hbs");
// });

//middleware function with variable that stores path which you then concatinate with
// /public
app.use(express.static(__dirname + "/public"));

//registers functions to run dynamically
hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});
hbs.registerHelper("loudWords", text => {
	return text.toUpperCase();
});

//register a handler for get request, taking in two arguements, first the url then
// the function to run
app.get("/", (req, res) => {
	res.render("home.hbs", {
		pageTitle: "Home Page",
		welcomeMessage: "medium is the massage"
	});
});

app.get("/about", (req, res) => {
	res.render("about.hbs", {
		pageTitle: "About Page"
	});
});

app.get("/booboo", (req, res) => {
	res.send({
		errorMessage: "isn't here"
	});
});

//decarling which port to listen to
app.listen(3000, () => {
	console.log("Cooey 3000");
});
