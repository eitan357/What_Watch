const subscriptionsModel = require(`../models/subscriptionsModels`);
const memberBL = require("./memberBL");

const obj = function (data) {
  return {
    memberId: data.memberId,
    movies: data.movies?.map((movie) => {
      return { movieId: movie.movieId, date: movie.date };
    }),
  };
};

const getAllData = function () {
  return new Promise((resolve, reject) => {
    subscriptionsModel.find({}, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const getOneData = function (memberId) {
  return new Promise((resolve, reject) => {
    subscriptionsModel.findOne({ memberId }, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const updateData = async function (data, memberId) {
  return new Promise((resolve, reject) => {
    subscriptionsModel.findOneAndUpdate(
      { memberId },
      obj(data),
      function (err, data) {
        if (err) reject(err);
        else resolve("Update!");
      }
    );
  });
};

const createData = function (data) {
  return new Promise((resolve, reject) => {
    let subscription = subscriptionsModel(obj(data));
    subscription.save(function (err) {
      if (err) reject(err);
      else resolve(`Created!`);
    });
  });
};

const deleteData = function (memberId) {
  return new Promise((resolve, reject) => {
    subscriptionsModel.findOneAndDelete({ memberId }, function (err) {
      if (err) reject(err);
      else resolve(`Deleted!`);
    });
  });
};

module.exports = { getAllData, getOneData, updateData, createData, deleteData };

const createSubacription = (async function () {
  let subacriptionInDB = await getAllData();
  if (subacriptionInDB.length > 0) {
    console.log(`Subacriptions existing`);
  } else {
    const members = await memberBL.getAllData();
    members.forEach((member) => {
      let obj = {
        memberId: String(member._id),
        movies: [],
      };
      createData(obj);
    });
    console.log(`Members creating`);
  }
})();
