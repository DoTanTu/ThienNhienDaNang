$(document).ready(function () {
    $('.owl-slider-cover').owlCarousel({
        autoplay: false,
        autoplayTimeout: 4000,
        animateOut: 'animate__fadeOut',
        animateIn: 'animate__fadeIn',
        loop: true,
        margin: 0,
        dots: true,
        nav: false,
        navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    })

    $('.owl-sukien').owlCarousel({
        // autoplay: true,
        // autoplayTimeout: 3000,
        animateOut: 'animate__fadeOut',
        animateIn: 'animate__fadeIn',
        loop: true,
        margin: 5,
        dots: true,
        nav: false,
        navText: ["<i class='bi bi-chevron-left'></i>", "<i class='bi bi-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    })

    $('.owl-tintuc').owlCarousel({
        // autoplay: true,
        // autoplayTimeout: 3000,
        animateOut: 'animate__fadeOut',
        animateIn: 'animate__fadeIn',
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        navText: ["<i class='bi bi-chevron-left'></i>", "<i class='bi bi-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            992: {
                items: 3,
            },
            1200:{
                items:3,
                margin:60
            }
        }
    })

    $('.owl-tulieu').owlCarousel({
        // autoplay: true,
        // autoplayTimeout: 3000,
        // animateOut: 'animate__fadeOut',
        // animateIn: 'animate__fadeIn',
        loop: true,
        margin: 10,
        dots: true,
        nav: true,
        navText: ["<i class='bi bi-chevron-left'></i>", "<i class='bi bi-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    })

    $('.owl-homebook').owlCarousel({
        // autoplay: true,
        // autoplayTimeout: 3000,
        // animateOut: 'animate__fadeOut',
        // animateIn: 'animate__fadeIn',
        loop: false,
        margin: 60,
        dots: false,
        nav: true,
        navText: ["<i class='bi bi-chevron-left'></i>", "<i class='bi bi-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            574: {
                items: 3
            },
            1200: {
                items: 2
            }
        }
    })

    $('.owl-homedoitac').owlCarousel({
        // autoplay: true,
        // autoplayTimeout: 3000,
        // animateOut: 'animate__fadeOut',
        // animateIn: 'animate__fadeIn',
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        navText: ["<i class='bi bi-chevron-left'></i>", "<i class='bi bi-chevron-right'></i>"],
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1200: {
                items: 5
            }
        }
    })

    $('.owl-homevideo').owlCarousel({
        // autoplay: true,
        // autoplayTimeout: 3000,
        // animateOut: 'animate__fadeOut',
        // animateIn: 'animate__fadeIn',
        loop: true,
        margin: 30,
        dots: true,
        nav: true,
        navText: ["<i class='bi bi-chevron-left'></i>", "<i class='bi bi-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    })

    $('.owl-quantam').owlCarousel({
        // autoplay: true,
        // autoplayTimeout: 3000,
        // animateOut: 'animate__fadeOut',
        // animateIn: 'animate__fadeIn',
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        navText: ["<i class='bi bi-chevron-left'></i>", "<i class='bi bi-chevron-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    })
    

    

});
// <i class='bi bi-chevron-left'></i>
// navText: ["<div class='btn-owl-left'></div>", "<div class='btn-owl-right'></div>"],

var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});