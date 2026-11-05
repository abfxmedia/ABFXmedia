
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

        preview.src =
            "https://www.youtube.com/embed/" +
            videoId +
            "?autoplay=1&mute=1&controls=0&playsinline=1&rel=0";

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

/* ==============================
   HERO YOUTUBE SHOWREEL - 5 VIDEOS
============================== */

(function () {

    const heroVideos = [
        "_0kVG9PrGW4",
        "JpF0-hx4t1o",
        "wiv3O0V9HN4",
        "LnmdkBWADhg",
        "CVjk0ES380o"
    ];

    let currentVideo = 0;
    let heroPlayer;

    const counter = document.getElementById("heroVideoCounter");

    function updateCounter() {
        if (counter) {
            counter.textContent =
                String(currentVideo + 1).padStart(2, "0") +
                " / 05";
        }
    }

    function createHeroPlayer() {

        heroPlayer = new YT.Player("heroShowreelPlayer", {

            videoId: heroVideos[currentVideo],

            playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                fs: 0,
                playsinline: 1,
                rel: 0,
                modestbranding: 1
            },

            events: {

                onReady: function (event) {
                    event.target.mute();
                    event.target.playVideo();
                    updateCounter();
                },

                onStateChange: function (event) {

                    if (event.data === YT.PlayerState.ENDED) {

                        currentVideo++;

                        if (currentVideo >= heroVideos.length) {
                            currentVideo = 0;
                        }

                        updateCounter();

                        heroPlayer.loadVideoById({
                            videoId: heroVideos[currentVideo]
                        });

                    }

                },

                onError: function () {
                    currentVideo = (currentVideo + 1) % heroVideos.length;
                    updateCounter();

                    heroPlayer.loadVideoById({
                        videoId: heroVideos[currentVideo]
                    });
                }

            }

        });

    }

    window.onYouTubeIframeAPIReady = createHeroPlayer;

    if (window.YT && window.YT.Player) {
        createHeroPlayer();
    } else {

        const tag = document.createElement("script");

        tag.src = "https://www.youtube.com/iframe_api";

        document.head.appendChild(tag);

    }

})();
