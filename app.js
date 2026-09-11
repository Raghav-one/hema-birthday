document.querySelectorAll('.memory').forEach(card => card.addEventListener('click', () => card.classList.toggle('active')));

const modal = document.querySelector('#modal');
const modalText = document.querySelector('#modal-text');
document.querySelectorAll('.envelope').forEach(letter => letter.addEventListener('click', () => {
  modalText.textContent = letter.dataset.letter;
  modal.showModal();
}));
document.querySelector('.close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });

document.querySelector('#surprise').addEventListener('click', event => {
  event.currentTarget.setAttribute('aria-hidden', 'true');
  event.currentTarget.style.display = 'none';
  document.querySelector('#wish').classList.add('show');
  for (let i = 0; i < 26; i++) {
    const sparkle = document.createElement('span');
    sparkle.textContent = '✦'; sparkle.className = 'sparkle';
    sparkle.style.cssText = `position:fixed;z-index:5;left:${35 + Math.random()*30}vw;top:${55 + Math.random()*20}vh;color:${Math.random()>.5?'#f8cd7b':'#ff8fa3'};font-size:${12+Math.random()*20}px;pointer-events:none;transition:1.4s ease-out`;
    document.body.append(sparkle); requestAnimationFrame(() => sparkle.style.transform = `translate(${(Math.random()-.5)*260}px,${-80-Math.random()*260}px) rotate(180deg)`);
    setTimeout(() => sparkle.remove(), 1450);
  }
});

const birthdayVideo = document.querySelector('#birthday-video');
const videoToggle = document.querySelector('#video-toggle');
if (birthdayVideo && videoToggle) {
  const songCard = birthdayVideo.closest('.song-card');
  const syncVideoButton = () => {
    const paused = birthdayVideo.paused;
    songCard.classList.toggle('needs-sound', birthdayVideo.muted);
    videoToggle.textContent = birthdayVideo.muted ? '♪ sound' : (paused ? '▶' : 'Ⅱ');
    videoToggle.setAttribute('aria-label', birthdayVideo.muted ? 'Turn on sound' : (paused ? 'Play video' : 'Pause video'));
  };
  const enableSound = () => {
    if (!birthdayVideo.muted) return;
    birthdayVideo.muted = false;
    birthdayVideo.volume = .85;
    birthdayVideo.play();
  };
  videoToggle.addEventListener('click', () => {
    if (birthdayVideo.muted) enableSound(); else if (birthdayVideo.paused) birthdayVideo.play(); else birthdayVideo.pause();
  });
  birthdayVideo.addEventListener('play', syncVideoButton);
  birthdayVideo.addEventListener('pause', syncVideoButton);
  birthdayVideo.addEventListener('volumechange', syncVideoButton);
  birthdayVideo.play().catch(() => {});
  document.addEventListener('pointerdown', event => {
    if (!videoToggle.contains(event.target)) enableSound();
  }, { once: true });
  document.addEventListener('keydown', enableSound, { once: true });
  syncVideoButton();
}

let audioContext;
document.querySelector('#sound').addEventListener('click', event => {
  const label = event.currentTarget.querySelector('span');
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator(), gain = audioContext.createGain();
  oscillator.frequency.value = 523.25; gain.gain.setValueAtTime(.0001, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(.06, audioContext.currentTime+.03); gain.gain.exponentialRampToValueAtTime(.0001, audioContext.currentTime+1.2); oscillator.connect(gain).connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime+1.25);
  label.textContent = 'a little chime'; setTimeout(() => label.textContent = 'sound off', 1300);
});
