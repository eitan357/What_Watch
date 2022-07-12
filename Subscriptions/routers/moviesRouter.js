const express = require("express");
const moviesBL = require(`../BLs/moviesBL`);

const router = express.Router();

//get all movies
router.get(`/`, async (req, res, next) => {
  let movies = await moviesBL.getAllData();
  return res.json(movies);
});

//get movie By name
router.get(`/:name`, async (req, res, next) => {
  let name = req.params.name;
  let movie = await moviesBL.getOneDataByName(name);
  return res.json(movie);
});

//update movie
router.put(`/:id`, async (req, res, next) => {
  let obj = req.body;
  let id = req.params.id;
  let status = await moviesBL.updateDataById(obj, id);
  return res.json(status);
});

//create movie
router.post(`/`, async (req, res, next) => {
  let obj = req.body;
  let status = await moviesBL.createData(obj);
  return res.json(status);
});

//delete movie
router.delete(`/:name`, async (req, res, next) => {
  let name = req.params.name;
  let status = await moviesBL.deleteData(name);
  return res.json(status);
});

module.exports = router;
