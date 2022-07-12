const usersFileDAL = require(`../../DALs/usersFileDAL`);

const obj = function (data) {
  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    createdDate: Date(data.createdDate),
    sessionTimeOut: Number(data.sessionTimeOut),
  };
};

const getAllData = async function () {
  return await usersFileDAL.readFile();
};

const getOneDataById = async function (id) {
  let users = (await usersFileDAL.readFile()).allUsers;
  let user = users.find((user) => user.id == id);
  return user;
};

const getOneDataByUserName = async function (userName) {
  let users = (await usersFileDAL.readFile()).allUsers;
  let user = users.find(
    (user) => `${user.firstName + user.lastName}` == userName
  );
  return user;
};

const updateDataById = async function (data, id) {
  let users = (await usersFileDAL.readFile()).allUsers;

  let userObj = obj(data);
  let uesrIndex = users.findIndex((user) => user.id == id);
  if (uesrIndex >= 0) users[uesrIndex] = userObj;
  let allData = { allUsers: users };
  let status = await usersFileDAL.writeFile(allData);
  return status;
};

const createData = async function (data) {
  let users = (await usersFileDAL.readFile()).allUsers;

  let userObj = obj(data);
  users.push(userObj);

  let allData = { allUsers: users };
  let status = await usersFileDAL.writeFile(allData);
  return status;
};

const deleteDataById = async function (id) {
  let users = (await usersFileDAL.readFile()).allUsers;

  let uesrIndex = users.findIndex((user) => user.id == id);
  if (uesrIndex >= 0) users.splice(uesrIndex, 1);

  let allData = { allUsers: users };

  let status = await usersFileDAL.writeFile(allData);
  return status;
};

module.exports = {
  getAllData,
  getOneDataById,
  getOneDataByUserName,
  updateDataById,
  createData,
  deleteDataById,
};
