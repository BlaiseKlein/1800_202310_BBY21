var ImageFile;

function listenFileSelect() {
  try {
    // listen for file selection
    var fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
      ImageFile = e.target.files[0]; //Global variable

      // Check if the file type is valid
      if (!ImageFile.type.match('image/jpeg') && !ImageFile.type.match('image/png') && !ImageFile.type.match('image/webp')) {
        alert('Please select a valid image file (JPG, PNG or WEBP)');
        return;
      }

      var blob = URL.createObjectURL(ImageFile);
      image.src = blob; // Display this image
    });
  } catch (error) {
    console.error(error);
  }
}


listenFileSelect();

function listenTransportSelect() {
    var transportSelect = document.getElementById("transport-type");
    var landmarkSelect = document.getElementById("landmark-name");
    
    // Hide landmark select element by default
    landmarkSelect.style.display = "none";
    
    transportSelect.addEventListener('change', function (e) {
      var transportType = e.target.value;
        
      // Clear landmark select options
      landmarkSelect.innerHTML = '<option value="" selected disabled hidden>Select a location</option>';
    
      // Add options based on transport type and show landmark select element
      if (transportType === "bus") {
        var busLandmarks = ["Metrotown", "Brentwood", "BCIT"];
        for (var i = 0; i < busLandmarks.length; i++) {
          var option = document.createElement("option");
          option.text = busLandmarks[i];
          option.value = busLandmarks[i];
          landmarkSelect.add(option);
        }
        landmarkSelect.style.display = "block";
      } else if (transportType === "car") {
        var carLandmarks = ["Highway 1", "Canada Way", "Willingdon", "Lougheed"];
        for (var i = 0; i < carLandmarks.length; i++) {
          var option = document.createElement("option");
          option.text = carLandmarks[i];
          option.value = carLandmarks[i];
          landmarkSelect.add(option);
        }
        landmarkSelect.style.display = "block";
      } else {
        // Hide landmark select element if no valid transport type is selected
        landmarkSelect.style.display = "none";
      }
      
    });
  }
  
  
  listenTransportSelect();
  

  function savePost() {
    var title = document.getElementById("title").value;
    var desc = document.getElementById("description").value;
    var transportType = document.getElementById("transport-type").value;
    var landmarkName = document.getElementById("landmark-name").value;
  
    // Check if the required fields are filled in
    if (!title || !desc || !landmarkName || !transportType) {
      var errorText = document.getElementById("error-text");
      errorText.style.color = "red";
      errorText.innerHTML = "Please fill in all the required fields.";
      return;
    }
  
// Show loading spinner and text
var postButton = document.getElementById("post-button");
var postButtonText = document.getElementById("post-button-text");
var postButtonSpinner = document.getElementById("post-button-spinner");
postButtonText.style.display = "none";
postButtonSpinner.style.display = "inline-block";
document.getElementById("loading-text").style.display = "inline-block";

  
    // Check if the image file type is valid
    if (ImageFile && !ImageFile.type.match('image/jpeg') && !ImageFile.type.match('image/png') && !ImageFile.type.match('image/webp')) {
      alert('Please select a valid image file (JPG, PNG or WEBP)');
      return;
    }
  
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        // Do something for the user here.
  
        // Ask for location data
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
  
            // Save post data to Firestore
            db.collection("posts")
              .add({
                owner: user.displayName,
                title: title,
                description: desc,
                transportType: transportType,
                landmarkName: landmarkName,
                lat: lat,
                lng: lng,
                last_updated: firebase.firestore.FieldValue.serverTimestamp() //current system time
              })
              .then(function (doc) {
                console.log("Post document added!");
                console.log(doc.id);
                uploadPic(doc.id); // Upload image after the post is added
              })
              .catch(function (error) {
                console.error("Error adding document: ", error);
              })
              .finally(function () {
                // Hide loading spinner and text
                postButtonText.style.display = "inline-block";
                postButtonSpinner.style.display = "none";
                document.getElementById("loading-text").style.display = "none";
              });
          });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      } else {
        // No user is signed in.
        console.log("Error, no user signed in");
      }
    });
  }
  
  

  function uploadPic(postDocID) {
    console.log("inside uploadPic " + postDocID);
  
    var storageRef = storage.ref("images/" + postDocID + ".jpg");
  
    if (!ImageFile) {
      // If no image was selected, set the url to the noimage.jpg file
      var url = "images/noimage.jpg";
    } else {
      storageRef
        .put(ImageFile)
        .then(function () {
          console.log("Uploaded to Cloud Storage.");
          storageRef
            .getDownloadURL()
            .then(function (url) {
              console.log("Got the download URL.");
            });
        })
        .catch(function (error) {
          console.log("Error uploading to Cloud Storage: ", error);
        });
    }
    //Updates the post with the image information.
    db.collection("posts")
      .doc(postDocID)
      .update({
        image: url,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(function () {
        console.log("Updated post with image.");
        console.log("Redirecting to postViewing.html.");
        window.location.href = "postViewing.html";
      })
      .catch(function (error) {
        console.error("Error updating post: ", error);
      });
  }
  
