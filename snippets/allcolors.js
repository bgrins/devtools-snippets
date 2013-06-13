// allcolors.js
// https://github.com/bgrins/devtools-snippets
// Print out all colors used in elements on the page

(function() {

  var allColors = { };
  var props = ["backgroud-color", "color"];

  [].forEach.call(document.querySelectorAll("*"), function(node) {

    props.forEach(function(prop) {
      var color = window.getComputedStyle(node, null).getPropertyValue(prop);
      if (color && color != "rgb(0, 0, 0)" && color != "rgb(255, 255, 255)") {
        allColors[color] = allColors[color] ? allColors[color] + 1 : 1;
      }
    });

  });

  var allColorsSorted = [];
  for (var i in allColors) {
    allColorsSorted.push({ key: i, value: allColors[i] });
  }
  allColorsSorted = allColorsSorted.sort(function(a, b) { return b.value-a.value; });

  console.log("All colors used in elements on the page: ");
  allColorsSorted.forEach(function(c) {
    console.log("%c____%c " + c.key + " %c(" + c.value + " times)", "background:" + c.key + ";color:" + c.key + ";border:1px solid #333;", "", "font-weight:bold;");
  });

})();
