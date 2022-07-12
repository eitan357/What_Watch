const memberWsDAL = require(`../../DALs/membersWsDAL`);

const getAllData = function () {
  return memberWsDAL.getAllData();
};

const getOneDataByName = function (name) {
  return memberWsDAL.getOneDataByName(name);
};

const updateData = function (data, id) {
  return memberWsDAL.updateData(data, id);
};

const createData = function (data) {
  return memberWsDAL.createData(data);
};

const deleteData = function (id) {
  return memberWsDAL.deleteData(id);
};

module.exports = {
  getAllData,
  getOneDataByName,
  updateData,
  createData,
  deleteData,
};
