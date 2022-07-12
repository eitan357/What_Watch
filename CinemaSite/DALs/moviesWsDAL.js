const { create } = require("../../Subscriptions/models/moviesModel");

const axios = require(`axios`).default;

const getAllData = async function () {
  return await axios.get(`http://localhost:8000/api/movies`);
};

const getOneDataByName = async function (name) {
  return await axios.get(`http://localhost:8000/api/movies/${name}`);
};

const updateData = async function (obj, id) {
  return await axios.put(`http://localhost:8000/api/movies/${id}`, obj);
};

const createData = async function (obj) {
  return await axios.post(`http://localhost:8000/api/movies`, obj);
};

const deleteData = async function (name) {
  return await axios.delete(`http://localhost:8000/api/movies/${name}`);
};

module.exports = {
  getAllData,
  getOneDataByName,
  updateData,
  createData,
  deleteData,
};
