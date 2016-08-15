//##########################//
//      Akriweb Script      //
//        Created by        //
//         Akrimion         //
//##########################//
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
  /*  var tempdico="";
    var client = new XMLHttpRequest();
    client.open('GET', 'assets/json/strings.json');
    client.onreadystatechange = function() {
      tempdico=client.responseText;
      try{
      dico=JSON.parse(tempdico);
      }catch(err){}
      console.log(dico)
    }
    client.send();*/
    


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


//FUNCTION END

$(document).ready(function() {
  //Cookies Zone
  if(getCookie("AKlang")!=""){
    var lang=getCookie("AKlang");
  }else{
    var lang="fr";
    setCookie("AKlang","fr",7);
  }
  var translatorhead = $('head').translate({lang: lang, t: dico});
  var translator = $('body').translate({lang: lang, t: dico});

 // translator.lang("en");//change to english
});