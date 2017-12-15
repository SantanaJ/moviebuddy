
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

  var name = "";
  var email = "";
  var zipCode = "";
  var aboutMe = "";
  
  $("#submit").click(function() {
      
  name = $("#nameInput").val().trim();
  email = $("#emailInput").val().trim();
  zipCode = $("#zipInput").val().trim();
  aboutMe = $("aboutMeInput").val().trim();
  
  console.log("Name: " + name)
  console.log("email: " + email)
  console.log("Zip: " + zipCode)
  console.log("About Me: " + aboutMe)
  
  trainData.push ({
      name: name,
      email: email,
      zipCode: zipCode,
      aboutMe: aboutMe,
      genres: genres,
      age: age
  });
  
  $("input").val(null)
  });