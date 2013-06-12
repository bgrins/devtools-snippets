// https://github.com/bgrins/devtools-snippets
// Add jQuery to any page

(function () {
    if ( !window.jQuery ) {
        var s=document.createElement('script');
        s.setAttribute('src','//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js');
        document.body.appendChild(s);
    }
})();
