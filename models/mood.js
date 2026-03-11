const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Define the Mood schema (isian const yang akan disimpan di database)

const moodSchema = new Schema(
	{
		id: ObjectId, //generate unique id for each mood entry
		mood: String,
		date: Number, 
		intensity: Number,
	},
	{
		timestamps: true,
	},
);

const Mood = mongoose.model("Mood", moodSchema);
module.exports = Mood;
