// declaration variables
const audioPlayer = document.querySelector(".audio_player");
const musicImage = audioPlayer.querySelector(".container_cover img");
const musicName = audioPlayer.querySelector(".name .name_song");
const musicArtist = audioPlayer.querySelector(".name .name_artist");
const music = audioPlayer.querySelector("#audio");
const playPause = audioPlayer.querySelector(".play_pause");
const playPauseBtn = audioPlayer.querySelector(".play_pause i");
const previousMusicBtn = audioPlayer.querySelector("#previous_music");
const nextMusicBtn = audioPlayer.querySelector("#next_music");
const progressBar = audioPlayer.querySelector(".bar");
const progressBarZone = audioPlayer.querySelector(".progress_bar");
const repeatBtn = audioPlayer.querySelector("#repeat_song");
const musicList = audioPlayer.querySelector(".music_list");
const showBtn = audioPlayer.querySelector("#show");
const hideBtn = musicList.querySelector("#close");
const contPlayer = audioPlayer.querySelector(".container_player");
const contButtons = audioPlayer.querySelector(".container_buttons");

// morceau aleatoire au chargement de la page
let musicIndex = Math.floor((Math.random() * tableMusic.length));

// fonction : charger la musique
window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingNow();
})

// fonction : importer les musiques avec toutes les infos
function loadMusic() {
    musicName.innerText = tableMusic[musicIndex].name;
    musicArtist.innerText = tableMusic[musicIndex].artist;
    musicImage.src = `images/${tableMusic[musicIndex].image}`;
    music.src = `musiques/${tableMusic[musicIndex].link}.wav`;
    
    checkFav(tableMusic, musicIndex);

    console.log(tableMusic);

    let backgroundImage = document.querySelector(".audio_player");
    backgroundImage.style.backgroundImage = `url(${musicImage.src})`;
    // backgroundImage.style.filter = "grayscale(.7)";
}

// fonction : jouer la musique
function playMusic() {
    audioPlayer.classList.add("paused");
    playPauseBtn.classList.remove("fa-play");
    playPauseBtn.classList.add("fa-pause");
    music.play();
}

// fonction : arreter la musique
function pauseMusic() {
    audioPlayer.classList.remove("paused");
    playPauseBtn.classList.remove("fa-pause");
    playPauseBtn.classList.add("fa-play");
    music.pause();
}

// fonction : musique suivante
function nextMusic() {
    musicIndex++;
    if(musicIndex > tableMusic.length - 1) {
        musicIndex = 0;
    }
    loadMusic();
    playMusic();
    playingNow();
}

// fonction : musique precedente
function previousMusic() {
    musicIndex--;
    if(musicIndex < 0) {
        musicIndex = tableMusic.length - 1;
    }
    loadMusic();
    playMusic();
    playingNow();
}

// fonction : condition pause/play
playPause.addEventListener("click", () => {
    const isMusicPaused = audioPlayer.classList.contains("paused");
    if(isMusicPaused == true) {
        pauseMusic();
    }
    else {
        playMusic();
    }
    playingNow();
})

// fonction : boutton suivant clique
nextMusicBtn.addEventListener("click", () => {
    nextMusic();
})

// fonction : boutton precedent clique
previousMusicBtn.addEventListener("click", () => {
    previousMusic();
})

// fonction : mise a jour de la bar de progression en fonction de la musique
music.addEventListener("timeupdate", (event) => {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = audioPlayer.querySelector(".current_time");
    let musicDuration = audioPlayer.querySelector(".duration_time");
    
    music.addEventListener("loadeddata", () => {
        // duree totale
        let audioDuration = music.duration;
        let totalMinutes= Math.floor(audioDuration / 60);
        let totalSecondes= Math.floor(audioDuration % 60);
        if(totalSecondes < 10) {
            totalSecondes = `0${totalSecondes}`
        }
        musicDuration.innerText = `${totalMinutes}:${totalSecondes}`;
    })

    // temps actuel de musique jouee
    let currentMinutes= Math.floor(currentTime / 60);
    let currentSecondes= Math.floor(currentTime % 60);
    if(currentSecondes < 10) {
        currentSecondes = `0${currentSecondes}`
    }
    musicCurrentTime.innerText = `${currentMinutes}:${currentSecondes}`;
})


// fonction : mise a jour du temps actuel en fonction de la bar de progression
progressBarZone.addEventListener("click", (event) => {
    let progressWidthValue = progressBarZone.clientWidth;
    let clickedOffsetX = event.offsetX;
    let songDuration = music.duration;
    music.currentTime = (clickedOffsetX / progressWidthValue) * songDuration;
    playMusic();
})

