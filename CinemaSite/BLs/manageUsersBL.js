const usersdbBL = require(`../models/usersdbBL`);
const usersJsonBL = require(`./BLs_of_data/usersJsonBL`);
const permissionsBL = require(`./BLs_of_data/permissionsBL`);

const getAllUsers = async function () {
  let usersDB = await usersdbBL.getAllData();
  let usersJson = (await usersJsonBL.getAllData()).allUsers;
  let permissions = (await permissionsBL.getAllData()).users;
  let usersData = usersJson.map((user) => {
    let id = user.id;
    let userDB = usersDB.find((user) => user._id == id);
    let userPerm = permissions.find((user) => user.id == id);
    let date = new Date(user.createdDate);

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.firstName + ` ` + user.lastName,
      userName: userDB?.userName,
      sessionTimeOut: user.sessionTimeOut,
      createdDateClient: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      createdDate: user.createdDate,
      permissions: userPerm?.permissions,
    };
  });

  return usersData;
};

let getOneUser = async function (id) {
  let userDB = await usersdbBL.getOneDataById(id);
  let userJson = await usersJsonBL.getOneDataById(id);
  let permissions = (await permissionsBL.getOneDataById(id)).permissions;
  let date = new Date(userJson.createdDate);
  return {
    id: userJson.id,
    firstName: userJson.firstName,
    lastName: userJson.lastName,
    userName: userDB?.userName,
    sessionTimeOut: userJson.sessionTimeOut,
    createdDateClient: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    createdDate: userJson.createdDate,
    permissions: permissions,
  };
};

let updateUser = async function (data, id) {
  let userdbData = { userName: data.userName };
  let status = await usersdbBL.updateDataById(userdbData, id);

  if (status === "Updated!") {
    let userJsonData = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      createdDate: data.createdDate,
      sessionTimeOut: data.sessionTimeOut,
    };
    await usersJsonBL.updateDataById(userJsonData, id);

    let permissionsData = { id: data.id, permissions: data.permissions };
    await permissionsBL.updateDataById(permissionsData, id);
    return `Updated!`;
  } else return "The user name taken";
};

let createUser = async function (data) {
  let userdbData = { userName: data.userName };
  let status = await usersdbBL.createData(userdbData);

  if (status === "Created!") {
    let user = await usersdbBL.getOneDataByUserName(data.userName);
    let id = user.id;

    let userJsonData = {
      id: id,
      firstName: data.firstName,
      lastName: data.lastName,
      createdDate: data.createdDate,
      sessionTimeOut: data.sessionTimeOut,
    };
    await usersJsonBL.createData(userJsonData);

    let permissionsData = { id: id, permissions: data.permissions };
    await permissionsBL.createData(permissionsData);

    return `Created!`;
  } else return "The user name taken";
};

let deleteUser = async function (id) {
  await usersdbBL.deleteDataById(id);
  await usersJsonBL.deleteDataById(id);
  await permissionsBL.deleteDataById(id);
  return `Deleted!`;
};

let permissionsOptions = [
  "View Subscriptions",
  "Create Subscriptions",
  "Delete Subscriptions",
  "Update Subscriptions",
  "SubMovie Subscriptions",
  "View Movies",
  "Create Movies",
  "Delete Movies",
  "Update Movies",
];

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  createUser,
  deleteUser,
  permissionsOptions,
};
