const mongoose = require("mongoose");
const { setServers } = require("node:dns").promises;
setServers(["1.1.1.1", "8.8.8.8"]);

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected!"));

module.exports = mongoose;
