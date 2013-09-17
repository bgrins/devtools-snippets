// previewImages.js
// https://github.com/bgrins/devtools-snippets
// Get a preview of all images(background) in a page.

(function(console) {
	"use strict"

	var urls = [];

	function stash(value) {
		for(var i = 0, j = urls.length; i < j; i++) {
			if(urls[i] == value) {
				return true;
			}
		}

		return false;
	}

	function getBox(width, height) {
		return {
			string: "+",
			style: "font-size: 1px; padding: " + Math.floor(height/2) + "px " + Math.floor(width/2) + "px; line-height: " + height + "px;"
		}
	}

	function getallBgimages(){
 		var url, $el = document.getElementsByTagName('*');
 		$el = Array.prototype.slice.call($el, 0, $el.length);

		while($el.length){
  			url = getStyle($el.shift(),'background-image');
  			if(url) {
  		 		url = /url\(['"]?([^")]+)/.exec(url) || [];
  			}
  		 
  			url = url[1];

  			if(url && urls.indexOf(url) == -1) {
  		  		if(!stash(url)) {
    				urls.push(url);	
    			}
  			}	  
 		}
	}

	function getAllimages() {
		var $el = document.getElementsByTagName('img');
    	$el = Array.prototype.slice.call($el, 0, $el.length);

    	for(var i = 0, j = $el.length; i < j; i++) {
    		if(!stash($el[i].src)) {
    			urls.push($el[i].src);	
    		}
    	}

    	getallBgimages();
	}

	function init() {
		getAllimages();

		for(var i = 0, j = urls.length; i < j; i++) {
			consoleImage(urls[i]);
		}
	}

	function getStyle($el, css){
 		if(!$el || !$el.style) return '';

 		var style = css.replace(/\-([a-z])/g, function(a, b){
  			return b.toUpperCase();
 		});

 		if($el.currentStyle){
 	 		return $el.style[style] || $el.currentStyle[style] || '';
 		}

 		var view = document.defaultView || window;
 		return $el.style[style] || view.getComputedStyle($el,"").getPropertyValue(css) || '';
	}

	function consoleImage(url, scale) {
		scale = scale || 1;
		var img = new Image();

		img.onload = function() {
			var dim = getBox(200, 100);
			console.log("%c" + dim.string, dim.style + "background: url(" + url + "); background-size:  200px 200px; color: transparent;");
			console.log(url);
		};

		img.src = url;
	};

	init();

})(console);