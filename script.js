console.log("Script loaded");
alert("JS loaded on mobile");

// Valentine days with MULTIPLE photos
const days = [
    {
        title: "Happy Rose Day Bubu🌹",
        msg: "A rose for you, because you make my world bloom.<br>All the thorny roads i will take, only to reach you.<br> Happy Rose Day Bubu",
        photos: [
            "assets/rose/1.jpg",
            "assets/rose/2.jpg"
        ]
    },
    {
        title: "Happy Propose Day Bubu 💍",
        msg: "I choose you today, tomorrow, always. <br>I choose Us. <br>Happy Propose Day Bubu",
        photos: [
            "assets/propose/1.jpg",
            "assets/propose/2.jpg"
        ]
    },
    {
        title: "Happy Chocolate Day Bubu 🍫",
        msg: "Life is sweeter with you. <br>And Dark without you. <br>Happy Chocolate Day Bubu",
        photos: [
            "assets/chocolate/1.jpg",
            "assets/chocolate/2.jpg"
        ]
    },
    {
        title: "Happy Teddy Day Bubu 🧸",
        msg: "Who said it has to be only Teddy why not a Camel.<br> FYI You are my Teddy.<br> Happy Teddy Day Bubu.",
        photos: [
            "assets/teddy/1.jpg",
            "assets/teddy/2.jpg"
        ]
    },
    {
        title: "Happy Promise Day Bubu 🤞",
        msg: "I promise to stand by you.<br> I promise to better myself for you. <br> I promise to be there for you.<br> Happy Promise Day Bubu",
        photos: [
            "assets/promise/1.jpg",
            "assets/promise/2.jpg"
        ]
    },
    {
        title: "Happy Hug Day Bubu 🤗",
        msg: "Your hug feels like home.<br> Without it every second is a doom. <br> With your Hug my energy goes boom.<br> Happy Hug Day Bubu",
        photos: [
            "assets/hug/1.jpg",
            "assets/hug/2.jpg"
        ]
    },
    {
        title: "Happy Kiss Day Bubu 💋",
        msg: "Kiss is known only to be a physical emotion.<br> But meeting you taught me, hearts kiss too.<br> Happy Kiss Day Bubu",
        photos: [
            "assets/kiss/1.jpg",
            "assets/kiss/2.jpg"
        ]
    },
    {
        title: "Happy Valentine’s Day Bubu ❤️",
        msg: "You are my Love, Life and Lifeline. <br> You are the soul to my body. <br> Happy Valentines Day Bubu  ",
        photos: [
            "assets/valentine/1.jpg",
            "assets/valentine/2.jpg"
        ]
    }
];

let dayIndex = 0;
let photoIndex = 0;
// Make NO button dodge on hover
// Progressive hover for NO button
// Reverse progressive hover for NO button
let noHoverCount = 0;
const maxHovers = 5; // after this, movement is minimal

const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseenter", () => {
    noHoverCount++;

    // Strength decreases with each hover
    const factor = Math.max(maxHovers - noHoverCount, 1);

    const maxX = 360 * (factor / maxHovers); // starts big, shrinks
    const maxY = 300 * (factor / maxHovers);

    const x = (Math.random() * maxX * 2) - maxX;
    const y = (Math.random() * maxY * 2) - maxY;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;
});



// DOM ready
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("yesBtn").addEventListener("click", startYes);
    document.getElementById("noBtn").addEventListener("click", startNo);

    //document.getElementById("slideshow").addEventListener("click", nextSlide);
});
function getTodayIndex() {
    const today = new Date();
    const month = today.getMonth(); // Feb = 1
    const date = today.getDate();

    if (month !== 1) return null; // Not February

    const map = {
        7: 0,   // Rose Day
        8: 1,   // Propose Day
        9: 2,   // Chocolate Day
        10: 3,  // Teddy Day
        11: 4,  // Promise Day
        12: 5,  // Hug Day
        13: 6,  // Kiss Day
        14: 7   // Valentine’s Day
    };

    return map[date] ?? null;
}


function startYes() {
    document.getElementById("proposal").classList.remove("active");
    document.getElementById("no-slideshow").classList.remove("active");
    document.getElementById("slideshow").classList.add("active");

    const todayIndex = getTodayIndex();

    if (todayIndex === null) {
        document.getElementById("day-title").innerText = "Just Because ❤️";
        document.getElementById("day-message").innerText =
            "I don’t need a special day to choose you.";

        document.getElementById("left-photos").innerHTML = "";
        document.getElementById("right-photos").innerHTML = "";
        return;
    }

    dayIndex = todayIndex;
    showCurrent();
}
/*
function startYes() {
    dayIndex = 0;
    photoIndex = 0;

    document.getElementById("proposal").classList.remove("active");
    document.getElementById("no-slideshow").classList.remove("active");
    document.getElementById("slideshow").classList.add("active");

    showCurrent();
}
*/
function startNo() {
    document.getElementById("proposal").classList.remove("active");
    document.getElementById("slideshow").classList.remove("active");
    document.getElementById("no-slideshow").classList.add("active");
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

        // Alternate left / right
        if (i % 2 === 0) {
            left.appendChild(img);
        } else {
            right.appendChild(img);
        }
    });
}
function evadeNo() {
    noHoverCount++;

    const factor = Math.max(maxHovers - noHoverCount, 1);
    const maxX = 160 * (factor / maxHovers);
    const maxY = 100 * (factor / maxHovers);

    const x = (Math.random() * maxX * 2) - maxX;
    const y = (Math.random() * maxY * 2) - maxY;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}
const isMobile = window.innerWidth < 768;
setInterval(createHeart, isMobile ? 1200 : 600);

// Desktop hover
noBtn.addEventListener("mouseenter", evadeNo);

// Mobile touch
noBtn.addEventListener("touchstart", evadeNo);


/*
function nextSlide() {
    dayIndex++;
    if (dayIndex >= days.length) return;
    showCurrent();
}
*/
// Floating hearts on proposal screen
const heartsContainer = document.querySelector(".floating-hearts");
function createHeart() {
    if (!document.getElementById("proposal").classList.contains("active")) return;

    const heart = document.createElement("span");

    const size = Math.random() * 14 + 14; // 14px–28px
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.width = size + "px";
    heart.style.height = size + "px";
    heart.style.animationDuration = (Math.random() * 4 + 6) + "s";
    heart.innerHTML = `
        <svg viewBox="0 0 32 29.6" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.6,0c-3.4,0-6.4,2-7.6,4.9C14.8,2,11.8,0,8.4,0
            C3.8,0,0,3.8,0,8.4c0,9.4,16,21.2,16,21.2s16-11.8,16-21.2
            C32,3.8,28.2,0,23.6,0z"/>
        </svg>
    `;

    document.querySelector(".floating-hearts").appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
}

// Create hearts periodically
setInterval(createHeart, 600);

