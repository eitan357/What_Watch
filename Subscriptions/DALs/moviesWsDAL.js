const axios = require(`axios`);

const readMovies = function () {
  return axios.get(`https://api.tvmaze.com/shows`);
};

const readMovie = function (id) {
  return axios.get(`https://api.tvmaze.com/shows/${id}`);
};

module.exports = { readMovie, readMovies };
