// personalprofile
var userInfo ={
  userName: "Bob",
  aboutMe: "i like pickels",
  age: "18-24",
  email: "brandonhoarau@gmail.com",
  zipCode: "32819",
  genres: "comedy",
  movies:[]
}

$('#userName').text("Welcome!   " + userInfo.userName);
$('#aboutMe').text( userInfo.aboutMe);
$('#age').text("Age: " + userInfo.age + " |");
$('#genres').text("Favorite Genre: " +  userInfo.genres);
$('#email').text("| Email:" + userInfo.email);
$('#movies').text( userInfo.movies);
$('#zipCode').text("Zip: " + userInfo.zipCode + " |");


console.log(userInfo.userName)