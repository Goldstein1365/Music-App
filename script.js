let songName = document.querySelector("#song-name");
let songSinger = document.querySelector("#song-singer");
let songImage = document.querySelector(".song-image");
let playPauseImg = document.querySelector("#play-pause");
let volumeRange = document.querySelector("#volume-range");
let songRange = document.querySelector("#song-duration");
let volSvg = document.querySelector("#vol-svg");
let playlistImg = document.querySelector("#playlist-img");
let playlist = document.querySelector(".playlist");
let playlistSong = document.querySelectorAll(".playlist-song");
let index = 0;
let playingSong = false;
let track = document.createElement("audio");

let songs = [
  {
    name: "Cool Jazz",
    path: "audio1.mp3",
    image: "image1.jpeg",
    singer: "Jazz Band",
  },
  {
    name: "smooth Jazz",
    path: "audio2.mp3",
    image: "image2.jpeg",
    singer: "John Coltrane",
  },
  {
    name: "blue Jazz",
    path: "audio3.mp3",
    image: "image3.jpeg",
    singer: "Prerez Stony",
  },
  {
    name: "Cabaret Jazz",
    path: "audio4.mp3",
    image: "image4.jpeg",
    singer: "Classico Latina",
  },
  {
    name: "Classic Jazz",
    path: "audio5.mp3",
    image: "image5.jpeg",
    singer: "League Bass",
  },
  {
    name: "quetz",
    path: "audio6.mp3",
    image: "image6.jpeg",
    singer: "Westtoms",
  },
  {
    name: "7th Ones",
    path: "audio7.mp3",
    image: "image7.jpeg",
    singer: "Snarky Puppy",
  },
  {
    name: "Alone Child",
    path: "audio8.mp3",
    image: "image8.jpeg",
    singer: "Jazz Autumns",
  },
  {
    name: "baby calm",
    path: "audio9.mp3",
    image: "image9.jpeg",
    singer: "Jazz Band Latin",
  },
  {
    name: "giselle",
    path: "audio10.mp3",
    image: "image10.jpeg",
    singer: "Jazz Band Spain",
  },
];

function loadTrack(index) {
  track.src = songs[index].path;
  songName.innerHTML = songs[index].name;
  songSinger.innerHTML = songs[index].singer;
  songImage.style = `background-image: url("${songs[index].image}") !important;`;

  volume();
  duration();

  setInterval(() => {
    songRange.max = track.duration;
    songRange.value = track.currentTime;
  }, 1000);
  track.loop = true;
  track.load();
}

loadTrack(index);

function playPause() {
  if (playingSong == false) {
    playSong();
  } else {
    pauseSong();
  }
}

function playSong() {
  track.play();
  playingSong = true;

  playPauseImg.textContent = "⏸️";
}
function pauseSong() {
  track.pause();
  playingSong = false;

  playPauseImg.textContent = "▶️";
}

function nextSong() {
  if (index < songs.length - 1) {
    index++;
    loadTrack(index);
    playSong();
  } else {
    index = 0;
    loadTrack(index);
    playSong();
  }
}

function previousSong() {
  if (index > 0) {
    index--;
    loadTrack(index);
    playSong();
  } else {
    index = songs.length - 1;
    loadTrack(index);
    playSong();
  }
}

function volume() {
  track.volume = volumeRange.value / 100;
  if (volumeRange.value == 0 || volumeRange.value < 10) {
    volSvg.textContent = "🔈";
  } else if (volumeRange.value >= 10 && volumeRange.value <= 60) {
    volSvg.textContent = "🔉";
  } else {
    volSvg.textContent = "🔊";
  }
}

function duration() {
  track.currentTime = songRange.value;
}

playlistImg.addEventListener("click", () => {
  playlist.classList.toggle("playlist-active");
  if (playlist.classList.contains("playlist-active")) {
    playlistImg.classList.remove("bx bx-menu-wider btn");
    playlistImg.classList.add("bx bx-x btn");
  } else {
    playlistImg.classList.add("bx bx-menu-wider btn");
  }
});

playlistSong.forEach((song, index) => {
  song.addEventListener("click", () => {
    loadTrack(index);
    playSong();
    playlist.classList.remove("playlist-active");
    playlistImg.classList.add("bx bx-menu-wider btn");
  });
});
