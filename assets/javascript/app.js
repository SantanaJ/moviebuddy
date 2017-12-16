var accountData = new Firebase ("https://project-test-5b9ca.firebaseio.com/");

//=================================
// name and zip code input/ store
var username = "";
var email = "";
var zipCode = "";
var aboutMe = "";
var genres = "";

$("#submit").click(function() {
  
userName = $("#nameInput").val().trim();
email = $("#emailInput").val().trim();
zipCode = $("#zipInput").val().trim();
aboutMe = $("#aboutMeInput").val().trim();
genres = $("#myDropdown").val().trim();

console.log("Name: " + userName)
console.log("email: " + email)
console.log("Zip: " + zipCode)
console.log("About Me: " + aboutMe)
console.log("Favortie Genre: " + genres)

accountData.push ({
  userName: userName,
  email: email,
  zipCode: zipCode,
  aboutMe: aboutMe,
  genres: genres,
  
});

$("input").val(null)
});
