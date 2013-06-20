// allcolors.js
// https://github.com/bgrins/devtools-snippets
// Print out all colors used in elements on the page

(function () {
  var allColors = {};
  var props = ["background-color", "color", "border-color"];

  [].forEach.call(document.querySelectorAll("*"), function (node) {
    props.forEach(function (prop) {
      var color = window.getComputedStyle(node, null).getPropertyValue(prop);

      if (color) {
        var colors = [];
        if (prop === "border-color") {
          var match = color.match(/(rgba?\(\s*(\d{1,3}\%?)\s*,\s*(\d{1,3}\%?)\s*,\s*(\d{1,3}\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\))/g);

          match && match.forEach(function(c) {
            if (colors.indexOf(c) === -1) {
              colors.push(c);
            }
          });
        }

        if (colors.length === 0) {
          colors.push(color);
        }

        colors.forEach(function(c) {
          if (c !== "rgb(0, 0, 0)" && c !== "rgb(255, 255, 255)" && c !== "rgba(0, 0, 0, 0)" && c !== "rgba(255, 255, 255, 0)" && c !== "rgba(0, 0, 0, 1)" && c !== "rgba(255, 255, 255, 1)") {
            if (!allColors[c]) {
              allColors[c] = {
                count: 0,
                nodes: []
              };
            }
            allColors[c].count++;
            allColors[c].nodes.push(node);
          }
        });
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
    console.groupCollapsed("%c    %c " + c.key + " %c(" + c.value.count + " times)",
      colorStyle(c.key), nameStyle, countStyle);
    c.value.nodes.forEach(function (node) {
      console.log(node);
    });
    console.groupEnd();
  });
  console.groupEnd("All colors used in elements on the page");
})();
