//##########################//
//      Akriweb Script      //
//        Created by        //
//         Akrimion         //
//##########################//
//Cookies: AKlang = lang
//



//TRADUCTION ZONE
  /**
  * @file jquery.translate.js
  * @brief jQuery plugin to translate text in the client side.
  * @author Manuel Fernandes
  * @site
  * @version 0.9
  * @license MIT license <http://www.opensource.org/licenses/MIT>
  *
  * translate.js is a jQuery plugin to translate text in the client side.
  *
  */
  (function($){
  $.fn.translate = function(options) {
    var that = this; //a reference to ourselves
    var settings = {
      css: "trn",
      lang: "en"/*,
      t: {
        "translate": {
          pt: "tradução",
          br: "tradução"
        }
      }*/
    };
    settings = $.extend(settings, options || {});
    if (settings.css.lastIndexOf(".", 0) !== 0)   //doesn't start with '.'
      settings.css = "." + settings.css;
    var t = settings.t;
    //public methods
    this.lang = function(l) {
      if (l) {
        settings.lang = l;
        this.translate(settings);  //translate everything
      }
      return settings.lang;
    };
    this.get = function(index) {
      var res = index;
      try {
        res = t[index][settings.lang];
      }
      catch (err) {
        //not found, return index
        return index;
      }
      if (res)
        return res;
      else
        return index;
    };
    this.g = this.get;
    //main
    this.find(settings.css).each(function(i) {
      var $this = $(this);
      var trn_key = $this.attr("data-trn-key");
      if (!trn_key) {
        trn_key = $this.html();
        $this.attr("data-trn-key", trn_key);   //store key for next time
      }
      $this.html(that.get(trn_key));
      });
    return this;
    };
  })(jQuery);

//VARIABLE ZONE
  var translatorhead = $('head').translate({lang: getlang(), t: dico});
  var translator = $('body').translate({lang: getlang(), t: dico});
  var lang="fr";
  var dico={
    Home:{
      en:"Home",
      fr:"Accueil"
    },
    Akriweb:{
      en:"AkriWeb - Akrimion official website",
      fr:"AkriWeb - site officiel d'Akrimion"
    }
  };



//FUNCTION ZONE
	function setCookie(cname, cvalue, exdays) {
		exdays = exdays || 7;
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length,c.length);
      }
    }
    return "";
	}
  function getlang(){
    if(getCookie("AKlang")!=""){
      return getCookie('AKlang');
    }else{
      return "";
    }
  }
  function changeLang(){
    oldLang = getlang()
    if(oldLang == ""){
      _changelang("en");
    }else if(oldLang == "fr"){
      _changelang("en");
    }else if(oldLang == "en"){
      _changelang("fr");
    }
  }
  function _changelang(lang){
    console.log(lang);
    $("#langchanger_btn").html('Lang: '+lang);
    setCookie("AKlang",lang,7);
    translatorhead.lang(lang);
    translator.lang(lang);
  }
//FUNCTION END

$(document).ready(function() {

  //Cookies Zone
    if(getCookie("AKlang")!=""){
      lang=getCookie("AKlang");
    }else{
      lang="fr";
      setCookie("AKlang","fr",7);
    }


  //Lang zone
    $("#langchanger_btn").on('click',function(e){
      changeLang();
    });

 // translator.lang("en");//change to english
  changeLang();
});