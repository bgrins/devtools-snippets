// dataurl.js
// https://github.com/bgrins/devtools-snippets
// Print out data URLs for all images / canvases on the page

(function() {

  console.group("Data URLs");

  [].forEach.call(document.querySelectorAll("img"), function(i) {
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    c.width = i.width;
    c.height = i.height;

    try {
      ctx.drawImage(i, 0, 0);
      console.log(i, { url: c.toDataURL() });
    }
    catch(e) {
      console.log(i, { url: "No Permission"});
    }
  });

  [].forEach.call(document.querySelectorAll("canvas"), function(c) {
    try {
      console.log(c, { url: c.toDataURL() });
    }
    catch(e) {
      console.log(c, { url: "No Permission"});
    }
  });

  console.groupEnd("Data URLs");

})();