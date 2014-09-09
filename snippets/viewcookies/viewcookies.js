// viewcookies.js
// https://github.com/bgrins/devtools-snippets
// Shows all cookies stored in document.cookies in a console.table

(function() {
  window.viewCookies = function() {
    var rawCookies = document.cookie.split(';'), cookies = [];
    rawCookies.forEach(function(cookie) {
      var parsedCookie = cookie.split('='), cookieData = {};
      cookies.push({
        'key': parsedCookie.shift(),
        'value': decodeURIComponent(parsedCookie.join('='))
      });
    });
    console.table(cookies);
  };
})();

window.viewCookies();
