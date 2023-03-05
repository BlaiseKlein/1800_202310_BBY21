function navstart(callback){
    $("#navinsert").load("navbar.html");
    $("#footinsert").load("footer.html");
}
navstart(function (){
    const settingsbutton = document.getElementById("settingbtn");
    settingsbutton.addEventListener('click', function (){
        console.log("Help");
    });
});