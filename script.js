console.log("Script loaded");

// ---------------- DATA ----------------
const days = [
    {
        title: "Happy Rose Day Bubu🌹",
        msg: "A rose for you, because you make my world bloom.<br>All the thorny roads i will take, only to reach you.<br> Happy Rose Day Bubu",
        photos: ["assets/rose/1.jpg", "assets/rose/2.jpg"]
    },
    {
        title: "Happy Propose Day Bubu 💍",
        msg: "I choose you today, tomorrow, always.<br>I choose Us.<br>Happy Propose Day Bubu",
        photos: ["assets/propose/1.jpg", "assets/propose/2.jpg"]
    },
    {
        title: "Happy Chocolate Day Bubu 🍫",
        msg: "Life is sweeter with you.<br>And Dark without you.<br>Happy Chocolate Day Bubu",
        photos: ["assets/chocolate/1.jpg", "assets/chocolate/2.jpg"]
    },
    {
        title: "Happy Teddy Day Bubu 🧸",
        msg: "Who said it has to be only Teddy why not a Camel.<br>FYI You are my Teddy.<br>Happy Teddy Day Bubu.",
        photos: ["assets/teddy/1.jpg", "assets/teddy/2.jpg"]
    },
    {
        title: "Happy Promise Day Bubu 🤞",
        msg: "I promise to stand by you.<br>I promise to better myself for you.<br>I promise to be there for you.<br>Happy Promise Day Bubu",
        photos: ["assets/promise/1.jpg", "assets/promise/2.jpg"]
    },
    {
        title: "Happy Hug Day Bubu 🤗",
        msg: "Your hug feels like home.<br>Without it every second is a doom.<br>With your Hug my energy goes boom.<br>Happy Hug Day Bubu",
        photos: ["assets/hug/1.jpg", "assets/hug/2.jpg"]
    },
    {
        title: "Happy Kiss Day Bubu 💋",
        msg: "Kiss is known only to be a physical emotion.<br>But meeting you taught me, hearts kiss too.<br>Happy Kiss Day Bubu",
        photos: ["assets/kiss/1.jpg", "assets/kiss/2.jpg"]
    },
    {
        title: "Happy Valentine’s Day Bubu ❤️",
        msg: "You are my Love, Life and Lifeline.<br>You are the soul to my body.<br>Happy Valentines Day Bubu",
        photos: ["assets/valentine/1.jpg", "assets/valentine/2.jpg"]
    }
];

// ---------------- STATE ----------------
let dayIndex = 0;
let noHoverCount = 0;
const maxHovers = 5;

// ---------------- HELPERS ----------------
function getTodayIndex() {
    const today = new Date();
    if (today.getMonth() !== 1) return null;

    const map = { 7:0, 8:1, 9:2, 10:3, 11:4, 12:5, 13:6, 14:7 };
    return map[today.getDate()] ?? null;
}

function showCurrent() {
    const day = days[dayIndex];

    document.getElementById("day-title").innerText = day.title;
    document.getElementById("day-message").innerHTML = day.msg;

    const left = document.getElementById("left-photos");
    const right = document.getElementById("right-photos");
    left.innerHTML = "";
    right.innerHTML = "";

    day.photos.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        (i % 2 === 0 ? left : right).appendChild(img);
    });
}

// ---------------- MAIN ----------------


document.addEventListener("DOMContentLoaded", () => {

    // HARD RESET SCREENS
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById("proposal").classList.add("active");

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");

    // YES
    const dayMusic = document.getElementById("dayMusic");
    const noMusic = document.getElementById("noMusic");
    const dayMusicMap = [
        "assets/music/rose.mp3",       // Rose Day
        "assets/music/propose.mp3",    // Propose Day
        "assets/music/chocolate.mp3",  // Chocolate Day
        "assets/music/teddy.mp3",      // Teddy Day
        "assets/music/promise.mp3",    // Promise Day
        "assets/music/hug.mp3",        // Hug Day
        "assets/music/kiss.mp3",       // Kiss Day
        "assets/music/valentine.mp3"   // Valentine’s Day
    ];

    yesBtn.addEventListener("click", () => {
        document.getElementById("proposal").classList.remove("active");
        document.getElementById("no-slideshow").classList.remove("active");
        document.getElementById("slideshow").classList.add("active");

        const todayIndex = getTodayIndex();
        dayIndex = todayIndex;
        showCurrent();
        if (todayIndex !== null) {
            dayMusic.src = dayMusicMap[todayIndex];
        } else {
            dayMusic.src = "assets/music/valentine.mp3"; // fallback
        }
        
        if (dayMusic.paused) {
        dayMusic.volume = 0.7;  // gentle volume
        dayMusic.play().catch(() => {});
    }

    });

    // NO
    noBtn.addEventListener("click", () => {
        document.getElementById("proposal").classList.remove("active");
        document.getElementById("slideshow").classList.remove("active");
        document.getElementById("no-slideshow").classList.add("active");
        if (noMusic.paused) {
        noMusic.volume = 0.7;  // gentle volume
        noMusic.play().catch(() => {});
    }
    });

    // NO BUTTON EVADE (DESKTOP + MOBILE SAFE)
    function evadeNo(e) {
        e.preventDefault();
        e.stopPropagation();

        noHoverCount++;
        const factor = Math.max(maxHovers - noHoverCount, 1);
        const maxX = 260 * (factor / maxHovers);
        const maxY = 220 * (factor / maxHovers);

        const x = Math.random() * maxX * 2 - maxX;
        const y = Math.random() * maxY * 2 - maxY;

        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }

    noBtn.addEventListener("mouseenter", evadeNo);
    noBtn.addEventListener("touchstart", evadeNo, { passive: false });
});

// ---------------- FLOATING HEARTS ----------------
const heartsContainer = document.querySelector(".floating-hearts");
const MAX_HEARTS = 25; // absolute cap (mobile safe)

function createHeart() {
    const proposalActive =
        document.getElementById("proposal").classList.contains("active");

    const slideshowActive =
        document.getElementById("slideshow").classList.contains("active");

    // Only show hearts on proposal or yes slideshow
    if (!proposalActive && !slideshowActive) return;

    // HARD LIMIT — prevents freeze
    if (heartsContainer.children.length >= MAX_HEARTS) return;

    const heart = document.createElement("span");
    const size = Math.random() * 12 + 12; // smaller hearts = faster

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.width = size + "px";
    heart.style.height = size + "px";

    // Slower & shorter animation
    heart.style.animationDuration = slideshowActive ? "7s" : "9s";

    heart.innerHTML = `
        <svg viewBox="0 0 32 29.6">
            <path d="M23.6,0c-3.4,0-6.4,2-7.6,4.9C14.8,2,11.8,0,8.4,0
            C3.8,0,0,3.8,0,8.4c0,9.4,16,21.2,16,21.2s16-11.8,16-21.2
            C32,3.8,28.2,0,23.6,0z"/>
        </svg>
    `;

    heartsContainer.appendChild(heart);

    // Shorter lifetime = less memory pressure
    setTimeout(() => heart.remove(), slideshowActive ? 7000 : 9000);
}

const isMobile = window.innerWidth < 768;
setInterval(createHeart, isMobile ? 1400 : 900);
