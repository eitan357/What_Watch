"use strict";

const moviesList = document.querySelectorAll(`.movies`);
const subscribeNewMovieIndex = document.querySelectorAll(".subscribeNewMovie");

subscribeNewMovieIndex.forEach((value, index) => {
  let subscribeNewMovie = document.querySelector(`.subscribeNewMovie_${index}`);
  let subscribeWindow = document.querySelector(`.divSubscribe_${index}`);
  let subscribe = document.querySelector(`.subscribe_${index}`);
  let selectMovie = document.querySelector(`.select-movie_${index}`);
  let movieDate = document.querySelector(`.movieDate_${index}`);
  let memberId = document.querySelector(`.memberId_${index}`).value;
  let movieList = document.querySelector(`.movieList_${index}`);
  const mydiv = document.querySelector(`.mydiv_${index}`);

  //subscribe to new movie button
  subscribeNewMovie.addEventListener("click", function (e) {
    e.preventDefault();
    subscribeWindow.classList.toggle("hidden");
  });

  //send new movie to the list
  subscribe.addEventListener("click", async function (e) {
    e.preventDefault();
    let data = { movies: [] };

    //new movie
    let movieName = selectMovie.options[selectMovie.selectedIndex].textContent;
    let movieId = selectMovie.options[selectMovie.selectedIndex].value;
    let date = new Date(movieDate.value);
    if (date === "" || movieName == "")
      return alert("One of the fields is empty (movie name or date)");
    let clientDate = `${String(date.getDate()).padStart("0")}/${String(
      date.getMonth() + 1
    ).padStart("0")}/${date.getFullYear()}`;
    data.movies.push({ movieId, date: date });

    //update movieNotWatch List
    movieDate.value = "";
    selectMovie.options[selectMovie.selectedIndex].textContent = undefined;

    //old movies
    movieList.childNodes.forEach((li) => {
      if (li.classList) {
        let id = li.querySelector(".id").value;
        let [name, date] = li.textContent.split(", ");
        let fullDate = new Date(date);
        data.movies.push({
          movieId: id,
          date: fullDate,
        });
      }
    });

    // update database
    await fetch(`http://localhost:8000/api/subscriptions/${memberId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    //update html
    const newMovie = document.createElement("li");
    newMovie.classList.add(`moives_${index}`);
    newMovie.innerHTML = `
    <a href="http://localhost:3000/main/moviesManage/moviesPage?name=${movieName} data-value="${movieName}">${movieName}</a>, <rb data-value="${clientDate}">${clientDate}</rb>
    <input type="text" value="${movieId} class="id" name="id" hidden />
    `;
    movieList.appendChild(newMovie);
  });
});
