// Get a reference to the posts collection in Firebase
const postsRef = firebase.firestore().collection("posts");
const userRef = firebase.firestore().collection("users");
const storageRef = firebase.storage().ref();

function filterSetup(){
  
  // Add event listener to the location dropdown menu
  const locationDropdown = document.getElementById("location-dropdown");

  const transportDropdown = document.getElementById("transport-dropdown");
  transportDropdown.addEventListener("click", (event) => {
    const selectedTransport = event.target.getAttribute("data-transport");
    // Create a new query that filters by the selected transport type
    let query = postsRef.where("transportType", "==", selectedTransport);
    firebase.auth().onAuthStateChanged(user => {

    query.where("owner", "==", user.displayName).get().then((querySnapshot) => {
      const filteredPosts = [];
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        if (post.owner == currentUser){
          // Extract the document data into a post object
          post.id = doc.id;
        }
        filteredPosts.push(post);
      });

      // Call the displayPosts function with the array of post objects
      displayPosts(filteredPosts);
    });
  });
  });

  locationDropdown.addEventListener("click", (event) => {
    const selectedLocation = event.target.getAttribute("data-location");

    // Create a new query that filters by the selected location
    let query = postsRef.where("landmarkName", "==", selectedLocation);
    firebase.auth().onAuthStateChanged(user => {

      query.where("owner", "==", user.displayName).get().then((querySnapshot) => {
        const filteredPosts = [];
        querySnapshot.forEach((doc) => {
          // Extract the document data into a post object
          const post = doc.data();
            post.id = doc.id;
          filteredPosts.push(post);
        });

        // Call the displayPosts function with the array of post objects
        displayPosts(filteredPosts);
    });
  });
  });
}
  // Function to display all the posts on the page initially
  function displayAllPosts() {
    firebase.auth().onAuthStateChanged(user => {

    postsRef.where("owner", "==", user.displayName).orderBy("last_updated", "desc").get().then((querySnapshot) => {
        const allPosts = [];
        querySnapshot.forEach((doc) => {
          // Extract the document data into a post object
          const post = doc.data();
          post.id = doc.id;
          allPosts.push(post);
        });

        // Call the displayPosts function with the array of all post objects
        displayPosts(allPosts);
      });
    });

  }
// Function to display the posts on the page
function displayPosts(posts) {
  const postContainer = document.getElementById("post-container");

  // Clear any existing posts from the container
  postContainer.innerHTML = "";

  // Loop through the posts array and create HTML elements to display them
  for (let post of posts) {
    const postElement = document.createElement("div");
    var imageSrc = "";
    if (post.image) {
      // Create an img element and set its src attribute to the ximage URL
      imageSrc = post.image;      
    }
    var postDesc = shortDesc(post.description);
    postElement.classList.add("post");
    postElement.innerHTML = `
    <div class="col">
      <div class="card" style="width: 35rem;">
        <h3 class="card-title">${post.owner}, posted at ${post.last_updated.toDate().toLocaleString()}</h3>
        <img src="${imageSrc}" class="card-img-top" alt="...">
        <div class="card-body">
        <h2 class="card-title">${post.title}</h2>
        <h5 class="card-title">Location: ${post.landmarkName} </h5>
        <h5 class="card-title">Transport Type: ${post.transportType}</h5>
        <p class="card-text" style="display: block;">${postDesc}</p>
        <p class="long-text" style="display: none;">${post.description}</p>
        <button class="btn btn-outline-success view-more" data-post-id="${post.id}">View More</button>
          <i class="material-icons" id="delete-icon">delete</i>
        </div>
      </div>
    </div>
  `;
    postElement.querySelector('#delete-icon').onclick = () => deletePost(post.id);
    postContainer.appendChild(postElement);    
  }

function shortDesc(description){
  var shortenedDesc;
  if (description.length > 80){
    shortenedDesc = description.substring(0,80) + "...";
  } else {
    shortenedDesc = description;
  }
  return shortenedDesc;
}
//Delete from posts collection
function deletePost(postid) {
  var result = confirm("Do you want to delete this post?");
  if (result) {
      //Logic to delete the item
      db.collection("posts").doc(postid)
      .delete()
      .then(() => {
          console.log("1. Document deleted from Posts collection");
          // Check if post has an image before calling deleteFromStorage()
          db.collection("posts").doc(postid).get()
          .then((doc) => {
              if (doc.exists && doc.data().image) {
                  deleteFromStorage(postid);
              } else {
                  console.log("3. Post does not have an image to delete");
                  alert("Post was deleted successfully.");
                  location.reload();
              }
          })
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
  }
}


//Delete from image storage.
function deleteFromStorage(postid) {
  // Create a reference to the file to delete
  var imageRef = storageRef.child('images/' + postid + '.jpg');

  // Delete the file
  imageRef.delete().then(() => {
      // File deleted successfully
      console.log("3. image deleted from storage");
      alert("Post was deleted successfully.");
      location.reload();
  }).catch((error) => {
      // Uh-oh, an error occurred!
  });
}
  // Add event listener to each "View More" button
  const viewMoreButtons = document.querySelectorAll(".view-more");

  for (let button of viewMoreButtons) {
    button.addEventListener("click", (event) => {

      if (event.target.parentNode.querySelector(".card-text").getAttribute("style") == "display: block;"){
        const postId = event.target.getAttribute("data-post-id");
        event.target.parentNode.querySelector(".long-text").setAttribute("style", "display: block;");
        event.target.parentNode.querySelector(".card-text").setAttribute("style", "display: none;");
      } else {
        const postId = event.target.getAttribute("data-post-id");
        event.target.parentNode.querySelector(".long-text").setAttribute("style", "display: none;");
        event.target.parentNode.querySelector(".card-text").setAttribute("style", "display: block;");
      }

    });
  }
}

// Call the displayAllPosts function to display all posts initially
displayAllPosts();

