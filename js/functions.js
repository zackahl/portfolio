/*jslint browser: true*/
/*jshint esnext: true*/
/*jshint sub: true*/
/*global window, $, AOS*/

$(window).on('load', function () {
  //setTimeout(function () {
      $("#loader").fadeOut(300, function(){
          $(this).remove();
      });
  //}, 2000);
});

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
  $('#portfolio').on('click', '.p-all', function() {
    work.fadeIn();
  });
  $('#portfolio').on('click', '.p-websites', function() {
    work.fadeOut();
    $('.website').fadeIn();
  });
  $('#portfolio').on('click', '.p-graphics', function() {
    work.fadeOut();
    $('.graphic').fadeIn();
  });
  /*$('#portfolio').on('click', '.p-blogs', function() {
    work.fadeOut();
    $('.blog').fadeIn();
  });*/

  // -- Portfolio Content --

  var loadWorks = function(arrStart, arrEnd) {

    // Create html for each portfolio item
    for (var i = arrStart - 1; i >= arrEnd; i--) {
      var obj = "";

        obj += '<div class="work ' + objArray[i].category + ' col-xs-12 col-md-3">' +
               '<div class="block">' +
               '<span class="year">' + objArray[i].year + '</span>';

      if(objArray[i].links.website.active === true) {
        obj += '<div class="caption"><a href="' + objArray[i].links.website.link + '">' + objArray[i].caption + '</a></div>';
      } else {
        obj += '<div class="caption">' + objArray[i].caption + '</div>';
      }

      if(objArray[i].summary !== null) {
        obj += '<p class="summary">' + objArray[i].summary + '</p>';
      }

      if(objArray[i].image !== null) {
        obj += '<img src="' + objArray[i].image + '" alt="' + objArray[i].caption + '">';
      }

        obj += '<div class="links">';

      if(objArray[i].links.dribbble.active === true) {
        obj += '<a href="' + objArray[i].links.dribbble.link + '" target="_blank" rel="noopener">' +
               '<svg class="icon-social-dribbble">' +
               '<use xlink:href="icons.svg#icon-social-dribbble"></use>' +
               '</svg></a>';
      }

      if(objArray[i].links.instagram.active === true) {
        obj += '<a href="' + objArray[i].links.instagram.link + '" target="_blank" rel="noopener">' +
               '<svg class="icon-social-instagram">' +
               '<use xlink:href="icons.svg#icon-social-instagram"></use>' +
               '</svg></a>';
      }

      if(objArray[i].links.github.active === true) {
        obj += '<a href="' + objArray[i].links.github.link + '" target="_blank" rel="noopener">' +
               '<svg class="icon-dev-github">' +
               '<use xlink:href="icons.svg#icon-dev-github"></use>' +
               '</svg></a>';
      }

      if(objArray[i].links.website.active === true) {
        obj += '<a href="' + objArray[i].links.website.link + '" target="_blank" rel="noopener">' +
               '<svg class="icon-a-link">' +
               '<use xlink:href="icons.svg#icon-a-link"></use>' +
               '</svg></a>';
      }

        obj += '</div></div></div>';

      // Append to gallery
      $('#gallery').append(obj);
    }

    // Update work event bindings for options
    work = $('.work:not(.year)');

    // 
    if(arrEnd === 0) {
      $('.load-more').fadeOut();
    }
  };

  // Get data objects from json
  var objArray = [];
  var requestURL = '/js/portfolio-data.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  // When the request has loaded
  request.onload = function() {
    objArray = request.response;

    // -- Load Portfolio items --

    // Sort objects
    objArray.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0))

    // Initial load of 4 items
    var arrStart = objArray.length;
    var arrEnd = objArray.length - 4;
    loadWorks(arrStart, arrEnd);

    // Load 4 more items each click
    $('.load-more').on('click', function() {
      // Change range array range by 4
      arrEnd -= 4;
      if(arrEnd <= 0) {
        arrEnd = 0; 
      }
      arrStart -= 4;
      if(arrStart <= 0) {
        arrStart = 0; 
      }

      // Call loadWorks function
      loadWorks(arrStart, arrEnd);

      // Reset to default option display all
      $('#portfolio .p-all').click();
    });

    // Load further 4 items on page load
    $('#portfolio .load-more').click();
  };

  // Active link class
  $(function () {
    var links = $('.options > a').click(function () {
      links.removeClass('active');
      $(this).addClass('active');
    });
  });

  // Get current year for copyright
	var date = new Date();
	var year = date.getFullYear();
	document.getElementById("year").innerHTML = year;

});
