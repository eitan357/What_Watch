const moviesWsDAL = require(`../../DALs/moviesWsDAL`);

const getAllData = function () {
  return moviesWsDAL.getAllData();
};

const getOneDataByName = function (name) {
  return moviesWsDAL.getOneDataByName(name);
};

const createData = function (data) {
  return moviesWsDAL.createData(data);
};

const updateDataById = function (data, id) {
  return moviesWsDAL.updateData(data, id);
};

const deleteData = function (name) {
  return moviesWsDAL.deleteData(name);
};

module.exports = {
  getAllData,
  getOneDataByName,
  updateDataById,
  createData,
  deleteData,
};
