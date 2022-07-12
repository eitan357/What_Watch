const permissionsFileDAL = require(`../../DALs/permissionsFileDAL`);

const obj = function (data) {
  return { id: data.id, permissions: data.permissions };
};

const getAllData = function () {
  return permissionsFileDAL.readFile();
};

const getOneDataById = async function (id) {
  let users = (await permissionsFileDAL.readFile()).users;
  let user = users.find((user) => user.id == id);
  return user;
};

const updateDataById = async function (data, id) {
  let users = (await permissionsFileDAL.readFile()).users;
  let userObj = obj(data);
  let userIndex = users.findIndex((user) => user.id == id);
  if (userIndex >= 0) users[userIndex] = userObj;

  let allData = { users };
  let status = await permissionsFileDAL.writeFile(allData);
  return status;
};

const createData = async function (data) {
  let users = (await permissionsFileDAL.readFile()).users;
  let userObj = obj(data);
  users.push(userObj);
  let allData = { users };
  let status = await permissionsFileDAL.writeFile(allData);
  return status;
};

const deleteDataById = async function (id) {
  let users = (await permissionsFileDAL.readFile()).users;

  let userIndex = users.findIndex((user) => user.id == id);
  if (userIndex >= 0) users.splice(userIndex, 1);
  let allData = { users };
  let status = await permissionsFileDAL.writeFile(allData);
  return status;
};

module.exports = {
  getAllData,
  getOneDataById,
  updateDataById,
  createData,
  deleteDataById,
};
