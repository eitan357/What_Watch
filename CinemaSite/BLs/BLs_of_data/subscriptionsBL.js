const subscriptionsWsDAL = require(`../../DALs/subscriptionsWsDAL`);

const getAllData = function () {
  return subscriptionsWsDAL.getAllData();
};

const getOneData = function (id) {
  return subscriptionsWsDAL.getOneData(id);
};

const updateData = function (data, memberId) {
  return subscriptionsWsDAL.updateData(data, memberId);
};

const createData = function (data) {
  return subscriptionsWsDAL.createData(data);
};

const deleteDataByMemberId = function (id) {
  return subscriptionsWsDAL.deleteData(id);
};

module.exports = {
  getAllData,
  getOneData,
  updateData,
  createData,
  deleteDataByMemberId,
};
