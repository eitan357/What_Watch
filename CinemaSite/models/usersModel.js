const mongoose = require(`mongoose`);

const usersSchema = new mongoose.Schema({
  userName: String,
  password: String,
  administrator: Boolean,
});

module.exports = mongoose.model("users", usersSchema);
