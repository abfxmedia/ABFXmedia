/* =========================
   PROJECT FILTER
========================= */

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        // Remove active from all
        filters.forEach(item => {
            item.classList.remove("active");
        });

        // Add active to clicked button
        filter.classList.add("active");

        const selectedCategory = filter.dataset.filter;

        projects.forEach(project => {

            const projectCategory = project.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === projectCategory
            ) {

                project.style.display = "block";

            } else {

                project.style.display = "none";

            }

        });

    });

});


/* =========================
   VIDEO MODAL
========================= */

const projectCards = document.querySelectorAll(".project-card");

const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeModal = document.getElementById("closeModal");


projectCards.forEach(project => {

    project.addEventListener("click", () => {

        const videoSource = project.dataset.video;

        if (!videoSource) {
            return;
        }

        modalVideo.src = videoSource;

        videoModal.classList.add("active");

        modalVideo.play();

        document.body.style.overflow = "hidden";

    });

});


/* =========================
   CLOSE VIDEO
========================= */

function closeVideo() {

    modalVideo.pause();

    modalVideo.currentTime = 0;

    modalVideo.src = "";

    videoModal.classList.remove("active");

    document.body.style.overflow = "";

}


closeModal.addEventListener("click", closeVideo);


/* Click outside video */

videoModal.addEventListener("click", event => {

    if (event.target === videoModal) {

        closeVideo();

    }

});


/* ESC KEY */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeVideo();

    }

});


/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menuButton");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {

    navLinks.classList.toggle("mobile-open");

});


/* =========================
   CLOSE MOBILE MENU
========================= */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("mobile-open");

    });

});