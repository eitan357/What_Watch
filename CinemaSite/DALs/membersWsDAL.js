const axios = require(`axios`).default;

const getAllData = async function () {
  return await axios.get(`http://localhost:8000/api/members`);
};

const getOneDataByName = async function (name) {
  return await axios.get(`http://localhost:8000/api/members/${name}`);
};

const updateData = async function (obj, id) {
  return await axios.put(`http://localhost:8000/api/members/${id}`, obj);
};

const createData = async function (obj) {
  return await axios.post(`http://localhost:8000/api/members`, obj);
};

const deleteData = async function (id) {
  return await axios.delete(`http://localhost:8000/api/members/${id}`);
};

module.exports = {
  getAllData,
  getOneDataByName,
  updateData,
  createData,
  deleteData,
};
