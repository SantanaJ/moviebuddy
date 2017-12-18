// Initialize Firebase
var config = {
  apiKey: "AIzaSyAQgo3mxtFzucxTYrQ0AbbPV5wcdOsoQuk",
  authDomain: "groupproject1-cb2c7.firebaseapp.com",
  databaseURL: "https://groupproject1-cb2c7.firebaseio.com",
  projectId: "groupproject1-cb2c7",
  storageBucket: "groupproject1-cb2c7.appspot.com",
  messagingSenderId: "405279185142"
};
firebase.initializeApp(config);
var database = firebase.database();

var queryURL_TMDB = "https://api.themoviedb.org/3/movie/now_playing?"
var apiKey_TMDB = "55f2f48b28198e570af43b6afc95018d";
var queryURL_OMDB = "https://www.omdbapi.com/?";
var apiKey_OMDB = "eeca6a80";

// const auth = firebase.auth();
// auth.signInWithEmailAndPassword(email,pass);
// auth.createUserWithEmailAndPassword(email,pass);
// auth.onAuthStateChanged(firebaseUser => { })

$.ajax({
    url: queryURL_TMDB,
    method: "GET",
    data: {
      api_key: apiKey_TMDB,
    }
  })

  .done(function (response) {
    var results_TMDB = response.results;


    var carouselID = ["#one!", "#two!", "#three!", "#four!", "#five!"]

    for (var j = 0, len = 5; j < len; j++) {

      var movieDiv = $("<div>");
      var posterID = results_TMDB[j].backdrop_path;
      var posterURL = "https://image.tmdb.org/t/p/w500_and_h281_bestv2/" + posterID;

      var movieImage = $("<img class = carousel-item>");

      movieImage.attr("src", posterURL);
      movieImage.attr("href", carouselID[j]);
      movieImage.attr("title", results_TMDB[j].title);

      movieDiv.append(movieImage);

      $(".carousel").append(movieDiv);

    }
  });

$(".searchButton").on("click", function () {
  // to empty div
  $(".card").empty();


  var searchMovie = $("#search").val().trim();
  console.log(searchMovie);

  $.ajax({
      url: queryURL_OMDB,
      method: "GET",
      data: {
        apikey: apiKey_OMDB,
        s: searchMovie
      }
    })


    .done(function (response) {
      var results_OMDB = response;
      // console.log(results_OMDB.Search["0"].Title);
      console.log(results_OMDB.Search[1].Poster);
      // var carouselID_movieSearch = ["#one!", "#two!", "#three!", "#four!", "#five!"]

      for (var k = 0, len = 6; k < len; k++) {

        var movieSearchDiv = $("<div>");
        // var title = results_OMDB.poster;
        var posterURL_OMDB = results_OMDB.Search[k].Poster;

        console.log(posterURL_OMDB);

        var movieImageSearch = $("<img id = searchMovieImage>");

        movieImageSearch.attr("src", posterURL_OMDB);
        // movieImageSearch.attr("href", carouselID_movieSearch[k]);
        movieImageSearch.attr("title", results_OMDB.Search[k].Title);

        movieSearchDiv.append(movieImageSearch);

        $(".card").append(movieSearchDiv);

      }
    });
});


$(".genreButton").on("click", function () {

  $(".card").empty();

  var queryURL_TMDB_Genre = "https://api.themoviedb.org/3/genre/" + genreID + "movies?";

  var genreValue = $(this).text();
  var genreID = "";
  if (genreValue === "Action") {

    genreID = "28"
    queryURL_TMDB_Genre = "https://api.themoviedb.org/3/genre/" + genreID + "/movies?"
  } else if (genreValue === "Comedy") {
    genreID = "35"
    queryURL_TMDB_Genre = "https://api.themoviedb.org/3/genre/" + genreID + "/movies?"

  } else if (genreValue === "Drama") {
    genreID = "18"
    queryURL_TMDB_Genre = "https://api.themoviedb.org/3/genre/" + genreID + "/movies?"

  } else if (genreValue === "Romance") {
    genreID = "10749"
    queryURL_TMDB_Genre = "https://api.themoviedb.org/3/genre/" + genreID + "/movies?"

  }
  $.ajax({
      url: queryURL_TMDB_Genre,
      method: "GET",
      data: {
        api_key: apiKey_TMDB,
      }
    })

    .done(function (response) {
      var results_TMDB_Genre = response.results;
      console.log(results_TMDB_Genre);

      for (var l = 0, len = 5; l < len; l++) {

        var movieDiv = $("<div>");
        var title = results_TMDB_Genre[l].title;
        var posterID = results_TMDB_Genre[l].backdrop_path;
        var posterURL = "https://image.tmdb.org/t/p/w500_and_h281_bestv2/" + posterID;

        var titleDiv = $("<div class = title>");
        var movieImage = $("<img class = genreMovieImage>");

        movieImage.attr("src", posterURL);
        // movieImage.attr("title", results_TMDB_Genre[l].title);

        titleDiv.append(title);
        movieDiv.append(titleDiv);
        movieDiv.append(movieImage);

        $(".card").append(movieDiv);

      }
    });



});

autoplay();

function autoplay() {
  $('.carousel').carousel('next');
  setTimeout(autoplay, 2000);
}

sliderPlay();

function sliderPlay() {
  $('.slider').slider({
    full_width: true
  });

}