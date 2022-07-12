const express = require(`express`);
const subscriptionsBL = require(`../BLs/subscriptionsBL`);

const router = express.Router();
//get all subscriptions
router.get(`/`, async (req, res, next) => {
  let subscriptins = await subscriptionsBL.getAllData();
  return res.json(subscriptins);
});

//get subscription
router.get(`/:memberId`, async (req, res, next) => {
  let memberId = req.params.memberId;
  let subscription = await subscriptionsBL.getOneData(memberId);
  return res.json(subscription);
});

//update subscription
router.put(`/:memberId`, async (req, res, next) => {
  let memberId = req.params.memberId;
  let data = req.body;
  let status = await subscriptionsBL.updateData(data, memberId);
  return res.json(status);
});

//create subscription
router.post(`/`, async (req, res, next) => {
  let data = req.body;
  let status = await subscriptionsBL.createData(data);
  return res.json(status);
});

//delete subscription
router.delete(`/:id`, async (req, res, next) => {
  let id = req.params.id;
  let status = await subscriptionsBL.deleteData(id);
  return res.json(status);
});

module.exports = router;
