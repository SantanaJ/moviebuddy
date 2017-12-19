// Get Cookie UserInfo
var userInfo = localStorage.getItem("userinfo");

// Fill Out Fields








//Logout User
$("#logout-button").on("click",function(){
    localStorage.removeItem("username"); // Delete Local Data
    loggedIn = 0;

    window.location = "index.html";
});