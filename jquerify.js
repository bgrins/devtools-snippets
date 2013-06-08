// https://github.com/bgrins/devtools-snippets
// Add jQuery to any page

(function() {
	
	var s = document.createElement( 'script' );
	var prop = ( typeof s.src ).toLowerCase();
	if (prop !== 'undefined' && prop === 'string')
		s.src = 'http://code.jquery.com/jquery-2.0.0.min.js';
	else
		s.setAttribute( 'src','http://code.jquery.com/jquery-2.0.0.min.js' );
	document.body.appendChild( s );

})();
