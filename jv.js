// --- 1. FUNGSI BUKA UNDANGAN ---
function openInvitation() {
    const cover = document.getElementById('cover');
    cover.classList.add('open');
    
    // Mulai musik otomatis saat dibuka
    playMusic();
    
    // Izinkan scroll kembali
    document.body.style.overflow = "auto";
}

// --- 2. KONTROL MUSIK ---
const music = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');
let isPlaying = false;

function playMusic() {
    music.play().then(() => {
        isPlaying = true;
        musicIcon.className = "fas fa-pause";
    }).catch(error => {
        console.log("Autoplay dicegah browser, perlu interaksi user.");
    });
}

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicIcon.className = "fas fa-music";
    } else {
        music.play();
        musicIcon.className = "fas fa-pause";
    }
    isPlaying = !isPlaying;
}

// --- 3. COUNTDOWN TIMER (18 Jan 2026) ---
const weddingDate = new Date("Jan 18, 2026 10:00:00").getTime();

const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update HTML
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // Jika waktu habis
    if (distance < 0) {
        clearInterval(x);
        document.querySelector(".countdown").innerHTML = "<p>Acara Telah Dimulai/Selesai</p>";
    }
}, 1000);

// --- 4. ANIMASI SCROLL (FADE IN) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

const hiddenElements = document.querySelectorAll('.fade-in');
hiddenElements.forEach((el) => observer.observe(el));