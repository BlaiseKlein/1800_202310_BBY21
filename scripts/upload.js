function listenFileSelect() {
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
}


listenFileSelect();

function savePost() {
    alert("SAVE POST is triggered");

        // Check if the selected file is valid
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
        var fileInput = document.getElementById("mypic-input");
        if (!allowedExtensions.exec(fileInput.value)) {
            alert('Please upload file having extensions .jpg/.jpeg/.png/.webp only.');
            fileInput.value = '';
            return false;
        }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            var title = document.getElementById("title").value;
            var desc = document.getElementById("description").value;
            var landmarkName = document.getElementById("landmarkName").value;

            // Ask for location data
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;

                    // Save post data to Firestore
                    db.collection("posts")
                        .add({
                            owner: user.uid,
                            title: title,
                            description: desc,
                            landmarkName: landmarkName,
                            lat: lat,
                            lng: lng,
                            last_updated: firebase.firestore.FieldValue.serverTimestamp() //current system time
                        })
                        .then(function (doc) {
                            console.log("Post document added!");
                            console.log(doc.id);
                            uploadPic(doc.id);
                            window.location.href = "posts.html"; // Redirect the user to posts.html
                        })
                        .catch(function (error) {
                            console.error("Error adding document: ", error);
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

    storageRef
        .put(ImageFile) //global variable ImageFile
        .then(function () {
            console.log("Uploaded to Cloud Storage.");
            storageRef
                .getDownloadURL()
                .then(function (url) {
                    // Get URL of the uploaded file
                    console.log("Got the download URL.");
                    db.collection("posts")
                        .doc(postDocID)
                        .update({
                            image: url, // Save the URL into users collection
                        })
                        .then(function () {
                            console.log("Added pic URL to Firestore.");
                        });
                });
        })
        .catch(function (error) {
            console.log("Error uploading to Cloud Storage: ", error);
        });
}
