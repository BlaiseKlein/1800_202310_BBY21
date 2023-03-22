var currentUser;

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userLocation = userDoc.data().location;
                    var userTransport = userDoc.data().transport;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userLocation != null) {
                        if (userLocation == "Brentwood") {
                            document.getElementById("brentwood").setAttribute("checked", true);
                        } else if (userLocation == "Metrotown"){
                            document.getElementById("metrotown").setAttribute("checked", true);
                        } else if (userLocation == "BCIT"){
                            document.getElementById("bcit").setAttribute("checked", true);
                        }
                    }
                    if (userTransport != null) {
                        if (userTransport == "Bus") {
                            document.getElementById("bus").setAttribute("checked", true);
                        } else if (userTransport == "Car"){
                            document.getElementById("car").setAttribute("checked", true);
                        }
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields1').disabled = false;
    document.getElementById('personalInfoFields2').disabled = false;
    document.getElementById('personalInfoFields3').disabled = false;

 }

 function saveUserInfo() {
    //enter code here

    //a) get user entered values
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    if (document.getElementById("brentwood").checked){
        userLocation = "Brentwood";
    } else if (document.getElementById("metrotown").checked){
        userLocation = "Metrotown";
    } else if (document.getElementById("bcit").checked){
        userLocation = "BCIT";
    }

    if (document.getElementById("bus").checked){
        userTransport = "Bus";
    } else if (document.getElementById("car").checked){
        userTransport = "Car";
    }

    //b) update user's document in Firestore
    currentUser.update({
        name: userName,
        location: userLocation,
        transport: userTransport
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    //c) disable edit 
    document.getElementById('personalInfoFields1').disabled = true;
    document.getElementById('personalInfoFields2').disabled = true;
    document.getElementById('personalInfoFields3').disabled = true;
}