// fonction : changement de boutton en cliquant
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    switch(getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            break

        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            break

        case "shuffle":
            repeatBtn.innerText = "repeat";
            break
    }
})

// fonction : action apres la fin de la musique
music.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;
    switch(getText) {
        case "repeat":
            nextMusic();
            break

        case "repeat_one":
            music.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break

        case "shuffle":
            let randomIndex = Math.floor((Math.random() * tableMusic.length) + 1);
            do {
                randomIndex = Math.floor((Math.random() * tableMusic.length) + 1);
            }while(musicIndex == randomIndex);
            musicIndex = randomIndex;
            loadMusic(musicIndex);
            playMusic();
            playingNow();
            break
    }
})



// liste de musique :

// fonction : afficher la liste de musique quand l'icone est cliquee
showBtn.addEventListener("click", (e) => {
    musicList.classList.toggle("show_music");
    contPlayer.classList.toggle("hide_low");
    contButtons.classList.toggle("hide_low");
    e.stopPropagation();
})

// fonction : cacher la liste de musique quand l'icone est cliquee
hideBtn.addEventListener("click", (e) => {
    showBtn.click();
    e.stopPropagation();
})

// fonction : cacher la liste de musique quand le clique est en dehors de la liste de musique
audioPlayer.addEventListener("click", (e) => {
    if (!musicList.contains(e.target) && !showBtn.contains(e.target)) {
        musicList.classList.remove("show_music");
        contPlayer.classList.remove("hide_low");
        contButtons.classList.remove("hide_low");
    }
  });

const ulTag = audioPlayer.querySelector("ul");
// creer des balises li en fonction de la longueur du tableau pour la liste de musique
for (let i = 0; i < tableMusic.length; i++) {
    let liTag = `<li li-index="${i}">
                    <div class="row">
                        <span>${tableMusic[i].name}</span>
                        <p>${tableMusic[i].artist}</p>
                    </div>
                    <audio class="${tableMusic[i].link}" src="musiques/${tableMusic[i].link}.wav"></audio>
                    <div class="row2">
                        <span id="${tableMusic[i].link}" class="duration_time">3:40</span>
                        <span class="material-symbols-rounded" id="download">download</span>
                    </div>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ulTag.querySelector(`#${tableMusic[i].link}`);
    let liAudioTag = ulTag.querySelector(`.${tableMusic[i].link}`);

    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let totalMinutes= Math.floor(audioDuration / 60);
        let totalSecondes= Math.floor(audioDuration % 60);
        if(totalSecondes < 10) {
            totalSecondes = `0${totalSecondes}`
        }
        liAudioDuration.innerText = `${totalMinutes}:${totalSecondes}`;
        liAudioDuration.setAttribute("duration", `${totalMinutes}:${totalSecondes}`);
    });

    let row2Element = ulTag.querySelector(`[li-index="${i}"] .row2 #download`);
    row2Element.addEventListener("click", function(event) {
        download(tableMusic[i].name, tableMusic[i].link);
        event.stopPropagation();
    });
}

const allLiTags = ulTag.querySelectorAll("li");
// fonction : afficher des infos quand une chanson de la liste est cliquee
function playingNow() {
    for (let x = 0; x < allLiTags.length; x++) {
        let audioTag = allLiTags[x].querySelector(".duration_time");

        if (allLiTags[x].classList.contains("playing")) {
            allLiTags[x].classList.remove("playing");
            let addDuration = audioTag.getAttribute("duration");
            audioTag.innerText = addDuration;
        }

        if(allLiTags[x].getAttribute("li-index") == musicIndex) {
            allLiTags[x].classList.add("playing");
            audioTag.innerText = "Lecture";
        }

        allLiTags[x].setAttribute("onclick", "clicked(this)");
    }
}

// fonction : jouer une chanson de la liste en cliquant dessus
function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;

    loadMusic(musicIndex);
    playMusic();
    playingNow();

    musicList.classList.remove("show_music");
    contPlayer.classList.remove("hide_low");
    contButtons.classList.remove("hide_low");
}

// fonction : telecharger la musique
function download(musicName, musicLink) {
    const url = `musiques/${musicLink}.wav`;
    const filename = `${musicName}.wav`;
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        if (navigator.msSaveBlob) { 
          navigator.msSaveBlob(blob, filename);
        } else {
          const link = document.createElement("a");
          const URL = window.URL || window.webkitURL;
          const downloadUrl = URL.createObjectURL(blob);
          link.href = downloadUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);  
          }, 0); 
        }
      });
}