require("dotenv").config();


const express = require("express");
const app = express();
const port = 3000;
const Router = require("./controllers/index");
const mongoose = require("./configurations/mongoConnection");

const { sendEmail } = require("./helpers/mailer");
Router.get


app.use(express.json());
app.use(express.urlencoded())

// mount our router which already defines /moods paths
app.use("/", Router);

app.listen(port, () => {
	console.log(`Mood Tracker app listening on port ${port}`);
});
