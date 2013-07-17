// wrapelement.js
// https://github.com/bgrins/devtools-snippets
// Wrap a given element in a given type of element
// wrapElement('.foo', 'h1');
// wrapElement(document.querySelector('#bar'), 'div');
//
// LICENSE: [MIT](http://gkatsev.mit-license.org)

(function() {
  window.wrapElement = function(el, whatToWrapIn) {
    var newParent = document.createElement(whatToWrapIn),
        oldParent,
        nextSibling;

    if (typeof el === 'string') {
      el = document.querySelector(el);
    }

    oldParent = el.parentNode;
    nextSibling = el.nextSibling;
    newParent.appendChild(el);
    if (nextSibling) {
      oldParent.insertBefore(newParent, nextSibling);
    } else {
      oldParent.appendChild(newParent);
    }
  }

})();
