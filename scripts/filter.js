// Get a reference to the posts collection in Firebase
const postsRef = firebase.firestore().collection("posts");

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
    postElement.classList.add("post");
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p>Landmark Name: ${post.landmarkName}</p>
      <p>Transport Type: ${post.transportType}</p>
      <p>Latitude: ${post.lat}</p>
      <p>Longitude: ${post.lng}</p>
      <p>Owner: ${post.owner}</p>
      <p>Last updated: ${post.last_updated.toDate().toLocaleString()}</p>
      <p>Description: ${post.description}</p>
      <button class="btn btn-primary view-more" data-post-id="${post.id}">View More</button>
    `;
    postContainer.appendChild(postElement);
    if (post.image) {
      // Create an img element and set its src attribute to the ximage URL
      const imageElement = document.createElement("img");
      imageElement.src = post.image;
      postElement.appendChild(imageElement);
    }
  }

  // Add event listener to each "View More" button
  const viewMoreButtons = document.querySelectorAll(".view-more");

  for (let button of viewMoreButtons) {
    button.addEventListener("click", (event) => {
      const postId = event.target.getAttribute("data-post-id");

      // Redirect to the post details page for the selected post
      window.location.href = `post.html?id=${postId}`;
    });
  }
}

// Call the displayAllPosts function to display all posts initially
displayAllPosts();

