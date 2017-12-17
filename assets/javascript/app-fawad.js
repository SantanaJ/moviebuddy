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


autoplay();

function autoplay() {
  $('.carousel').carousel('next');
  setTimeout(autoplay, 2000);
}

sliderPlay();
function sliderPlay(){
  $('.slider').slider({ full_width: true });

}


