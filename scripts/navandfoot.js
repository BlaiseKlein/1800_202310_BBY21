var currentUser;

function navstart(callback){

    firebase.auth().onAuthStateChanged(user => {
        if (user){
            currentUser = db.collection("users").doc(user.uid);
            $("#navinsert").load("loginnavbar.html", (responseTxt, statusTxt, xhr) => {
                if (!window.location.toString().includes("/postViewing.html")){
                    document.getElementById("drop1").setAttribute("style", "display: none;")
                    document.getElementById("drop2").setAttribute("style", "display: none;")
                }
                filterSetup();
            });
            $("#footinsert").load("footer.html");
        } else {
            $("#navinsert").load("navbar.html");
            $("#footinsert").load("footer.html");
        }    
    });

    // if (currentUser != null){
    //     $("#navinsert").load("loginnavbar.html");
    //     $("#footinsert").load("footer.html");
    // } else {
    //     $("#navinsert").load("navbar.html");
    //     $("#footinsert").load("footer.html");
    // }        
}

// function loaduserinfo(){
//     const user = firebase.auth().currentUser;
//     var nameElement = document.getElementById("currentname");
//     var currentemail = document.getElementById("currentemail");

//     nameElement.innerHTML = user.displayName;
//     currentemail.innerHTML = user.email;
//     console.log(user);
// }

function postsNav(){
    window.location.assign("postViewing.html");
}

function uploadNav(){
    window.location.assign("upload.html");
}

function loginNav(){
    window.location.assign("login.html")
}

navstart();

// loaduserinfo();
