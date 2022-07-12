const express = require(`express`);
const loginRouter = require(`./loginRouter`);
const manageMoviesBL = require(`../BLs/manageMoviesBL`);

const router = express.Router();

//permission
const viewMoviesPerm = function (req, res, next) {
  if (req.session.viewMoviesPerm) next();
  else res.status(500).render("login/unauthorized", {});
};
const createMoviesPerm = function (req, res, next) {
  if (req.session.createMoviesPerm) next();
  else res.status(500).render("login/unauthorized", {});
};
const updateMoviesPerm = function (req, res, next) {
  if (req.session.updateMoviesPerm) next();
  else res.status(500).render("login/unauthorized", {});
};
///

//get all movies
router.get(
  `/moviesPage`,
  loginRouter.authenticateToken,
  viewMoviesPerm,
  async function (req, res, next) {
    let allMoviesNames = await manageMoviesBL.allMoviesNames();
    let movies = [];
    if (req.query.name) {
      let name = req.query.name;
      movies = await manageMoviesBL.getOneMovie(name);
    } else {
      movies = await manageMoviesBL.getAllMovies();
    }

    //permissions
    let admin = req.session.admin;
    let viewMoviesPerm = req.session.viewMoviesPerm;
    let viewSubPerm = req.session.viewSubPerm;
    let createMoviesPerm = req.session.createMoviesPerm;
    let updateMoviesPerm = req.session.updateMoviesPerm;
    let deleteMoviesPerm = req.session.deleteMoviesPerm;
    res.render("movies/moviesPage", {
      admin,
      movies,
      allMoviesNames,
      viewMoviesPerm,
      viewSubPerm,
      createMoviesPerm,
      updateMoviesPerm,
      deleteMoviesPerm,
    });
  }
);

//edit - get one movie
router.get(
  `/moviesPage/movieEdit/:name`,
  loginRouter.authenticateToken,
  viewMoviesPerm,
  updateMoviesPerm,
  async function (req, res, next) {
    let name = req.params.name;
    let movie = await manageMoviesBL.getOneMovie(name);
    let genres = await manageMoviesBL.genres();
    let orderGenres = genres.map((gen) => {
      if (Object(...movie).genres?.find((genre) => genre == gen))
        return ["checked", gen];
      else return ["unchecked", gen];
    });

    let admin = req.session.admin;
    let viewMoviesPerm = req.session.viewMoviesPerm;
    let viewSubPerm = req.session.viewSubPerm;
    res.render("movies/movieEdit", {
      admin,
      movie,
      orderGenres,
      viewMoviesPerm,
      viewSubPerm,
    });
  }
);

// Add movie page
router.get(
  `/movieAdd`,
  loginRouter.authenticateToken,
  viewMoviesPerm,
  createMoviesPerm,
  async function (req, res, next) {
    let genres = await manageMoviesBL.genres();
    let admin = req.session.admin;
    let viewMoviesPerm = req.session.viewMoviesPerm;
    let viewSubPerm = req.session.viewSubPerm;
    res.render("movies/movieAdd", {
      admin,
      genres,
      viewMoviesPerm,
      viewSubPerm,
    });
  }
);

//update create delete function
router.post(
  `/moviesPage`,
  loginRouter.authenticateToken,
  viewMoviesPerm,
  async function (req, res, next) {
    let data = req.body;
    let obj = {
      name: data?.name,
      genres: [data.genres]?.flat(),
      image: data?.image,
      premiered: new Date(data.premiered),
    };

    if (req.body?.Save && !obj.name == ``) {
      await manageMoviesBL.createMovie(obj);
    }

    if (req.body?.Update && !obj.name == ``) {
      let id = req.body.id;
      await manageMoviesBL.updateMovie(obj, id);
    }

    if (req.body?.Delete) {
      let name = obj.name;
      await manageMoviesBL.deleteMovie(name);
    }

    let movies = await manageMoviesBL.getAllMovies();
    let allMoviesNames = await manageMoviesBL.allMoviesNames();

    //permissions
    let admin = req.session.admin;
    let viewMoviesPerm = req.session.viewMoviesPerm;
    let viewSubPerm = req.session.viewSubPerm;
    let createMoviesPerm = req.session.createMoviesPerm;
    let updateMoviesPerm = req.session.updateMoviesPerm;
    let deleteMoviesPerm = req.session.deleteMoviesPerm;
    res.render("movies/moviesPage", {
      admin,
      movies,
      allMoviesNames,
      viewMoviesPerm,
      viewSubPerm,
      createMoviesPerm,
      updateMoviesPerm,
      deleteMoviesPerm,
    });
  }
);

module.exports = router;
