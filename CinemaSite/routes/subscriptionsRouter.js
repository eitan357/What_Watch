const express = require(`express`);
const loginRouter = require(`./loginRouter`);
const manageSubscriptionsBL = require(`../BLs/manageSubscriptionsBL`);

const router = express.Router();

//permission
const viewSubPerm = function (req, res, next) {
  if (req.session.viewSubPerm) next();
  else res.status(500).render("login/unauthorized", {});
};
const createSubPerm = function (req, res, next) {
  if (req.session.createSubPerm) next();
  else res.status(500).render("login/unauthorized", {});
};
const updateSubPerm = function (req, res, next) {
  if (req.session.updateSubPerm) next();
  else res.status(500).render("login/unauthorized", {});
};
///

//get all members
router.get(
  `/membersPage`,
  loginRouter.authenticateToken,
  viewSubPerm,
  async function (req, res, next) {
    let subscriptions = [];
    if (req.query.name) {
      let name = req.query.name;
      subscriptions = await manageSubscriptionsBL.getOneMember(name);
    } else {
      subscriptions = await manageSubscriptionsBL.getAllMembers();
    }

    //permissions
    let admin = req.session.admin;
    let viewMoviesPerm = req.session.viewMoviesPerm;
    let viewSubPerm = req.session.viewSubPerm;
    let createSubPerm = req.session.createSubPerm;
    let updateSubPerm = req.session.updateSubPerm;
    let deleteSubPerm = req.session.deleteSubPerm;
    let SubMovieSubPerm = req.session.SubMovieSubPerm;

    res.render("subscriptions/membersPage", {
      admin,
      subscriptions,
      viewMoviesPerm,
      viewSubPerm,
      createSubPerm,
      updateSubPerm,
      deleteSubPerm,
      SubMovieSubPerm,
    });
  }
);

//edit - get one member
router.get(
  `/membersPage/memberEdit/:name`,
  loginRouter.authenticateToken,
  viewSubPerm,
  updateSubPerm,
  async function (req, res, next) {
    let name = req.params.name;
    let member = await manageSubscriptionsBL.getOneMember(name);
    let admin = req.session.admin;
    let viewMoviesPerm = req.session.viewMoviesPerm;
    let viewSubPerm = req.session.viewSubPerm;
    res.render("subscriptions/memberEdit", {
      admin,
      member,
      viewMoviesPerm,
      viewSubPerm,
    });
  }
);

//add member Page
router.get(
  `/memberAdd`,
  loginRouter.authenticateToken,
  viewSubPerm,
  createSubPerm,
  async function (req, res, next) {
    let admin = req.session.admin;
    let viewMoviesPerm = req.session.viewMoviesPerm;
    let viewSubPerm = req.session.viewSubPerm;
    res.render("subscriptions/memberAdd", {
      admin,
      viewMoviesPerm,
      viewSubPerm,
    });
  }
);

//update create delete fucntion
router.post(
  `/membersPage`,
  loginRouter.authenticateToken,
  viewSubPerm,
  async function (req, res, next) {
    let obj = req.body;

    if (req.body.Update && !req.body.firstName == "") {
      let id = req.body.id;
      await manageSubscriptionsBL.updateMemberSub(obj, id);
    }

    if (req.body.Save && !req.body.firstName == "") {
      await manageSubscriptionsBL.createMember(obj);
    }

    if (req.body.Delete) {
      let id = req.body.id;
      await manageSubscriptionsBL.deleteMember(id);
    }

    let subscriptions = await manageSubscriptionsBL.getAllMembers();
    let admin = req.session.admin;
    let viewMoviesPerm = req.session.viewMoviesPerm;
    let viewSubPerm = req.session.viewSubPerm;
    let createSubPerm = req.session.createSubPerm;
    let updateSubPerm = req.session.updateSubPerm;
    let deleteSubPerm = req.session.deleteSubPerm;
    let SubMovieSubPerm = req.session.SubMovieSubPerm;
    res.render("subscriptions/membersPage", {
      admin,
      subscriptions,
      viewMoviesPerm,
      viewSubPerm,
      createSubPerm,
      updateSubPerm,
      deleteSubPerm,
      SubMovieSubPerm,
    });
  }
);

module.exports = router;
