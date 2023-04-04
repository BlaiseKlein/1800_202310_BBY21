var currentUser;
const postsRef = firebase.firestore().collection("posts");

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
                        }  else if (userLocation == "highway1"){
                            document.getElementById("Highway 1").setAttribute("checked", true);
                        }  else if (userLocation == "canada way"){
                            document.getElementById("Canada Way").setAttribute("checked", true);
                        }  else if (userLocation == "Willingdon"){
                            document.getElementById("willingdon").setAttribute("checked", true);
                        }  else if (userLocation == "Lougheed"){
                            document.getElementById("Lougheed").setAttribute("checked", true);
                        } else if (userLocation == "None"){
                            document.getElementById("noneLocal").setAttribute("checked", true);
                        }
                    }
                    if (userTransport != null) {
                        if (userTransport == "Bus") {
                            document.getElementById("bus").setAttribute("checked", true);
                        } else if (userTransport == "Car"){
                            document.getElementById("car").setAttribute("checked", true);
                        } else if (userTransport == "None"){
                            document.getElementById("noneTransport").setAttribute("checked", true);
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
    } else if (document.getElementById("highway1").checked){
        userLocation = "Highway 1";
    } else if (document.getElementById("canada way").checked){
        userLocation = "Canada Way";
    } else if (document.getElementById("Willingdon").checked){
        userLocation = "Willingdown";
    } else if (document.getElementById("Lougheed").checked){
        userLocation = "Lougheed";
    } else if (document.getElementById("noneLocal").checked){
        userLocation = "None";
    }

    if (document.getElementById("bus").checked){
        userTransport = "Bus";
    } else if (document.getElementById("car").checked){
        userTransport = "Car";
    } else if (document.getElementById("noneTransport").checked){
        userTransport = "None";
    }

    // Update user's firebase account
    const user = firebase.auth().currentUser;
    let query = postsRef.where("owner", "==", user.displayName);
    query.get().then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
            const post = doc.data();
            console.log(doc.id);
            await postsRef.doc(doc.id).update({"owner": userName})
        });
    });
    

    user.updateProfile({
        displayName: userName,
      }).then(() => {
        console.log("Update successful");
        // ...
      }).catch((error) => {
        console.log("Nope");
        // An error occurred
        // ...
      });  

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
    alert("Update Complete");
}