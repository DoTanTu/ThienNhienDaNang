

// When the user scrolls down 152px from the top of the document, slide down the navbar
window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  let navBar = document.getElementById("nav-bar")
  let navLogo = document.getElementById("nav-logo")
  if (document.body.scrollTop > 290 || document.documentElement.scrollTop > 290) {
    if (navBar != (null && undefined)) {
    document.getElementById("nav-bar").classList.add('active');
    }
    if (navLogo != (null && undefined)) {
    document.getElementById("nav-logo").classList.add('active');
    }
    // document.getElementById("nav-fake").classList.add('active');
  } else {
    if (navBar != (null && undefined)) {
      document.getElementById("nav-bar").classList.remove('active');
      }
      if (navLogo != (null && undefined)) {
      document.getElementById("nav-logo").classList.remove('active');
      }
    // document.getElementById("nav-fake").classList.remove('active');
  }
}

// $(function () {
//   $('.text-animate').textillate();
// })

// OR Via JavaScript
// $('.tx-ani-1').textillate({
//   in: {
//     effect: 'animate__fadeInDown',
//     initialDelay: 1000,
//     delayScale: 1,
//     delay: 50,
//     sync: false,
//     reverse: false,
//     shuffle: false,
//     callback: function () {}
//   }
// });

var btn = $('#backtop');

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, '300');
});


function toggledrdownbox(ref) {
  document.getElementByid("side-box-drdown-box-1").classList.toggle('active');
  document.getElementByid('drdown-icon').classList.toggle('active');
}

function toggledrdownbox(ref) {
  document.getElementById("side-box-drdown-box-2").classList.toggle('active');
}
function togglesidecate1(ref) {
  document.getElementById("side-list-1").classList.toggle('active');
  document.getElementsByClassName("side-list-icon").classList.toggle('active');
}
function togglesidecate11(ref) {
  document.getElementById("side-list-1-1").classList.toggle('active');
}

// Danh-muc
// 1

function catelist(x) {
  let catelist = x.parentElement
  let list = catelist.getElementsByClassName('side-cate-list-drdown')[0]
  list.classList.toggle('active')
  x.classList.toggle('active')
}



// lightGallery

lightGallery(document.getElementById('lightgallery-1'), {
  plugins: [lgZoom, lgThumbnail],
  licenseKey: 'your_license_key',
  speed: 500,
  thumnail: true,
  // ... other settings
});

//lightGallery-inline 
const $lgContainer = document.getElementById("gallery-container");

const lg = lightGallery($lgContainer, {
  speed: 500,
  container: $lgContainer,
  // Do not allow users to close the gallery
  closable: false,
  // Add maximize icon to enlarge the gallery
  showMaximizeIcon: true,
  // plugins: [lgZoom]
  plugins: [lgZoom, lgThumbnail]
});
lg.openGallery(0);

// function qrchecked() {
//   document.getElementByid("qrcode").classList.toggle('d-block');
// }

