/* =====================================================
   CRAZYLOVER
   MAIN JAVASCRIPT
===================================================== */


/* ================= ELEMENTS ================= */

const audio = document.getElementById("audio");

const playBtn =
    document.getElementById("playBtn");

const progressBar =
    document.getElementById("progressBar");

const progressFill =
    document.getElementById("progressFill");

const currentTimeEl =
    document.getElementById("currentTime");

const totalTimeEl =
    document.getElementById("totalTime");

const shuffleBtn =
    document.getElementById("shuffleBtn");

const repeatBtn =
    document.getElementById("repeatBtn");

const likeBtn =
    document.getElementById("likeBtn");

const volumeBtn =
    document.getElementById("volumeBtn");

const volumeSlider =
    document.getElementById("volumeSlider");

const miniPlayer =
    document.getElementById("miniPlayer");

const miniIcon =
    document.getElementById("miniIcon");

const enterScreen =
    document.getElementById("enterScreen");

const littleThingsButton =
    document.getElementById("littleThingsButton");

const littleThings =
    document.getElementById("littleThings");

const littleArrow =
    document.getElementById("littleArrow");

const menuButton =
    document.getElementById("menuButton");

const navbar =
    document.querySelector(".navbar");

const cursorGlow =
    document.getElementById("cursorGlow");

const particles =
    document.getElementById("particles");

const clock =
    document.getElementById("clock");

const dateText =
    document.getElementById("dateText");

const plusBtn =
    document.getElementById("plusBtn");

const minusBtn =
    document.getElementById("minusBtn");


/* ================= AUDIO ================= */

audio.volume = 1;

let previousVolume = 1;

let muted = true;


/* ================= FORMAT TIME ================= */

function formatTime(seconds) {

    if (
        isNaN(seconds) ||
        !isFinite(seconds)
    ) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");

    return `${minutes}:${secs}`;
}


/* ================= PLAYER UI ================= */

function updatePlayerUI() {

    if (audio.paused) {

        playBtn.textContent = "▶";

        miniIcon.textContent = "▶";

    } else {

        playBtn.textContent = "Ⅱ";

        miniIcon.textContent = "♫";

    }

}


/* ================= PLAY AUDIO ================= */

async function playAudio() {

    try {

        await audio.play();

        updatePlayerUI();

    } catch (error) {

        console.log(
            "Audio playback waiting for interaction."
        );

    }

}


/* ================= PLAY / PAUSE ================= */

playBtn.addEventListener(
    "click",
    async () => {

        if (audio.paused) {

            audio.muted = false;

            muted = false;

            await playAudio();

        } else {

            audio.pause();

        }

    }
);


/* ================= MINI PLAYER ================= */

miniPlayer.addEventListener(
    "click",
    async () => {

        if (audio.paused) {

            audio.muted = false;

            muted = false;

            await playAudio();

        } else {

            audio.pause();

        }

    }
);


/* ================= AUDIO EVENTS ================= */

audio.addEventListener(
    "play",
    updatePlayerUI
);


audio.addEventListener(
    "pause",
    updatePlayerUI
);


/* ================= PROGRESS ================= */

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {
            return;
        }

        const percentage =
            (audio.currentTime /
                audio.duration) * 100;

        progressFill.style.width =
            percentage + "%";

        currentTimeEl.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


/* ================= METADATA ================= */

audio.addEventListener(
    "loadedmetadata",
    () => {

        totalTimeEl.textContent =
            formatTime(
                audio.duration
            );

    }
);


/* ================= SEEK ================= */

progressBar.addEventListener(
    "click",
    (event) => {

        if (!audio.duration) {
            return;
        }

        const rect =
            progressBar.getBoundingClientRect();

        const percentage =
            (event.clientX - rect.left) /
            rect.width;

        audio.currentTime =
            percentage * audio.duration;

    }
);


/* ================= SHUFFLE ================= */

shuffleBtn.addEventListener(
    "click",
    () => {

        shuffleBtn.classList.toggle(
            "active"
        );

    }
);


/* ================= REPEAT ================= */

repeatBtn.addEventListener(
    "click",
    () => {

        repeatBtn.classList.toggle(
            "active"
        );

        audio.loop =
            repeatBtn.classList.contains(
                "active"
            );

    }
);


/* ================= LIKE ================= */

likeBtn.addEventListener(
    "click",
    () => {

        likeBtn.classList.toggle(
            "liked"
        );

        likeBtn.textContent =
            likeBtn.classList.contains("liked")
                ? "♥"
                : "♡";

    }
);


