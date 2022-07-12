const express = require(`express`);
const loginRouter = require(`./loginRouter`);
const manageUsersBL = require(`../BLs/manageUsersBL`);

const router = express.Router();

const adminPerm = function (req, res, next) {
  if (req.session.admin) next();
  else res.status(500).render("login/unauthorized", {});
};

//get all users - usersPage
router.get(
  `/usersPage`,
  loginRouter.authenticateToken,
  adminPerm,
  async function (req, res, next) {
    let users = await manageUsersBL.getAllUsers();
    let admin = req.session.admin;
    res.render(`users/usersPage`, { admin, users });
  }
);

//get one user - userEdit
router.get(
  `/usersPage/userEdit/:id`,
  loginRouter.authenticateToken,
  adminPerm,
  async function (req, res, next) {
    let id = req.params.id;
    let user = await manageUsersBL.getOneUser(id);

    let perm = manageUsersBL.permissionsOptions.map((per) => {
      if (user.permissions?.find((perm) => perm == per))
        return ["checked", per];
      else return ["unchecked", per];
    });

    let admin = req.session.admin;
    res.render(`users/userEdit`, { admin, user, permissions: perm });
  }
);

//createUser - userAdd
router.get(
  `/userAdd`,
  loginRouter.authenticateToken,
  adminPerm,
  async function (req, res, next) {
    let permissions = manageUsersBL.permissionsOptions;
    let createdDate = new Date();
    let createdDateClient = `${createdDate.getDate()}/${createdDate.getMonth()}/${createdDate.getFullYear()}`;
    let admin = req.session.admin;
    res.render(`users/userAdd`, {
      permissions,
      createdDate,
      createdDateClient,
      admin,
    });
  }
);

router.post(
  `/usersPage`,
  loginRouter.authenticateToken,
  adminPerm,
  async function (req, res, next) {
    let data = req.body;

    let obj = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      sessionTimeOut: data.sessionTimeOut,
      createdDate: data.createdDate,
      permissions: [data.permissions].flat(),
    };

    // create user
    if (req.body.Create) {
      await manageUsersBL.createUser(obj);
    }
    //delete user
    if (req.body.Delete) {
      let id = req.body.id;
      await manageUsersBL.deleteUser(id);
    }
    //update user
    if (req.body.Update) {
      let id = req.body.id;
      await manageUsersBL.updateUser(obj, id);
    }

    let users = await manageUsersBL.getAllUsers();
    let admin = req.session.admin;
    res.render(`users/usersPage`, { admin, users });
  }
);

module.exports = router;
