const targetDate = new Date(2026, 0, 18, 10, 0, 0).getTime(); 
const body = document.body;
const music = document.getElementById('bg-music');
const musicBtn = document.querySelector('.music-control');
const musicIcon = document.getElementById('music-icon');
const navItems = document.querySelectorAll('.nav-item');
const fadeElements = document.querySelectorAll('.fade-in');

function openInvitation() {
    body.classList.add('open-invitation');
    playMusic();
    setTimeout(checkScrollAnimation, 500);
}

let isPlaying = false;
function playMusic() {
    music.play().then(() => {
        isPlaying = true;
        musicBtn.classList.add('music-running');
        musicIcon.classList.replace('fa-music', 'fa-pause');
    }).catch(err => { isPlaying = false; });
}

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicBtn.classList.remove('music-running');
        musicIcon.classList.replace('fa-pause', 'fa-music');
    } else {
        music.play();
        musicBtn.classList.add('music-running');
        musicIcon.classList.replace('fa-music', 'fa-pause');
    }
    isPlaying = !isPlaying;
}

const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) {
        clearInterval(timerInterval);
        document.querySelector('.countdown-wrapper').innerHTML = "<h3 class='gold'>Acara Telah Selesai</h3>";
        return;
    }
    document.getElementById('days').innerText = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
    document.getElementById('hours').innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    document.getElementById('minutes').innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    document.getElementById('seconds').innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
}, 1000);

function checkScrollAnimation() {
    fadeElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
            el.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', () => {
    if (body.classList.contains('open-invitation')) checkScrollAnimation();
});
