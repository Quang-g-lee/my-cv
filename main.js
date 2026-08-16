document.addEventListener("DOMContentLoaded", function () {


    /* =========================
            CHUYỂN TAB
    ========================= */


    const navLinks = document.querySelectorAll(".nav-link[data-tab]");

    const tabPanels = document.querySelectorAll(".tab-panel");


    navLinks.forEach(function (navLink) {

        navLink.addEventListener("click", function (event) {

            event.preventDefault();

            const tabName = navLink.dataset.tab;

            const selectedPanel = document.getElementById(tabName);


            /* Không chuyển nếu tab chưa được tạo */

            if (!selectedPanel) {

                return;

            }


            navLinks.forEach(function (link) {

                link.classList.remove("active");

            });


            tabPanels.forEach(function (panel) {

                panel.classList.remove("active");

            });


            navLink.classList.add("active");

            selectedPanel.classList.add("active");

            window.history.replaceState(null, "", "#" + tabName);

        });

    });



    /* =========================
            TESTIMONIALS
    ========================= */


    const testimonialTrack = document.querySelector(".testimonial-track");

    const testimonialDots = document.querySelectorAll(".testimonial-dot");

    let currentTestimonialPage = 0;

    let testimonialTimer;


    function showTestimonialPage(pageIndex) {

        if (!testimonialTrack || testimonialDots.length === 0) {

            return;

        }


        currentTestimonialPage = pageIndex;

        testimonialTrack.style.transform =
            `translateX(-${currentTestimonialPage * 100}%)`;


        testimonialDots.forEach(function (dot) {

            dot.classList.remove("active");

        });


        testimonialDots[currentTestimonialPage].classList.add("active");

    }


    function nextTestimonialPage() {

        currentTestimonialPage++;


        if (currentTestimonialPage >= testimonialDots.length) {

            currentTestimonialPage = 0;

        }


        showTestimonialPage(currentTestimonialPage);

    }


    function restartTestimonialTimer() {

        clearInterval(testimonialTimer);

        testimonialTimer = setInterval(nextTestimonialPage, 3000);

    }


    testimonialDots.forEach(function (dot) {

        dot.addEventListener("click", function () {

            const pageIndex = Number(dot.dataset.slide);

            showTestimonialPage(pageIndex);

            restartTestimonialTimer();

        });

    });


    if (testimonialTrack && testimonialDots.length > 0) {

        restartTestimonialTimer();

    }



    /* =========================
            PORTFOLIO FILTER
    ========================= */


    const portfolioFilterButtons = document.querySelectorAll(".portfolio-filter");

    const portfolioItems = document.querySelectorAll(".portfolio-card");

    let isFilteringPortfolio = false;


    portfolioFilterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (isFilteringPortfolio) {

                return;

            }


            isFilteringPortfolio = true;

            const selectedCategory = button.dataset.filter;


            portfolioFilterButtons.forEach(function (filterButton) {

                filterButton.classList.remove("active");

            });


            button.classList.add("active");


            portfolioItems.forEach(function (item) {

                if (!item.hidden) {

                    item.animate(
                        [
                            {
                                opacity: 1,
                                transform: "scale(1)"
                            },
                            {
                                opacity: 0,
                                transform: "scale(0.9)"
                            }
                        ],
                        {
                            duration: 200,
                            easing: "ease",
                            fill: "forwards"
                        }
                    );

                }

            });


            setTimeout(function () {

                let visibleItemIndex = 0;


                portfolioItems.forEach(function (item) {

                    const itemCategory = item.dataset.category;

                    const shouldShow =
                        selectedCategory === "all" ||
                        selectedCategory === itemCategory;


                    item.hidden = !shouldShow;


                    if (shouldShow) {

                        item.animate(
                            [
                                {
                                    opacity: 0,
                                    transform: "translateY(20px) scale(0.95)"
                                },
                                {
                                    opacity: 1,
                                    transform: "translateY(0) scale(1)"
                                }
                            ],
                            {
                                duration: 350,
                                delay: visibleItemIndex * 70,
                                easing: "ease-out",
                                fill: "both"
                            }
                        );


                        visibleItemIndex++;

                    }

                });


                setTimeout(function () {

                    isFilteringPortfolio = false;

                }, 350 + visibleItemIndex * 70);

            }, 200);

        });

    });



    /* =========================
            PORTFOLIO POPUP
    ========================= */


    const portfolioActionCards = document.querySelectorAll(".portfolio-clickable");

    const portfolioLoadingModal = document.getElementById("portfolio-loading-modal");

    const portfolioLoadingClose = document.getElementById("portfolio-loading-close");

    const portfolioLightbox = document.getElementById("portfolio-lightbox");

    const portfolioLightboxContent = document.getElementById("portfolio-lightbox-content");

    const portfolioLightboxCounter = document.getElementById("portfolio-lightbox-counter");

    const portfolioLightboxClose = document.getElementById("portfolio-lightbox-close");

    const portfolioLightboxPrevious = document.getElementById("portfolio-lightbox-previous");

    const portfolioLightboxNext = document.getElementById("portfolio-lightbox-next");


    /* Ba nội dung lightbox theo đúng source gốc */

    const portfolioMedia = [

        {
            type: "youtube",
            source: "https://www.youtube.com/embed/bpOSxM0rNPM?autoplay=1&rel=0"
        },

        {
            type: "image",
            source: "training/work-06.jpg",
            alt: "Amazon Travel"
        },

        {
            type: "vimeo",
            source: "https://player.vimeo.com/video/199074744?autoplay=1"
        }

    ];


    let currentPortfolioMedia = 0;


    function lockPortfolioPage() {

        document.body.style.overflow = "hidden";

    }


    function unlockPortfolioPage() {

        document.body.style.overflow = "";

    }


    function openPortfolioLoading() {

        if (!portfolioLoadingModal) {

            return;

        }


        portfolioLoadingModal.classList.add("active");

        portfolioLoadingModal.setAttribute("aria-hidden", "false");

        lockPortfolioPage();

    }


    function closePortfolioLoading() {

        if (!portfolioLoadingModal) {

            return;

        }


        portfolioLoadingModal.classList.remove("active");

        portfolioLoadingModal.setAttribute("aria-hidden", "true");

        unlockPortfolioPage();

    }


    function showPortfolioMedia(mediaIndex) {

        if (!portfolioLightboxContent || !portfolioLightboxCounter) {

            return;

        }


        currentPortfolioMedia = mediaIndex;

        const selectedMedia = portfolioMedia[currentPortfolioMedia];


        portfolioLightboxContent.innerHTML = "";


        if (selectedMedia.type === "image") {

            const image = document.createElement("img");

            image.src = selectedMedia.source;

            image.alt = selectedMedia.alt;

            portfolioLightboxContent.appendChild(image);

        } else {

            const iframe = document.createElement("iframe");

            iframe.src = selectedMedia.source;

            iframe.title =
                selectedMedia.type === "youtube"
                    ? "George Motion YouTube video"
                    : "Recoba Template Vimeo video";

            iframe.allow = "autoplay; fullscreen; picture-in-picture";

            iframe.allowFullscreen = true;

            portfolioLightboxContent.appendChild(iframe);

        }


        portfolioLightboxCounter.textContent =
            currentPortfolioMedia + 1 + " of " + portfolioMedia.length;

    }


    function openPortfolioLightbox(mediaIndex) {

        if (!portfolioLightbox) {

            return;

        }


        showPortfolioMedia(mediaIndex);

        portfolioLightbox.classList.add("active");

        portfolioLightbox.setAttribute("aria-hidden", "false");

        lockPortfolioPage();

    }


    function closePortfolioLightbox() {

        if (!portfolioLightbox || !portfolioLightboxContent) {

            return;

        }


        portfolioLightbox.classList.remove("active");

        portfolioLightbox.setAttribute("aria-hidden", "true");

        portfolioLightboxContent.innerHTML = "";

        unlockPortfolioPage();

    }


    function showNextPortfolioMedia() {

        currentPortfolioMedia++;


        if (currentPortfolioMedia >= portfolioMedia.length) {

            currentPortfolioMedia = 0;

        }


        showPortfolioMedia(currentPortfolioMedia);

    }


    function showPreviousPortfolioMedia() {

        currentPortfolioMedia--;


        if (currentPortfolioMedia < 0) {

            currentPortfolioMedia = portfolioMedia.length - 1;

        }


        showPortfolioMedia(currentPortfolioMedia);

    }


    portfolioActionCards.forEach(function (card) {

        function openSelectedPortfolioItem() {

            const action = card.dataset.action;


            if (action === "loading") {

                openPortfolioLoading();

            }


            if (action === "lightbox") {

                const mediaIndex = Number(card.dataset.lightboxIndex);

                openPortfolioLightbox(mediaIndex);

            }

        }


        card.addEventListener("click", openSelectedPortfolioItem);


        card.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                openSelectedPortfolioItem();

            }

        });

    });


    if (portfolioLoadingClose) {

        portfolioLoadingClose.addEventListener("click", closePortfolioLoading);

    }


    if (portfolioLightboxClose) {

        portfolioLightboxClose.addEventListener("click", closePortfolioLightbox);

    }


    if (portfolioLightboxNext) {

        portfolioLightboxNext.addEventListener("click", showNextPortfolioMedia);

    }


    if (portfolioLightboxPrevious) {

        portfolioLightboxPrevious.addEventListener("click", showPreviousPortfolioMedia);

    }


    document.addEventListener("keydown", function (event) {

        if (
            portfolioLoadingModal &&
            portfolioLoadingModal.classList.contains("active") &&
            event.key === "Escape"
        ) {

            closePortfolioLoading();

        }


        if (portfolioLightbox && portfolioLightbox.classList.contains("active")) {

            if (event.key === "Escape") {

                closePortfolioLightbox();

            }


            if (event.key === "ArrowRight") {

                showNextPortfolioMedia();

            }


            if (event.key === "ArrowLeft") {

                showPreviousPortfolioMedia();

            }

        }

    });

});
