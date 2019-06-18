const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");

//Get our env variables into the process
const dotenv = require("./config/environment");
const singleton = require("./upload/singleton");

const instance = ((env) => {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.get("/", (req, res) => {
		var mathAdder = singleton.getInstance();
		var mathAdderTwo = singleton.getInstance();
		return res.send(mathAdder.add(2).toString() === mathAdderTwo.add(2).toString());
	});
	
	app.get("/error", (req, res, next) => {
		setTimeout(function () {
			try {
				throw new Error("Broken");
			} catch (err) {
				next(err);
			};
		}, 100);
	});
	
	app.get("/hello", (req, res) => {
		return res.status(200).type("application/json").send({
			status: true
		});
	});

	app.post("/post", (req, res) => {
		console.log("req: ", req.body);
		return res.type("application/json").status(200).json(req.body);
	});
	
	app.put("/put", (req, res) => {
		return res.send("putting");
	});

	app.use((req, res, next) => {
		return res.status(404).send("Sorry can't find that!")
	});
	app.use((err, req, res, next) => {
		if (err) {
			next(err);
		};
		return res.status(500).send("Something went wrong");
	});

	app.listen(process.env.API_PORT, () => {
		console.log(`Example app listening on port ${process.env.API_PORT}!`)
	});
	

	return {
		app: app
	};
})(dotenv);

module.exports = instance.app;