// showheaders.js
// https://github.com/bgrins/devtools-snippets
// Print out response headers for current URL.

(function() {

  var request=new XMLHttpRequest();
  request.open('HEAD',window.location,false);
  request.send(null);

  var headers = request.getAllResponseHeaders();
  var tab = headers.split("\n").map(function(h) {
    return { "Key": h.split(": ")[0], "Value": h.split(": ")[1] }
  }).filter(function(h) { return h.Value !== undefined; });

  console.group("Request Headers");
  console.log(headers);
  console.table(tab);
  console.groupEnd("Request Headers");

})();
