// Get a reference to the Firebase Authentication object
var auth = firebase.auth();

// Get a reference to the logout button element
var logoutBtn = document.getElementById("logoutbtn");

// Add an event listener to the logout button
logoutBtn.addEventListener("click", function() {
  // Call the signOut() method to log the user out
  auth.signOut().then(function() {
    // Redirect the user to the login page (or wherever you want them to go after logging out)
    window.location.href = "login.html";
  }).catch(function(error) {
    // Handle any errors that may occur during the sign out process
    console.error("Error logging out:", error);
  });
});