/* ================= VOLUME ================= */

volumeSlider.addEventListener(
    "input",
    () => {

        const value =
            Number(volumeSlider.value);

        audio.volume = value;


        if (value === 0) {

            muted = true;

            volumeBtn.textContent =
                "🔇";

        } else {

            muted = false;

            previousVolume = value;

            volumeBtn.textContent =
                "🔊";

        }

    }
);


/* ================= MUTE ================= */

volumeBtn.addEventListener(
    "click",
    () => {

        if (!muted) {

            previousVolume =
                audio.volume || 1;

            audio.volume = 0;

            volumeSlider.value = 0;

            volumeBtn.textContent =
                "🔇";

            muted = true;

        } else {

            const value =
                previousVolume || 1;

            audio.volume = value;

            volumeSlider.value =
                value;

            volumeBtn.textContent =
                "🔊";

            muted = false;

        }

    }
);


/* ================= ENTER SCREEN ================= */

async function enterWebsite() {

    audio.muted = false;

    muted = false;

    await playAudio();

    enterScreen.classList.add(
        "hidden"
    );

}


enterScreen.addEventListener(
    "click",
    enterWebsite,
    {
        once: true
    }
);


/* ================= AUTOPLAY ================= */

/*
    Browsers generally block audio
    that starts unmuted without user
    interaction.

    We therefore start muted.
    The Enter screen then enables sound.
*/

audio.addEventListener(
    "canplay",
    () => {

        if (audio.paused) {

            audio.muted = true;

            audio.play()
                .then(() => {

                    updatePlayerUI();

                })
                .catch(() => {

                    console.log(
                        "Autoplay blocked."
                    );

                });

        }

    }
);


/* ================= LITTLE THINGS ================= */

littleThingsButton.addEventListener(
    "click",
    () => {

        const opened =
            littleThings.classList.toggle(
                "open"
            );

        littleArrow.textContent =
            opened ? "−" : "+";

    }
);


/* ================= CLOCK ================= */

function updateClock() {

    const now =
        new Date();


    const time =
        now.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }
        );


    const date =
        now.toLocaleDateString(
            [],
            {
                weekday: "short",
                day: "2-digit",
                month: "short"
            }
        );


    clock.textContent =
        time;

    dateText.textContent =
        date;

}


updateClock();

setInterval(
    updateClock,
    1000
);


/* ================= PARTICLES ================= */

function createParticles() {

    if (!particles) {
        return;
    }

    const count =
        window.innerWidth < 600
            ? 15
            : 30;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.className =
            "particle";


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.animationDuration =
            8 +
            Math.random() * 12 +
            "s";


        particle.style.animationDelay =
            -Math.random() * 15 +
            "s";


        particle.style.opacity =
            .2 +
            Math.random() * .4;


        particles.appendChild(
            particle
        );

    }

}


createParticles();


/* ================= CURSOR GLOW ================= */

document.addEventListener(
    "mousemove",
    (event) => {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";

    }
);


/* ================= MOBILE MENU ================= */

menuButton.addEventListener(
    "click",
    () => {

        navbar.classList.toggle(
            "menu-open"
        );

    }
);


/* CLOSE MENU WHEN LINK CLICKED */

document
    .querySelectorAll(".navbar nav a")
    .forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    navbar.classList.remove(
                        "menu-open"
                    );

                }
            );

        }
    );


/* ================= KEYBOARD ================= */


/* SPACE = PLAY */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.code === "Space" &&
            event.target.tagName !== "INPUT"
        ) {

            event.preventDefault();

            if (audio.paused) {

                audio.muted = false;

                muted = false;

                playAudio();

            } else {

                audio.pause();

            }

        }

    }
);


/* M = MUTE */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key.toLowerCase() === "m"
        ) {

            volumeBtn.click();

        }

    }
);


/* ================= SIMPLE THOUGHT BUTTONS ================= */

let thoughtOffset = 0;


plusBtn.addEventListener(
    "click",
    () => {

        thoughtOffset++;

        document.querySelector(
            ".thought-card p:nth-of-type(2)"
        ).style.transform =
            `translateX(${thoughtOffset}px)`;

    }
);


minusBtn.addEventListener(
    "click",
    () => {

        thoughtOffset--;

        document.querySelector(
            ".thought-card p:nth-of-type(2)"
        ).style.transform =
            `translateX(${thoughtOffset}px)`;

    }
);