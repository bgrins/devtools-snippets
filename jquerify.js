// https://github.com/bgrins/devtools-snippets
// Add jQuery to any page

(function() {
	
var s=document.createElement('script');
s.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js');
document.getElementsByTagName('body')[0].appendChild(s);

})();