// allcolors.js
// https://github.com/bgrins/devtools-snippets
// Print out all colors used in elements on the page

(function () {
  var allColors = {};
  var props = ["backgroud-color", "color"];

  [].forEach.call(document.querySelectorAll("*"), function (node) {
    props.forEach(function (prop) {
      var color = window.getComputedStyle(node, null).getPropertyValue(prop);
      if (color && color != "rgb(0, 0, 0)" && color != "rgb(255, 255, 255)") {
        if (!allColors[color]) {
          allColors[color] = {
            count: 0,
            nodes: []
          };
        }
        allColors[color].count++;
        allColors[color].nodes.push(node);
      }
    });
  });

  var allColorsSorted = [];
  for (var i in allColors) {
    allColorsSorted.push({
      key: i,
      value: allColors[i]
    });
  }
  allColorsSorted = allColorsSorted.sort(function (a, b) {
    return b.value.count - a.value.count;
  });

  var nameStyle = "font-weight:normal;";
  var countStyle = "font-weight:bold;";
  var colorStyle = function (color) {
    return "background:" + color + ";color:" + color + ";border:1px solid #333;";
  };

  console.group("All colors used in elements on the page");
  allColorsSorted.forEach(function (c) {
    console.groupCollapsed("%c____%c " + c.key + " %c(" + c.value.count + " times)",
      colorStyle(c.key), nameStyle, countStyle);
    c.value.nodes.forEach(function (node) {
      console.log(node);
    });
    console.groupEnd();
  });
  console.groupEnd("All colors used in elements on the page");
})();
