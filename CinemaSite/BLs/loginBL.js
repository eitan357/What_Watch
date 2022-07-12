const usersdbBL = require(`../models/usersdbBL`);
const usersJsonBL = require(`./BLs_of_data/usersJsonBL`);
const permissionsBL = require(`./BLs_of_data/permissionsBL`);

const checksData = async function (userName, password) {
  let users = await usersdbBL.getAllData();
  let user = users.find((user) => user.userName == userName);
  if (user && user.password == password) return true;
  else return false;
};

const getUserId = async function (userName, password) {
  if (await checksData(userName, password)) {
    let user = await usersdbBL.getOneDataByUserName(userName);
    let id = user.id;
    return id;
  }
};

const sessionTimeOut = async function (id) {
  let user = await usersJsonBL.getOneDataById(id);
  let timeOut = user?.sessionTimeOut;
  return timeOut;
};

let createAccount = async function (data, userName) {
  await usersdbBL.updateDataByUserName(data, userName);
  return `Created!`;
};

let getPermissions = async function (id) {
  return (await permissionsBL.getOneDataById(id))?.permissions;
};

let permissionStatus = function (permissions, permValue) {
  if (permissions?.find((per) => per == String(permValue))) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  checksData,
  getUserId,
  sessionTimeOut,
  createAccount,
  getPermissions,
  permissionStatus,
};
