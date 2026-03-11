const Mood = require("../models/mood");
const express = require("express");
const Router = express.Router();
const User = require("../models/users");
const { compare } = require("../helpers/password");
const { generateToken } = require("../helpers/token");

// post
//register: buat daftar akun baru, dapat token
Router.post("/register", (req, res, next) => {
	const { email, password } = req.body || {};

	User.create({ email, password })
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			next(err);
		});
});

//login: buat masuk ke aplikasi, dapat token
Router.post("/login", (req, res, next) => {
	const { email, password } = req.body;
	User.findOne({ email })
		.then((user) => {
			//cek user exist
			if (user) {
				//cek pass match
				const isMatch = compare(password, user.password);
				if (isMatch) {
					const token = generateToken({
						id: user._id,
						email: user.email,
					});
					res.json({
						id: user._id,
						email: user.email,
						token,
					});
				} else {
					res.status(401).json({
						message: "Invalid email or password",
					});
				}
			} else {
				res.status(401).json({ message: "Invalid email or password" });
			}
		})
		.catch((err) => {
			next(err);
		});
});

//yang di postman
Router.get("/", (req, res) => {
	Mood.find()
		.then((moods) => {
			res.json(moods);
		})
		.catch((err) => {
			console.log(err);
			res.send(err);
		});
});

//read data by id
Router.get('/"id"', (req, res) => {
	Mood.findById(req.params.id)
		.then((mood) => {
			res.json(mood);
		})
		.catch((err) => {
			console.log(err);
			res.send(err);
		});
});

//create new mood
Router.post("/", (req, res) => {
	let { mood, date, intensity } = req.body;

	date = Number(date);
	intensity = Number(intensity);

	Mood.create({ mood, date, intensity })
		.then((mood) => {
			res.json(mood);
		})
		.catch((err) => {
			console.log(err);
			res.send(err);
		});
});

//update data by id
Router.put("/:id", (req, res) => {
	let { mood, date, intensity } = req.body;

	date = Number(date);
	intensity = Number(intensity);

	Mood.findByIdAndUpdate(req.params.id, { mood, date, intensity })
		.then((mood) => {
			res.json(mood);
		})
		.catch((err) => {
			console.log(err);
			res.send(err);
		});
});

//delete data by id
Router.delete("/:id", (req, res) => {
	Mood.findByIdAndDelete(req.params.id)
		.then((mood) => {
			res.json(
				(message = `Mood with id ${req.params.id} has been deleted`),
			);
		})
		.catch((err) => {
			console.log(err);
			res.send(err);
		});
});

module.exports = Router;
