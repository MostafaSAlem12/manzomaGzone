(function IIFE() {
  var list = [
  {
    id: 1,
    url:
    "/sound/omar_khayrat/omar_khayrat_adyetamahmed.mp3",
    author: "Marcel Pequel",
    title: "عمر خيرت-مقطع 1",
    cover:
    "" },

  {
    id: 2,
    url:
    "/sound/omar_khayrat/omar_khayrat_adyetamahmed2.mp3",
    author: "Marcel Pequel",
    title: "عمر خيرت-مقطع 2",
    cover:
    "" },

  {
    id: 3,
    url:
    "/sound/omar_khayrat/omar_khayrat_awga3.mp3",
    author: "Marcel Pequel",
    title: "عمر خيرت-مقطع 3",
    cover:
    "" },

  {
    id: 4,
    url:
    "/sound/omar_khayrat/omar_khayrat_dameerablahekmat.mp3",
    author: "Marcel Pequel",
    title: "عمر خيرت-مقطع 4",
    cover:
    "" },

  {
    id: 5,
    url:
    "/sound/omar_khayrat/omar_khayrat_dameerablahekmat2.mp3",
    author: "Marcel Pequel",
    title: "عمر خيرت-مقطع 5",
    cover:
    "" },

  {
    id: 6,
    url:
    "/sound/omar_khayrat/omar_khayrat_fehwydelleel.mp3",
    author: "Marcel Pequel",
    title: "عمر خيرت-مقطع 6",
    cover:
    "" },

  {
    id: 7,
    url:
    "/sound/omar_khayrat/omar_khayrat_panorama6october.mp3",
    author: "Marcel Pequel",
    title: "عمر خيرت-مقطع 7",
    cover:
    "" },

  {
    id: 8,
    url:
    "/sound/omar_khayrat/omar_khayrat_zoom.mp3",
    author: "Marcel Pequel",
    title: "عمر خيرت-مقطع 8",
    cover:
    "" },

  {
    id: 9,
    url:
    "/sound/omar_khayrat/omar_khayrat_zyelhawa.mp3",
    author: "Marcel Pequel",
    title: "عمر خيرت-مقطع 9",
    cover:
    "" },
  {
    id: 10,
    url:
    "/sound/omar_khayrat/omar_khayrat_zyelhawa2.mp3",
    author: "Marcel Pequel",
    title: "عمر خيرت-مقطع 10",
    cover:
    "" },
  ];



  var currentId = 0;
  var isPlaying = false;
  var isLoop = true;
  var isShuffle = false;
  var currentAudio = "music1";
  var timer = null;
  var loopOne = false;

  var currentTimeIndicator = document.querySelector(".music-time__current");
  var leftTimeIndicator = document.querySelector(".music-time__last");
  var progressBar = document.getElementById("length");
  var playBtn = document.querySelector(".play");
  var cover = document.querySelector(".cover");
  var title = document.querySelector(".music-player__title");
  var author = document.querySelector(".music-player__author");

  var loopBtn = document.getElementById("loop");
  var shuffleBtn = document.getElementById("shuffle");
  var forwardBtn = document.getElementById("forward");
  var backwardBtn = document.getElementById("backward");
  var prevBtn = document.getElementById("prev");
  var nextBtn = document.getElementById("next");
  var progressDiv = document.getElementById("progress");

  function play(e) {
    if (!isPlaying) {
      // console.log('play');
      e.target.src =
      "/images/music_controller/pause.svg";
      e.target.alt = "Pause";
      isPlaying = true;
      document.getElementById(currentAudio).play();
      showTime();
    } else {
      // console.log('pause');
      e.target.src =
      "/images/music_controller/play.svg";
      e.target.alt = "Play";
      document.getElementById(currentAudio).pause();
      isPlaying = false;
      clearInterval(timer);
    }
  }

  function changeBar() {
    var audio = document.getElementById(currentAudio);
    var percentage = (audio.currentTime / audio.duration).toFixed(3);
    progressBar.style.transition = "";
    // console.log(audio.currentTime);

    //set current time
    var minute = Math.floor(audio.currentTime / 60);
    var second = Math.floor(audio.currentTime % 60);
    var leftTime = audio.duration - audio.currentTime;
    currentTimeIndicator.innerHTML =
    ("0" + minute).substr(-2) + ":" + ("0" + second).substr(-2);

    //set left time
    var leftMinute = Math.floor(leftTime / 60);
    var leftSecond = Math.floor(leftTime % 60);

    leftTimeIndicator.innerHTML =
    ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);

    //set time bar
    progressBar.style.width = percentage * 100 + "%";
  }

  function showTime() {
    timer = setInterval(function () {return changeBar();}, 500);
  }

  function nextMusic(mode) {
    playBtn.src =
    "/images/music_controller/play.svg";
    playBtn.alt = "Play";
    document.getElementById(currentAudio).pause();
    isPlaying = false;
    clearInterval(timer);

    if (mode === "next") {
      currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
      init();
    } else {
      currentId = currentId - 1 < 0 ? list.length - 1 : currentId - 1;
      init();
    }
  }

  function shuffle(e) {
    isShuffle = !isShuffle;
    if (isShuffle) {
      e.target.parentNode.classList.add("is-loop");
    } else {
      e.target.parentNode.classList.remove("is-loop");
    }
  }

  function backward() {
    var audio = document.getElementById(currentAudio);
    audio.currentTime -= 5;
    if (!isPlaying) {
      changeBar();
    }
  }

  function forward() {
    var audio = document.getElementById(currentAudio);
    audio.currentTime += 5;
    if (!isPlaying) {
      changeBar();
    }
  }

  function stopMusic() {
    playBtn.src =
    "/images/music_controller/play.svg";
    playBtn.alt = "Play";
    isPlaying = false;
  }

  function goToNextMusic() {
    var newId = currentId;
    while (isShuffle && !loopOne && newId === currentId) {
      newId = Math.floor(Math.random() * Math.floor(list.length - 1));
    }

    if (!isShuffle && !loopOne) {
      currentId = currentId + 1 > list.length - 1 ? 0 : currentId + 1;
    }
    if (!isShuffle && loopOne) {
      currentId = currentId;
    }

    if (isShuffle) {
      currentId = newId;
    }
    init();
    document.getElementById(currentAudio).play();
  }

  function loop(e) {
    var audio = document.getElementById(currentAudio);

    if (!isLoop && !loopOne) {
      isLoop = true;
      loopOne = false;
      // console.log('is loop');
      e.target.parentNode.classList.add("is-loop");
      e.target.src =
      "/images/music_controller/loop.svg";
      audio.loop = false;
      audio.onended = function (e) {return goToNextMusic();};
      console.log(isLoop, loopOne);
    } else if (isLoop && !loopOne) {
      // console.log('is loop one');
      isLoop = true;
      loopOne = true;
      e.target.parentNode.classList.add("is-loop");
      e.target.src =
      "/images/music_controller/loopone.svg";
      audio.loop = true;
      audio.onended = function (e) {return goToNextMusic();};
      console.log(isLoop, loopOne);
    } else {
      // console.log('not loop');
      isLoop = false;
      loopOne = false;
      e.target.parentNode.classList.remove("is-loop");
      e.target.src =
      "/images/music_controller/loop.svg";
      audio.loop = false;
      audio.onended = function (e) {return stopMusic();};
      console.log(isLoop, loopOne);
    }
  }

  function progress(e) {
    var audio = document.getElementById(currentAudio);
    //get current position and minus progress bar's x position to get current position in progress bar
    var pos =
    (e.pageX - progressDiv.getClientRects()[0].x) /
    progressDiv.getClientRects()[0].width;
    audio.currentTime = pos * audio.duration;
    changeBar();
  }

  function init() {
    //reset music duration and setup audio
    var audio =
    document.getElementById(currentAudio) === null ?
    new Audio() :
    document.getElementById(currentAudio);
    audio.src = list[currentId].url;
    audio.id = currentAudio;
    document.getElementById(currentAudio) === null ?
    document.body.appendChild(audio) :
    "";

    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    document.getElementById(currentAudio).currentTime = 0;

    title.innerHTML = list[currentId].title;

    //set current time
    audio.addEventListener("loadedmetadata", function () {
      var leftMinute = Math.floor(audio.duration / 60);
      var leftSecond = Math.floor(audio.duration % 60);
      currentTimeIndicator.innerHTML = "00:00";
      leftTimeIndicator.innerHTML =
      ("0" + leftMinute).substr(-2) + ":" + ("0" + leftSecond).substr(-2);
      progressBar.style.transition = "";
    });

    //set loop
    document.getElementById(currentAudio).onended = function (e) {return goToNextMusic(e);};
  }

  playBtn.addEventListener("click", play);
  loopBtn.addEventListener("click", loop);

  shuffleBtn.addEventListener("click", shuffle);
  forwardBtn.addEventListener("click", forward);
  backwardBtn.addEventListener("click", backward);

  prevBtn.addEventListener("click", function (e) {return nextMusic("prev");});
  nextBtn.addEventListener("click", function (e) {return nextMusic("next");});
  progressDiv.addEventListener("click", function (e) {
    progress(e);
  });

  init();
})();