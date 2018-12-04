/*jslint browser: true*/
/*jshint esnext: true*/
/*jshint sub: true*/
/*global window, $*/

$(document).ready( function() {

  // -- Enable animate on scroll --

  AOS.init({
    // Global settings:
    disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 300, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

  });

  // -- Navigation bar --

  var prevScrollpos = window.pageYOffset;

  // Nav show / hide on scroll
  $(window).on('scroll', function() {
    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
      $(".nav").css("top", "0");
    } else {
      $(".nav").css("top","-68px");
      $('.nav-check').prop( "checked", false );
      $('.nav label').removeClass('toggle');
    }
    prevScrollpos = currentScrollPos;
  });

  // Hide nav on anchor click
  $(".nav a").on('click', function() {
    $('.nav-check').prop( "checked", false );
    $('.nav label').removeClass('toggle');
  });

  // Nav menu button animation
  var toggleNav = $('.nav label').click(function () {
    toggleNav.toggleClass('toggle');
  });

  // -- Move background on mouse move --

  /*document.addEventListener('mousemove', function (event) {
    //var mousex = event.pageX;
    var mousey = event.pageY;

    if (window.event) {
        event = window.event;
    }

    $('.landing').css('background-position', '50% ' + -mousey / 15 + 'px');
  }, false);*/

  // -- Top Nav Scrollspy --

  var sections = [];
  var sectionOffsets = [];
  var scrollTop = 0;

  // Get section offsets
  $("section:not(.nav, .landing)").each(function(){
    var offset = $(this).offset();
    sectionOffsets.push(offset.top - 100);
    sections.push($(this).attr('id'));
  });

  // On scroll compare scroll from top to section offset
  $(window).on('scroll', function() {
    scrollTop = $(window).scrollTop();
    $('#nav a').removeClass('active');
    if(scrollTop > sectionOffsets[0] && scrollTop < sectionOffsets[1]) {
      $('#nav a:eq(0)').addClass('active');
    }
    else if(scrollTop > sectionOffsets[1] && scrollTop < sectionOffsets[2]) {
      $('#nav a:eq(1)').addClass('active');
    }
    else if(scrollTop > sectionOffsets[2] && scrollTop < sectionOffsets[3]) {
      $('#nav a:eq(3)').addClass('active');
    }
    else if(scrollTop > sectionOffsets[3]) {
      $('#nav a:eq(4)').addClass('active');
    }
  });

  // -- Portfolio Options --

  var work = $('.work:not(.year)');

  // Click events
  $('.p-all').on('click', function() {
    work.fadeIn();
  });
  $('.p-websites').on('click', function() {
    work.fadeOut();
    $('.website').fadeIn();
  });
  $('.p-graphics').on('click', function() {
    work.fadeOut();
    $('.graphic').fadeIn();
  });
  $('.p-blogs').on('click', function() {
    work.fadeOut();
    $('.blog').fadeIn();
  });

  // Active link class
  $(function () {
    var links = $('.options > a').click(function () {
      links.removeClass('active');
      $(this).addClass('active');
    });
  });

});


