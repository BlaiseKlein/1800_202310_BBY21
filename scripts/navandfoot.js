function navstart(callback) {
    //Loads the login navbar if the user is logged in, and the basic navbar if they are not.
    //Also if will hide the filters outside of the post viewing pages.
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        $("#navinsert").load("loginnavbar.html", () => {
          if (!window.location.toString().includes("/postViewing.html") && !window.location.toString().includes("/myPosts.html")) {
            document.getElementById("drop1").setAttribute("style", "display: none;")
            document.getElementById("drop2").setAttribute("style", "display: none;")
            document.getElementById("filterDrop").setAttribute("style", "display: none;")
          } else {
            filterSetup();
          }
        });
        $("#footinsert").load("footer.html");
      } else {
        $("#navinsert").load("navbar.html");
        $("#footinsert").load("footer.html");
      }
    });
  
  
  }
  
  
  
  function postsNav() {
    window.location.assign("postViewing.html");
  }
  
  function uploadNav() {
    window.location.assign("upload.html");
  }
  
  function loginNav() {
    window.location.assign("login.html")
  }
  
  function myPostsNav() {
    window.location.assign("myPosts.html")
  }
  
  navstart();