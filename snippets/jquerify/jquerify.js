// jquerify.js
// https://github.com/bgrins/devtools-snippets
// Add jQuery to any page that does not have it already.

(function () {

  if ( !window.jQuery ) {
    var s = document.createElement('script');
    s.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js');
    document.body.appendChild(s);
    s.addEventListener('load', function(){
        jQuery.noConflict();
    });
    console.log('jquery loaded!');
  }

})();
