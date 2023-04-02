const favoriteBtn = audioPlayer.querySelector(".favorite");

// fonction : icone favoris cliquee
favoriteBtn.addEventListener("click", () => {
    favoriteBtn.classList.toggle("favorite_checked");
})