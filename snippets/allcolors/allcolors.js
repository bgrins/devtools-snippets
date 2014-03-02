// allcolors.js
// https://github.com/bgrins/devtools-snippets
// Print out CSS colors used in elements on the page.

//Parameter used to include or exclude colors from elements that have a border color but have a zero width.
var includeBorderColorsWithZeroWidth = false;

(function (includeBorderColorsWithZeroWidth) {
    var allColors = {};
    var props = ["background-color", "color", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color"];
    var skipColors = {
        "rgb(0, 0, 0)": 1,
        "rgba(0, 0, 0, 0)": 1,
        "rgb(255, 255, 255)": 1
    };

    [].forEach.call(document.querySelectorAll("*"), function (node) {
        var nodeColors = {};
        props.forEach(function (prop) {
            var
            color = window.getComputedStyle(node, null).getPropertyValue(prop),
                thisIsABorderProperty = (prop.indexOf("border") != -1),
                notBorderZero = thisIsABorderProperty ? window.getComputedStyle(node, null).getPropertyValue(prop.replace("color", "width")) !== "0px" : true,
                colorConditionsMet;

            if (includeBorderColorsWithZeroWidth) {
                colorConditionsMet = color && !skipColors[color];
            } else {
                colorConditionsMet = color && !skipColors[color] && notBorderZero;
            }

            if (colorConditionsMet) {
                if (!allColors[color]) {
                    allColors[color] = {
                        count: 0,
                        nodes: []
                    };
                } // if (!allColors[color])

                if (!nodeColors[color]) {
                    allColors[color].count++;
                    allColors[color].nodes.push(node);
                } // if (!nodeColors[color])

                nodeColors[color] = true;
                
            } // if if (colorConditionsMet)

        }); // props.forEach(function (prop)

    }); // [].forEach.call(document.querySelectorAll("*"), function (node)



    var rgbTextToRgbArray = (function (rgbText) {
        return function (rgbText) {
            var rgbString;

            if (rgbText.indexOf("rgba") == -1) {
                rgbString = rgbText.replace("rgb(", "").replace(")", "");
            } else {
                rgbString = rgbText.replace("rgba(", "").replace(")", "");
            }

            var arrayOfRgbValues = rgbString.split(",").map(function (item) {
                return parseInt(item, 10);
            });

            return arrayOfRgbValues;

        } // return function(rgbText)

    })(); // var rgbTextToRgbArray = (function (rgbText)


    var componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    var rgbToHex = function (rgbArray) {
        var r = rgbArray[0],
            g = rgbArray[1],
            b = rgbArray[2];
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }



    var allColorsSorted = [];
    for (var i in allColors) {
        var rgbArray = rgbTextToRgbArray(i),
            hexValue = rgbToHex(rgbArray);


        allColorsSorted.push({
            key: i,
            value: allColors[i],
            hexValue: hexValue
        });

    } // for (var i in allColors)

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
        console.groupCollapsed("%c    %c " + c.key + " " + c.hexValue + " %c(" + c.value.count + " times)",
            colorStyle(c.key), nameStyle, countStyle);
        c.value.nodes.forEach(function (node) {
            console.log(node);
        });
        console.groupEnd();
    });
    console.groupEnd("All colors used in elements on the page");
})(includeBorderColorsWithZeroWidth);