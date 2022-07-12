const form = document.querySelector(".form");
const searchBtn = document.querySelector(".searchBtn");
const selectMovie = document.querySelector("#select-movie");

let movieName = "";

selectMovie.addEventListener("keyup", function (e) {
  e.preventDefault();
  console.log(e.target.value);
  movieName = String(e.target.value);
});

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(movieName);

  if (movieName == "") return;
  else {
    let moviePage = `http://localhost:3000/main/moviesManage/moviesPage?name=${movieName}`;
    console.log(moviePage);
    window.location.href = moviePage;
  }
});
