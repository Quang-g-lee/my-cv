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


/* Hiển thị trang Testimonials được chọn */

function showTestimonialPage(pageIndex) {

    currentTestimonialPage = pageIndex;

    testimonialTrack.style.transform =
        `translateX(-${currentTestimonialPage * 100}%)`;

    testimonialDots.forEach(function (dot) {

        dot.classList.remove("active");

    });

    testimonialDots[currentTestimonialPage].classList.add("active");

}


/* Chuyển sang trang tiếp theo */

function nextTestimonialPage() {

    currentTestimonialPage++;

    if (currentTestimonialPage >= testimonialDots.length) {

        currentTestimonialPage = 0;

    }

    showTestimonialPage(currentTestimonialPage);

}


/* Bấm dấu chấm để chuyển trang */

testimonialDots.forEach(function (dot) {

    dot.addEventListener("click", function () {

        const pageIndex = Number(dot.dataset.slide);

        showTestimonialPage(pageIndex);

        restartTestimonialTimer();

    });

});


/* Khởi động lại bộ đếm thời gian */

function restartTestimonialTimer() {

    clearInterval(testimonialTimer);

    testimonialTimer = setInterval(nextTestimonialPage, 3000);

}


/* Chỉ chạy khi trang có Testimonials */

if (testimonialTrack && testimonialDots.length > 0) {

    restartTestimonialTimer();

}