// Get a reference to the posts collection in Firebase
const postsRef = firebase.firestore().collection("posts");
const userRef = firebase.firestore().collection("users");

function filterSetup(){

  // Add event listener to the location dropdown menu
  const locationDropdown = document.getElementById("location-dropdown");

  const transportDropdown = document.getElementById("transport-dropdown");
  transportDropdown.addEventListener("click", (event) => {
    const selectedTransport = event.target.getAttribute("data-transport");
    // Create a new query that filters by the selected transport type
    let query = postsRef.where("transportType", "==", selectedTransport);

    query.get().then((querySnapshot) => {
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

  locationDropdown.addEventListener("click", (event) => {
    const selectedLocation = event.target.getAttribute("data-location");

    // Create a new query that filters by the selected location
    let query = postsRef.where("landmarkName", "==", selectedLocation);
    query.get().then((querySnapshot) => {
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
}
  // Function to display all the posts on the page initially
  function displayAllPosts() {
    postsRef.get().then((querySnapshot) => {
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
      <div class="card" style="width: 29.5rem;">
      <h3 class="card-title">${post.owner}, posted at ${post.last_updated.toDate().toLocaleString()}</h3>
      <img src="${imageSrc}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${post.title}</h5>
      <h3 class="card-title">${post.landmarkName}, ${post.transportType}</h3>
      <p class="card-text" style="display: block;">${postDesc}</p>
      <p class="long-text" style="display: none;">${post.description}</p>
      <button class="btn btn-primary view-more" data-post-id="${post.id}">View More</button>
      </div>
    </div>
      `;
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

      // Redirect to the post details page for the selected post
      // window.location.href = `post.html?id=${postId}`;
    });
  }
}

// Call the displayAllPosts function to display all posts initially
displayAllPosts();

