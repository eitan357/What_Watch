const axios = require(`axios`).default;

const getAllData = async function () {
  return await axios.get(`http://localhost:8000/api/subscriptions`);
};

const getOneData = async function (id) {
  return await axios.get(`http://localhost:8000/api/subscriptions/${id}`);
};

const updateData = async function (obj, memberId) {
  return await axios.put(
    `http://localhost:8000/api/subscriptions/${memberId}`,
    obj
  );
};

const createData = async function (obj) {
  return await axios.post(`http://localhost:8000/api/subscriptions`, obj);
};

const deleteData = async function (id) {
  return await axios.delete(`http://localhost:8000/api/subscriptions/${id}`);
};

module.exports = { getAllData, getOneData, updateData, createData, deleteData };
