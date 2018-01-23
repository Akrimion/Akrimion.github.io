(function($){
  "use strict"; // Start of use strict

  var userLang = navigator.language || navigator.userLanguage;
  SwitchLang(userLang.toUpperCase());

  // Smooth scroll
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });
  // Closes menu when scroll
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict


// function for traduction
function Translate() {
  //initialization
  this.init =  function(attribute, lng){
    this.attribute = attribute;
    this.lng = lng;
  }
  //translate
  this.process = function(){
    _self = this;
    var xrhFile = new XMLHttpRequest();
    //load content data
    xrhFile.open("GET", "system/AKR/lang/"+this.lng+".json", false);
    xrhFile.onreadystatechange = function ()
    {
      if(xrhFile.readyState === 4)
      {
        if(xrhFile.status === 200 || xrhFile.status == 0)
        {
          var LngObject = JSON.parse(xrhFile.responseText);
          console.log(LngObject["name1"]);
          var allDom = document.getElementsByTagName("*");
          for(var i =0; i < allDom.length; i++){
            var elem = allDom[i];
            console.log(elem)
            var key = elem.getAttribute(_self.attribute);
            if(key != null) {
              console.log(key);
              elem.innerHTML = LngObject[key]  ;
            }
          }
        }
      }
    }
    xrhFile.send();
  }
}
function ChooseLang(element){
  var lang = element[0].innerHTML;
  SwitchLang(lang);
}
function SwitchLang(Lang) {
  // traduction
  var translate = new Translate();
  var currentLng = Lang;
  var attributeName = 'data-dico';
    translate.init(attributeName, currentLng);
    translate.process();
  // affichage de la langue sur le site
  $("#lang").html(Lang);
  $("html").attr("lang", Lang.toLowerCase())
  console.log(Lang);
}