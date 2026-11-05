
document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       PROJECT FILTERS
    ========================= */

    const filters = document.querySelectorAll(".filter");
    const projectCards = document.querySelectorAll(".project-card");

    filters.forEach(filter => {
        filter.addEventListener("click", function () {

            filters.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const selectedCategory = this.dataset.filter;

            projectCards.forEach(card => {
                const projectCategory = card.dataset.category;

                card.style.display =
                    selectedCategory === "all" ||
                    projectCategory === selectedCategory
                        ? ""
                        : "none";
            });

        });
    });


   
/* =========================
   YOUTUBE HOVER PREVIEW
========================= */

projectCards.forEach(card => {

    const image = card.querySelector(".project-image");
    const preview = card.querySelector(".video-preview");

    if (!image || !preview) return;

    const videoId = preview.dataset.preview;

    image.addEventListener("mouseenter", function () {

        if (window.matchMedia("(hover: none)").matches) return;
        if (!videoId) return;
        if (videoModal && videoModal.classList.contains("active")) return;

        preview.src =
            "https://www.youtube.com/embed/" +
            videoId +
            "?autoplay=1&mute=1&controls=0&loop=1&playlist=" +
            videoId +
            "&playsinline=1&rel=0";

        image.classList.add("preview-active");

    });

    image.addEventListener("mouseleave", function () {

        preview.src = "";
        image.classList.remove("preview-active");

    });

});



    /* =========================
       YOUTUBE VIDEO MODAL
    ========================= */

    const videoModal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("projectVideo");
    const videoClose = document.getElementById("videoClose");
    const videoContent = document.getElementById("videoModalContent");

    if (videoModal && videoFrame && videoClose && videoContent) {

        projectCards.forEach(card => {

            card.addEventListener("click", function () {

                const videoId = this.dataset.video;
                const videoType = this.dataset.type;

                if (!videoId) return;

                // Stop all hover previews
                document.querySelectorAll(".video-preview").forEach(preview => {
                    preview.src = "";
                    preview.closest(".project-image")
                        ?.classList.remove("preview-active");
                });

                videoFrame.src =
                    "https://www.youtube.com/embed/" +
                    encodeURIComponent(videoId) +
                    "?autoplay=1&mute=1&rel=0&playsinline=1";

                videoContent.classList.toggle(
                    "vertical-video",
                    videoType === "vertical"
                );

                videoModal.classList.add("active");
                document.body.style.overflow = "hidden";

            });

        });


        /* CLOSE VIDEO */

        function closeVideo() {

            videoModal.classList.remove("active");
            videoFrame.src = "";

            videoContent.classList.remove("vertical-video");
            document.body.style.overflow = "";

        }

        videoClose.addEventListener("click", closeVideo);


        /* CLICK OUTSIDE VIDEO */

        videoModal.addEventListener("click", function (event) {

            if (event.target === videoModal) {
                closeVideo();
            }

        });


        /* ESC KEY */

        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" &&
                videoModal.classList.contains("active")
            ) {
                closeVideo();
            }

        });

    }


    /* =========================
       MOBILE MENU
    ========================= */

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", function () {
            navLinks.classList.toggle("mobile-open");
        });

        /* CLOSE MOBILE MENU */

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", function () {
                navLinks.classList.remove("mobile-open");
            });

        });

    }

});
