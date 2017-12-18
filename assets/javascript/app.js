
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


//=================================
// name and zip code input/ store
var username = "";
var email = "";
var zipCode = "";
var aboutMe = "";
var genres = "";
var userNames = [];
var currentUser;

database.ref().on("value", function(snapshot) {  
  
  //Get users in database
  userNames = Object.keys(snapshot.val()); //Get all user names

  
  // Algo just commented out for now until we get add movie and login functionality to work
  // var userList = [];
  // for (var i=0;i<userNames.length;i++){
  //     otherUser = snapshot.child(userNames[i]).val(); //Get one user
  //     if (currentUser.name != otherUser.name){
  //         userList.push(otherUser);
  //     }
  // }
  // matchingAlgo();


});

$("#signup-button").click(function() {
  
userName = $("#input-firstname").val().trim();
email = $("#input-email").val().trim();
zipCode = $("#input-zipcode").val().trim();
aboutMe = $("#textarea1").val().trim();
genres = 'Action';
movies = [];
// genres = $("#myDropdown").val().trim();

// If user is not in database,
if (userNames.indexOf(userName)<0){

  currentUser = {
    userName: userName,
    email: email,
    zipCode: zipCode,
    aboutMe: aboutMe,
    genres: genres,
    movies: movies
  }

  database.ref(userName).set(currentUser);
  
  // Login User
  // go back to home page
  window.location = "index.html";

}
else {
  // Display message that username is already taken

}

});

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

  if (sortedUsers.length < 5){
      return sortedUsers
  }
  else{
      var topFive=[];
      for (var i=0;i<5;i++){
          topFive.push(sortedUsers[i]);
      }
      return topFive
  }

}
function matchingAlgo(){
  var score = [];
  //Loop Through Users
  for (var userIndex=0;userIndex<userList.length;++userIndex){
      score[userIndex]=0;
      for (var movieIndex=0;movieIndex<user.movies.length;++movieIndex){
          if (userList[userIndex].movies.indexOf(currentUser.movies[movieIndex]) > -1){
              
              score[userIndex]++; //Add Score for each movie matched
          }
      }

      if (userList[userIndex].genre === currentUser.genre){
              
              score[userIndex]++; //Add Score if genre matched
      }
  }
  var mostMatched = customSort(userList,score);
  $("#most-matched").empty();
  for (var k=0;k<mostMatched.length;k++){
      // Loop through most matched and append to html
      $("#most-matched").append("<p>" + mostMatched[k] + "</p>");

  }

}



