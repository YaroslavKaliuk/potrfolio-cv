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

  const contactForm = document.querySelector(".yk-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const messageEl = contactForm.querySelector(".message.success");

      submitBtn.disabled = true;
      submitBtn.querySelector(".yk-btn__text").textContent = "Sending...";

      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            messageEl.style.display = "block";
            contactForm.reset();
            playSound(sounds.open);

            setTimeout(() => {
              messageEl.style.display = "none";
            }, 5000);
          } else {
            throw new Error("Form submission failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          messageEl.textContent = "Error sending message. Please try again.";
          messageEl.style.display = "block";
          messageEl.classList.remove("success");
          messageEl.classList.add("danger");

          setTimeout(() => {
            messageEl.style.display = "none";
            messageEl.classList.remove("danger");
            messageEl.classList.add("success");
            messageEl.textContent = "Your message is successfully sent...";
          }, 5000);
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.querySelector(".yk-btn__text").textContent = "Contact Me";
        });
    });
  }
});
