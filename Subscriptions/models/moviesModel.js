const mongoose = require(`mongoose`);

const moviesSchema = new mongoose.Schema({
  name: String,
  genres: [String],
  image: String,
  premiered: Date,
});

module.exports = mongoose.model('movies', moviesSchema);
