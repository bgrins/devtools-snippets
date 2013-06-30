// querystringvalues.js
// https://github.com/bgrins/devtools-snippets
// Print out key/value pairs from querystring.

(function() {

  var url = location;
  var querystring = location.search.slice(1);
  var tab = querystring.split("&").map(function(qs) {
    return { "Key": qs.split("=")[0], "Value": qs.split("=")[1], "Pretty Value": decodeURIComponent(qs.split("=")[1]).replace(/\+/g," ") }
  });

  console.group("Querystring Values");
  console.log("URL: "+url+"\nQS:  "+querystring);
  console.table(tab);
  console.groupEnd("Querystring Values");

})();
