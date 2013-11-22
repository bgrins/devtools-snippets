// insert-css.js
// https://github.com/bgrins/devtools-snippets
// Injects a snippet of CSS into the current page.

function insertCss(code) {
  var style = document.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {  // IE
    style.styleSheet.cssText = code;
  } else { // Other browsers
    style.innerHTML = code;
  }
  document.getElementsByTagName("head")[0].appendChild( style );
}

// Feel free to extend this snippet with your favorite CSS snippets.
// Here's an example which makes the current page high contrast.
// Notice the trailing backslashes, used to define multiline strings.
function insertCssHighContrast() {
  var css = '\
    * { background: white ! important; color: black !important } \
    :link, :link * { color: #0000EE !important } \
    :visited, :visited * { color: #551A8B !important } \
  ';
    insertCss(css);
}
