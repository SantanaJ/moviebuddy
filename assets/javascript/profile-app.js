


// Get Cookie UserInfo
var userInfo = localStorage.getItem("userinfo");


// Fill Out Fields

$('#userName').text("Welcome!   " + userInfo.userName);
$('#aboutMe').text( userInfo.aboutMe);
$('#age').text("Age: " + userInfo.age + " |");
$('#genres').text("Favorite Genre: " +  userInfo.genres);
$('#email').text("| Email:" + userInfo.email);
$('#movies').text( userInfo.movies);
$('#zipCode').text("Zip: " + userInfo.zipCode + " |");


//Logout User
$("#logout-button").on("click",function(){
    localStorage.removeItem("username"); // Delete Local Data
    loggedIn = 0;

    window.location = "index.html";
});