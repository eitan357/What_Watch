const mongoose = require(`mongoose`);

const subscriptionsSchema = new mongoose.Schema({
  memberId: String,
  movies: [{ movieId: String, date: Date }],
});

module.exports = mongoose.model(`subscriptions`, subscriptionsSchema);
