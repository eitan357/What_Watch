const moviesModel = require(`../models/moviesModel`);
const movieWsDAL = require(`../DALs/moviesWsDAL`);

const obj = function (data) {
  return {
    name: data.name,
    genres: data.genres,
    image: data.image,
    premiered: data.premiered,
  };
};

const getAllData = function () {
  return new Promise((resolve, reject) => {
    moviesModel.find({}, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const getOneDataByName = function (name) {
  return new Promise((resolve, reject) => {
    moviesModel.find({ name: name }, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const updateDataById = function (data, id) {
  return new Promise((resolve, reject) => {
    moviesModel.findByIdAndUpdate(id, obj(data), function (err) {
      if (err) reject(err);
      else resolve(`Updated!`);
    });
  });
};

const createData = function (data) {
  return new Promise((resolve, reject) => {
    let movie = moviesModel(obj(data));
    movie.save(function (err) {
      if (err) reject(err);
      else resolve(`Created!`);
    });
  });
};

const deleteData = function (name) {
  return new Promise((resolve, reject) => {
    moviesModel.findOneAndDelete({ name }, function (err) {
      if (err) reject(err);
      else resolve(`Deleted!`);
    });
  });
};

module.exports = {
  getAllData,
  createData,
  getOneDataByName,
  updateDataById,
  deleteData,
};

const moviesFromWs = (async function () {
  let moviesInDB = await getAllData();
  if (moviesInDB.length > 0) {
    console.log(`Movies existing`);
  } else {
    let movies = (await movieWsDAL.readMovies()).data;
    movies.forEach((movie) => {
      let obj = {
        name: movie.name,
        genres: movie.genres,
        image: movie.image.original,
        premiered: movie.premiered,
      };
      createData(obj);
    });
    console.log(`Movies creating`);
  }
})();
