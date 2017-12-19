
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

var userInfo;
var loggedIn = 0;
var userList = [];


// Fawad.js
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
    //   movieImage.attr("data-title",results_TMDB[j].title);
    //   movieImage.addClass("movie");

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
        movieImageSearch.attr("data-title",results_OMDB.Search[k].Title);
        movieImageSearch.addClass("movie");

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
        movieImage.attr("data-title",title);
        movieImage.addClass("movie");

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

// End of Fawad.js


//Interact with Firebase
// name and zip code input/ store
var userName = "";
var email = "";
var zipCode = "";
var aboutMe = "";
var genres = "";
var userNames = [];
var movies = [""];


database.ref().on("value", function(snapshot) {  
  
  //Get users in database
  userNames = Object.keys(snapshot.val()); //Get all user names

  userList = [];
  for (var i=0;i<userNames.length;i++){
    userList.push(snapshot.child(userNames[i]).val());    
  }
  if (localStorage.getItem("username")){
    loginUser(localStorage.getItem("username"));
    // Algo just commented out for now until we get add movie and login functionality to work
    matchingAlgo();
  }


});



$("#signup-button").click(function() {
  
userName = $("#input-firstname").val().trim();
email = $("#input-email").val().trim();
zipCode = $("#input-zipcode").val().trim();
aboutMe = $("#textarea1").val().trim();
genres = $('#addGenreLabel').text();
age = $('#addAgeLabel').text();

// If user is not in database,
if (userNames.indexOf(userName)<0){

    var newUser = {
    userName: userName,
    email: email,
    zipCode: zipCode,
    aboutMe: aboutMe,
    genres: genres,
    age: age,
    movies: movies
  }
  database.ref(userName).set(newUser);
  
  // Login User
 loginUser(userName);

  // go back to home page
  window.location = "index.html";

}
else {
  // Display message that username is already taken

}

});

// Age/Genre Dropdown Buttons
$(".addGenreProfile").click(function() {
    $('#addGenreLabel').text($(this).text());

});
$(".addAgeProfile").click(function() {
    $('#addAgeLabel').text($(this).text());

});




//Login button click
$("#login-button").on("click",function(){
    //Get email and zipcode from form
    email = $("#login-email").val().trim();
    zipCode = $("#login-zipcode").val().trim();
    //Loop through UserList until an email and zipcode match
    for (var userIndex=0;userIndex<userList.length;++userIndex){
        if (userList[userIndex].email === email && userList[userIndex].zipCode === zipCode){
            loginUser(userList[userIndex].userName);
            window.location = "personalprofile.html"; 
        }  
    }

});



// Login User
function loginUser(username){
    loggedIn = 1;

    // set Current User from database
    for (var userIndex=0;userIndex<userList.length;++userIndex){
        if (userList[userIndex].userName===username){
            userInfo = userList[userIndex];
        }
    }
    console.log(userInfo);
    localStorage.setItem("username", username); // save username to localdata
    // Change menubar from logged out to logged in
    $('#logged-out-navbar').css("display","none");
    $('#logged-in-navbar').css("display","inline");


}

//Logout User
$("#logout-button").on("click",function(){
    console.log("hi");
    localStorage.removeItem("username"); // Delete Local Data
    loggedIn = 0;
    // Change menubar from logged in to logged out
    // $('#logged-in-navbar').css("display","none");
    // $('#logged-out-navbar').css("display","inline");
    window.location = "index.html";
})




// Add Movie to User Profile

function onClickAddMovie(){
    movieTitle = $(this).attr("data-title");
    // Can only add movies if logged in
    if (loggedIn && (userInfo.movies.indexOf(movieTitle)<0) ){
        userInfo.movies.push(movieTitle); //add movies to the user profile
        database.ref(userInfo.userName).set(userInfo);
    }
}




function customSort(A,B){
  var sortedUsers = [];
  //Sort Array A, by the numeric order of B
  var len = B.length;
  var indices = new Array(len);
  for (var i = 0; i < len; ++i) indices[i] = i;
  indices.sort(function (a, b) { return B[b] < B[a] ? -1 : B[b] > B[a] ? 1 : 0; });
  for (var j=0;j<len;++j){
      sortedUsers.push(A[indices[j]]);
  }

  if (sortedUsers.length < 4){
      return sortedUsers
  }
  else{
      var topFive=[];
      for (var i=0;i<3;i++){
          topFive.push(sortedUsers[i]);
      }
      return topFive
  }

}
function matchingAlgo(){
  var score = [];
  var users = userList;
  //Remove Yourself from the List (Can't match with yourself)
  users.splice(userNames.indexOf(userInfo.userName), 1);

  //Loop Through Users
  for (var userIndex=0;userIndex<users.length;++userIndex){
      score[userIndex]=0;
      for (var movieIndex=0;movieIndex<userInfo.movies.length;++movieIndex){
          if (users[userIndex].movies.indexOf(userInfo.movies[movieIndex]) > -1){
              
              score[userIndex]++; //Add Score for each movie matched
          }
      }

      if (users[userIndex].genres === userInfo.genres){
              
              score[userIndex]++; //Add Score if genre matched
      }
  }
  var mostMatched = customSort(users,score);

    if (mostMatched.length > 0){
        $("#friend-1-name").text(mostMatched[0].userName);
        $("#friend-1-info").html("Age: " + mostMatched[0].age + "<br>" + "Favorite Genre: " + mostMatched[0].genres);
    }
    if (mostMatched.length > 1){
        $("#friend-2-name").text(mostMatched[1].userName);
        $("#friend-2-info").html("Age: " + mostMatched[1].age + "<br>" + "Favorite Genre: " + mostMatched[1].genres);
    }
    if (mostMatched.length > 2){
        $("#friend-3-name").text(mostMatched[2].userName);
        $("#friend-3-info").html("Age: " + mostMatched[2].age + "<br>" + "Favorite Genre: " + mostMatched[2].genres);
    }

}

$(document).on("click", ".movie", onClickAddMovie);

