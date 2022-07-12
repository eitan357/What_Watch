const moviesBL = require(`./BLs_of_data/moviesBL`);
const subscriptionsBL = require(`./BLs_of_data/subscriptionsBL`);
const membersBL = require(`./BLs_of_data/membersBL`);

const getAllMovies = async function () {
  let movies = (await moviesBL.getAllData()).data;
  let subscriptions = (await subscriptionsBL.getAllData()).data;
  let members = (await membersBL.getAllData()).data;

  let data = movies.map((movie) => {
    let movieId = movie._id;

    // console.log("movie:", movie.genres);

    //premiered date
    let premiered = new Date(movie.premiered);
    let date = premiered.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    // subscription
    let subscription = subscriptions.filter((sub) =>
      sub.movies.find((movie) => movie.movieId == movieId)
    );

    //members
    let member = subscription.map((sub) => {
      let member = members.find((mem) => mem._id == sub.memberId);

      // watch date
      let date = new Date(
        sub.movies.find((mov) => mov.movieId == movieId).date
      );
      let watchDate = date.toLocaleString(`default`, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      return { id: sub.memberId, name: member.name, watchDate };
    });

    return {
      id: movieId,
      name: movie.name,
      genres: movie.genres,
      image: movie.image,
      premiered: date,
      members: member,
    };
  });
  return data;
};

const getOneMovie = async function (name) {
  let getMovie = (await moviesBL.getOneDataByName(name)).data;
  let subscriptions = (await subscriptionsBL.getAllData()).data;
  let members = (await membersBL.getAllData()).data;

  return getMovie.flatMap((movie) => {
    // premiered date
    let premiered = new Date(movie.premiered);
    let day = String(premiered.getDate()).padStart(2, "0");
    let month = String(premiered.getMonth() + 1).padStart(2, "0");
    let year = String(premiered.getFullYear());
    let date = `${year}-${month}-${day}`;

    // subscription
    let subscription = subscriptions.filter((sub) =>
      sub.movies.find((mov) => mov.movieId == movie._id)
    );

    //members
    let member = subscription.map((sub) => {
      let mem = members.find((mem) => mem._id == sub.memberId);
      // watch date
      let date = new Date(
        sub.movies.find((mov) => mov.movieId == movie._id).date
      );
      let watchDate = date.toLocaleString(`default`, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      return { id: sub.memberId, name: mem.name, watchDate };
    });

    return [
      {
        id: movie._id,
        name: movie.name,
        genres: movie.genres,
        image: movie.image,
        premiered: date,
        members: member,
      },
    ];
  });
};

const createMovie = async function (data) {
  await moviesBL.createData(data);
  return `Created!`;
};

const updateMovie = async function (data, id) {
  let date = new Date(data.premiered);
  let obj = {
    name: data.name,
    genres: data.genres,
    image: data.image,
    premiered: date,
  };
  await moviesBL.updateDataById(obj, id);
};

const deleteMovie = async function (name) {
  await moviesBL.deleteData(name);
  return `Deleted!`;
};

const genres = async function () {
  let movies = await moviesBL.getAllData();
  let genres = [...new Set(movies.data.flatMap((movie) => movie.genres))];
  return genres;
};

const allMoviesNames = async function () {
  let allMovies = await getAllMovies();
  return allMovies.map((movie) => {
    return {
      id: movie.id,
      name: movie.name,
      genres: movie.genres,
    };
  });
};

module.exports = {
  getAllMovies,
  getOneMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  genres,
  allMoviesNames,
};
