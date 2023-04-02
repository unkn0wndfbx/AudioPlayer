const favoriteBtn = audioPlayer.querySelector(".favorite");

// fonction : icone favoris cliquee
favoriteBtn.addEventListener("click", () => {
    favoriteBtn.classList.toggle("favorite_checked");
});

// fonction : enlever favoris
function checkFav(tableMusic, musicIndex) {
    if (tableMusic[musicIndex].heart == "true") {  
        favoriteBtn.classList.add("favorite_checked");
    }
    else {
        favoriteBtn.classList.remove("favorite_checked");
    }
};

function toggleHeartIcon() {
    if (tableMusic[musicIndex].heart == "true") {
        tableMusic[musicIndex].heart =  "false";
    }
    else {
        tableMusic[musicIndex].heart = "true";
    }
};