// cssreload.js
// https://github.com/bgrins/devtools-snippets
// Removes then reloads all the CSS files in the current page

(function () {
        
    var insertAfter = function(newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    };
    function reloadStyleSheet(stylesheet) {
         var element = stylesheet.ownerNode;
         var clone = element.cloneNode(false);
         insertAfter(clone, element);
         setTimeout(function() {
            if (element.parentNode)
                element.parentNode.removeChild(element);
        }, 500);
    }
    [].forEach.call(document.styleSheets, function(styleSheet) {
        if (!styleSheet.href) return;
        console.log('reload ' + styleSheet.href);
        reloadStyleSheet(styleSheet);
    });
   
})();
