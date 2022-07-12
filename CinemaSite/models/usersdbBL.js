const usersModel = require("./usersModel");

const obj = function (data) {
  return { userName: data.userName, password: data.password };
};

const updateTerms = async function (data, userData) {
  let allUsers = await getAllData();
  let usersName = allUsers.map((user) => user.userName);

  let newUserName = data.userName;

  //userName include and equal to id
  if (usersName.includes(newUserName) && newUserName == userData?.userName) {
    return false;
  }
  //userName include and not equal to id
  else if (
    usersName.includes(newUserName) &&
    newUserName !== userData?.userName
  ) {
    return true;
  }
  //userName uninclude
  else if (!usersName.includes(newUserName)) {
    return false;
  }
};

const getAllData = function () {
  return new Promise((resolve, reject) => {
    usersModel.find({}, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const getOneDataByUserName = function (userName) {
  return new Promise((resolve, reject) => {
    usersModel.findOne({ userName }, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const getOneDataById = function (id) {
  return new Promise((resolve, reject) => {
    usersModel.findById(id, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const updateDataByUserName = async function (data, userName) {
  let userData = await getOneDataByUserName(userName);
  if (await updateTerms(data, userData)) return "The user name taken";

  return new Promise((resolve, reject) => {
    usersModel.findOneAndUpdate({ userName }, obj(data), function (err) {
      if (err) reject(err);
      else resolve(`Updated!`);
    });
  });
};

const updateDataById = async function (data, id) {
  let userData = await getOneDataById(id);
  if (await updateTerms(data, userData)) return "The user name taken";

  return new Promise((resolve, reject) => {
    usersModel.findByIdAndUpdate(id, obj(data), function (err) {
      if (err) reject(err);
      else resolve(`Updated!`);
    });
  });
};

const createData = async function (data) {
  let req = await getAllData();
  let usersName = req.map((user) => user.userName);
  if (usersName.includes(data.userName)) return "The user name taken";

  return new Promise((resolve, reject) => {
    let userObj = usersModel(obj(data));
    userObj.save(function (err) {
      if (err) reject(err);
      else resolve(`Created!`);
    });
  });
};

const deleteDataByUserName = function (userName) {
  return new Promise((resolve, reject) => {
    usersModel.findOneAndDelete({ userName }, function (err) {
      if (err) reject(err);
      else resolve(`Deleted!`);
    });
  });
};

const deleteDataById = function (id) {
  return new Promise((resolve, reject) => {
    usersModel.findByIdAndDelete(id, function (err) {
      if (err) reject(err);
      else resolve(`Deleted!`);
    });
  });
};

module.exports = {
  getAllData,
  getOneDataByUserName,
  getOneDataById,
  updateDataByUserName,
  updateDataById,
  createData,
  deleteDataByUserName,
  deleteDataById,
};
