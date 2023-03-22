
function navstart(callback){
    $("#navinsert").load("navbar.html");
    $("#footinsert").load("footer.html");
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

navstart(function (){
    const settingsbutton = document.getElementById("settingbtn");
    settingsbutton.addEventListener('click', function (){
        console.log("Help");
    });
});

// loaduserinfo();
