(function(){

  var rawCookies = document.cookie.split(';'),
      cookies = [];
  
  rawCookies.forEach(function(cookie) {
    var parsedCookie = cookie.split('='),
        cookieData = {};
    cookies.push({ 'key': parsedCookie.shift(), 'value': decodeURIComponent(parsedCookie.join('=')) });
  });

  console.table(cookies);

})()
