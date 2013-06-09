// https://github.com/bgrins/devtools-snippets
// Add jQuery to any page
	
(function () {
    if ( !window.jQuery ) {
        var jQ = document.createElement('script');
        var prop = typeof jQ.src;
        if ( prop != 'undefined' && prop.toLowerCase() == 'string' )
            jQ.src = '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js';
        else
            jQ.setAttribute( 'src', '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js' );
        
        document.body.appendChild( jQ );
    }
})();
