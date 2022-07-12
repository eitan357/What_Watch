const subscriptionsBL = require(`./BLs_of_data/subscriptionsBL`);
const moviesBL = require(`./BLs_of_data/moviesBL`);
const memberBL = require(`./BLs_of_data/membersBL`);

//get all subscriptions
const getAllMembers = async function () {
  let subscriptions = (await subscriptionsBL.getAllData()).data;
  let allMovies = (await moviesBL.getAllData()).data;
  let members = (await memberBL.getAllData()).data;

  let data = members.map((member) => {
    let id = member._id;

    //subscription
    let subscription = subscriptions.filter((sub) => sub.memberId == id);

    //movie watched
    let moviesWatched = subscription.flatMap((sub) =>
      sub.movies.map((movie) => {
        let movieSrc = allMovies.find((mov) => mov._id == movie.movieId);

        let date = new Date(movie.date);
        let watchDate = date.toLocaleString(`default`, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        return {
          id: movieSrc._id,
          name: movieSrc.name,
          date: watchDate,
        };
      })
    );

    let allMoviesNames = allMovies.map((movie) => {
      return { id: movie._id, name: movie.name };
    });
    let watchedNames = moviesWatched.map((movie) => movie.name);
    let moviesNotWatched = allMoviesNames.filter((movie) => {
      if (!watchedNames.includes(movie.name)) return movie;
    });

    return {
      id: id,
      name: member.name,
      email: member.email,
      city: member.city,
      moviesWatched,
      moviesNotWatched,
    };
  });
  return data;
};

//get one subscription
const getOneMember = async function (name) {
  let member = new Object(...(await memberBL.getOneDataByName(name)).data);
  let subscriptions = (await subscriptionsBL.getAllData()).data;
  let movies = (await moviesBL.getAllData()).data;

  let [firstName, lastName] = member.name.split(" ");

  //movie watched
  let moviesWatched = subscriptions
    .find((mem) => mem.memberId == member._id)
    ?.movies.map((movie) => {
      let movieSrc = movies.find((mov) => mov._id == movie.movieId);

      let date = new Date(movie.date);
      let watchDate = date.toLocaleString(`default`, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      return {
        id: movieSrc._id,
        name: movieSrc.name,
        date: watchDate,
      };
    });

  let allMoviesNames = movies.map((movie) => {
    return { id: movie._id, name: movie.name };
  });
  let watchedNames = moviesWatched.map((movie) => movie.name);
  let moviesNotWatched = allMoviesNames.filter((movie) => {
    if (!watchedNames.includes(movie.name)) return movie;
  });

  return [
    {
      id: member._id,
      name: member.name,
      firstName,
      lastName,
      email: member.email,
      city: member.city,
      moviesWatched,
      moviesNotWatched,
    },
  ];
};

//create subscription
const createMember = async function (data) {
  let obj = {
    name: data.firstName + " " + data.lastName,
    email: data.email,
    city: data.city,
  };
  await memberBL.createData(obj);

  let members = (await memberBL.getAllData()).data;
  let member = members.find((mem) => mem.name == obj.name);
  let id = member._id;
  await subscriptionsBL.createData({ memberId: id, movies: [] });
  return `Created!`;
};

//update member subscription
const updateMemberSub = async function (data, id) {
  let obj = {
    name: data.firstName + " " + data.lastName,
    email: data.email,
    city: data.city,
  };
  await memberBL.updateData(obj, id);
  return `Updated!`;
};

//delete subscription
const deleteMember = async function (id) {
  await subscriptionsBL.deleteDataByMemberId(id);
  await memberBL.deleteData(id);
  return "Deleted!";
};

module.exports = {
  getAllMembers,
  getOneMember,
  createMember,
  updateMemberSub,
  deleteMember,
};
