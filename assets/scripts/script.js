document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music");
  const sounds = {
    close: document.getElementById("close"),
    hover: document.getElementById("hover"),
    open: document.getElementById("open"),
    click: document.getElementById("click"),
  };

  music.volume = 0.5;
  Object.values(sounds).forEach((sound) => (sound.volume = 1));

  const playSound = (sound) => sound.paused && sound.play();

  document.querySelectorAll('a, [role="button"]').forEach((link) => {
    link.addEventListener("mouseenter", () => playSound(sounds.hover));
    link.addEventListener("click", () => {
      playSound(sounds.click);
      playSound(sounds.open);
    });
  });

  const musicBtn = document.querySelector(".c_music");
  musicBtn.addEventListener("click", () => {
    const isMuted = musicBtn.classList.toggle("c_music__mute");
    const volume = isMuted ? 0 : 1;

    music.pause();
    if (!isMuted) playSound(music);

    music.volume = isMuted ? 0 : 0.5;
    Object.values(sounds).forEach((sound) => (sound.volume = volume));
  });

  document.addEventListener(
    "click",
    (e) => {
      if (!e.target.closest(".c_music")) {
        setTimeout(() => musicBtn.click(), 100);
      }
    },
    { once: true }
  );
});
