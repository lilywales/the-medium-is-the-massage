const express = require("express");
const hbs = require("hbs");

var app = express();

app.set("view engine", "hbs");
//middleware function with variable that stores path which you then concatinate with /public
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	//res.send("<h1>Welcome Lisa</h1>");
	res.render("home.hbs", {
		pageTitle: "Home Page",
		welcomeMessage: "medium is the massage",
		currentYear: new Date().getFullYear()
	});
});

app.get("/about", (req, res) => {
	res.render("about.hbs", {
		pageTitle: "About Page",
		currentYear: new Date().getFullYear()
	});
});

app.get("/booboo", (req, res) => {
	res.send({
		errorMessage: "isn't here"
	});
});

app.listen(3000, () => {
	console.log("Cooey 3000");
});
