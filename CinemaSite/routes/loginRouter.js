const express = require("express");
const jwt = require(`jsonwebtoken`);

const loginBL = require(`../BLs/loginBL`);

const router = express.Router();

const login = async function (req, res, next) {
  req.session.admin = false;

  let userName = req.body.userName;
  let password = req.body.password;

  if (await loginBL.checksData(userName, password)) {
    let _id = await loginBL.getUserId(userName, password);
    let sessionTimeOut = await loginBL.sessionTimeOut(_id);
    console.log(sessionTimeOut);
    //permissions
    let permissions = await loginBL.getPermissions(_id);
    req.session.viewSubPerm = loginBL.permissionStatus(
      permissions,
      "View Subscriptions"
    );
    req.session.createSubPerm = loginBL.permissionStatus(
      permissions,
      "Create Subscriptions"
    );
    req.session.deleteSubPerm = loginBL.permissionStatus(
      permissions,
      "Delete Subscriptions"
    );
    req.session.updateSubPerm = loginBL.permissionStatus(
      permissions,
      "Update Subscriptions"
    );
    req.session.SubMovieSubPerm = loginBL.permissionStatus(
      permissions,
      "SubMovie Subscriptions"
    );
    req.session.viewMoviesPerm = loginBL.permissionStatus(
      permissions,
      "View Movies"
    );
    req.session.createMoviesPerm = loginBL.permissionStatus(
      permissions,
      "Create Movies"
    );
    req.session.deleteMoviesPerm = loginBL.permissionStatus(
      permissions,
      "Delete Movies"
    );
    req.session.updateMoviesPerm = loginBL.permissionStatus(
      permissions,
      "Update Movies"
    );
    ///
    const PRIVATE_KEY = `somekey`;

    let tokenData = jwt.sign({ id: _id }, PRIVATE_KEY, {
      expiresIn: sessionTimeOut * 60,
    });
    req.session.userName = userName;
    req.session.password = password;
    req.session.token = tokenData;
    req.session._id = _id;
    if (userName === `Admin`) req.session.admin = true;
    next();
  } else {
    res.status(401).send(`One of the data is incorrect,
        or you are not logged in.`);
  }
};

const authenticateToken = function (req, res, next) {
  const RSA_PRIVATE_KEY = `somekey`;
  let token = req.session.token;
  if (!token)
    return res.status(401).send({ auth: false, message: `No token provided.` });

  jwt.verify(token, RSA_PRIVATE_KEY, function (err, data) {
    let _id = data.id;

    if (err || _id !== req.session._id)
      return res
        .status(500)
        .send({ auth: false, message: `Failed to authenticate token.` });
    req.data = data;
    next();
  });
};

router.get(`/`, (req, res, next) => {
  req.session.token = undefined;
  res.render(`login/loginPage`, {});
});

router.post("/", async (req, res, next) => {
  if (req.body.oldUserName) {
    let data = { userName: req.body.userName, password: req.body.password };
    await loginBL.createAccount(data, req.body.oldUserName);
  }
  res.render(`login/loginPage`, {});
});

router.post("/main", login, authenticateToken, (req, res, next) => {
  let viewMoviesPerm = req.session.viewMoviesPerm;
  let viewSubPerm = req.session.viewSubPerm;
  let admin = req.session.admin;
  res
    .status(200)
    .render(`login/mainPage`, { admin, viewSubPerm, viewMoviesPerm });
});

router.get("/main", authenticateToken, (req, res, next) => {
  let viewMoviesPerm = req.session.viewMoviesPerm;
  let viewSubPerm = req.session.viewSubPerm;
  let admin = req.session.admin;
  res
    .status(200)
    .render(`login/mainPage`, { admin, viewSubPerm, viewMoviesPerm });
});

router.get(`/createAccount`, (req, res, next) => {
  return res.render(`login/createAccountPage`, {});
});

module.exports = { router: router, authenticateToken: authenticateToken };
