const mongoose = require('mongoose');
const { setServers } = require ("node:dns").promises;
setServers(["1.1.1.1", "8.8.8.8"]);

mongoose
	.connect("mongodb+srv://nalaajei:nala123@cluster0.6qdderb.mongodb.net/test")
	.then(() => console.log("Connected!"));

module.exports = mongoose;