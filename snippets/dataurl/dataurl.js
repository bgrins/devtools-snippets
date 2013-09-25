// dataurl.js
// https://github.com/bgrins/devtools-snippets
// Print out data URLs for all images / canvases on the page.

(function() {

  console.group("Data URLs");

  [].forEach.call(document.querySelectorAll("img"), function(i) {
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    c.width = i.width;
    c.height = i.height;

    try {
      ctx.drawImage(i, 0, 0);
      console.log(i, c.toDataURL());
    }
    catch(e) {
      console.log(i, "No Permission - try opening this image in a new tab and running the snippet again?", i.src);
    }
  });

  [].forEach.call(document.querySelectorAll("canvas"), function(c) {
    try {
      console.log(c, c.toDataURL());
    }
    catch(e) {
      console.log(c, "No Permission");
    }
  });

  console.groupEnd("Data URLs");

})();
