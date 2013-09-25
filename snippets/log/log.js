// log.js
// https://github.com/bgrins/devtools-snippets
// Adds a `log` function to window object.
// http://www.briangrinstead.com/blog/console-log-helper-function

(function() {

  window.log = Function.prototype.bind.call(console.log, console);

})();
