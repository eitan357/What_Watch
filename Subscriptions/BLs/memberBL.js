const membersModel = require("../models/membersModel");
const membersWsDAL = require(`../DALs/membersWsDAL`);

let obj = function (data) {
  return {
    name: data.name,
    email: data.email,
    city: data.city,
  };
};

const getAllData = function () {
  return new Promise((resolve, reject) => {
    membersModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getOneDataByName = function (name) {
  return new Promise((resolve, reject) => {
    membersModel.find({ name: name }, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const updateData = function (data, id) {
  return new Promise((resolve, reject) => {
    membersModel.findByIdAndUpdate(id, obj(data), function (err) {
      if (err) reject(err);
      else resolve(`Updated!`);
    });
  });
};

const createData = function (data) {
  return new Promise((resolve, reject) => {
    let member = membersModel(obj(data));

    member.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(`Created!`);
      }
    });
  });
};

const deleteData = function (id) {
  return new Promise((resolve, reject) => {
    membersModel.findByIdAndDelete(id, function (err) {
      if (err) reject(err);
      else resolve(`Deleted!`);
    });
  });
};

module.exports = {
  getAllData,
  getOneDataByName,
  updateData,
  createData,
  deleteData,
};

const membersFromWs = (async function () {
  let memberInDB = await getAllData();
  if (memberInDB.length > 0) {
    console.log(`Members existing`);
  } else {
    const data = await membersWsDAL.readMembers();
    const members = data.data;
    members.forEach((member) => {
      let obj = {
        name: member.name,
        email: member.email,
        city: member.address.city,
      };
      createData(obj);
    });
    console.log(`Members creating`);
  }
})();
