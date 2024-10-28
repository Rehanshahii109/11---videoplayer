const video = document.querySelector(".video");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeBar = document.querySelector(".volume-bar");
const volumeRange = document.querySelector(".volume-range");
const playbackRateSelect = document.querySelector(".player-speed");
const timeElapsed = document.getElementById("time-elapsed");
const timeDuration = document.querySelector(".time span:nth-child(2)"); // Select second span
const progressBar = document.querySelector(".progress-bar");
const progressRange = document.querySelector(".progress-range");
const fullscreenBtn = document.querySelector(".fullscreen");

// Play/Pause Video
playBtn.addEventListener("click", () => {
	if (video.paused) {
		video.play();
		playBtn.classList.remove("fa-play");
		playBtn.classList.add("fa-pause");
	} else {
		video.pause();
		playBtn.classList.remove("fa-pause");
		playBtn.classList.add("fa-play");
	}
});

// Volume Control
volumeRange.addEventListener("click", (e) => {
	const volumePercent = e.offsetX / volumeRange.offsetWidth;
	volumeBar.style.width = `${volumePercent * 100}%`;
	video.volume = volumePercent;
	volumeIcon.className =
		volumePercent === 0 ? "fas fa-volume-mute" : "fas fa-volume-up";
});

// Playback Speed
playbackRateSelect.addEventListener("change", (e) => {
	video.playbackRate = parseFloat(e.target.value);
});

// Update Time and Progress Bar
video.addEventListener("loadedmetadata", () => {
	const duration = video.duration;
	timeDuration.textContent = formatTime(duration);
});

video.addEventListener("timeupdate", () => {
	const elapsed = video.currentTime;
	timeElapsed.textContent = formatTime(elapsed);
	const progressPercent = (elapsed / video.duration) * 100;
	progressBar.style.width = `${progressPercent}%`;
});

// Seek Video
progressRange.addEventListener("click", (e) => {
	const clickPosition = e.offsetX / progressRange.offsetWidth;
	video.currentTime = clickPosition * video.duration;
});

// Fullscreen Toggle
fullscreenBtn.addEventListener("click", () => {
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		video.requestFullscreen();
	}
});

// Format time function
function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${minutes < 10 ? "0" : ""}${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
