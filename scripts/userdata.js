const user = firebase.auth().currentUser;
console.log(user);

if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User
  // ...
} else {
  // No user is signed in.
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      var username = user.displayName;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  
// function currentinfo(callback){
//   const nameElement = document.getElementById("currentname");
//   const currentemail = document.getElementById("currentemail");

//   nameElement.innerHTML() += user.name();
//   currentemail.innerHTML() += user.email();
// }
// currentinfo(() => {
//   console.log("Info printed");
// });
