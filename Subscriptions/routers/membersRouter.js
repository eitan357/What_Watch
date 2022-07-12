const express = require("express");
const memberBL = require("../BLs/memberBL");

const router = express.Router();

//get All members
router.get(`/`, async (req, res, next) => {
  let members = await memberBL.getAllData();
  return res.json(members);
});

//get member
router.get(`/:name`, async (req, res, next) => {
  let name = req.params.name;
  let member = await memberBL.getOneDataByName(name);
  return res.json(member);
});

//update member
router.put(`/:id`, async (req, res, next) => {
  let obj = req.body;
  let id = req.params.id;
  let status = await memberBL.updateData(obj, id);
  return res.json(status);
});

//create member
router.post(`/`, async (req, res, next) => {
  let obj = req.body;
  let status = await memberBL.createData(obj);
  return res.json(status);
});

//delete member
router.delete(`/:id`, async (req, res, next) => {
  let id = req.params.id;
  let status = await memberBL.deleteData(id);
  return res.json(status);
});

module.exports = router;
