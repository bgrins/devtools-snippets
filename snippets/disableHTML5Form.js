// disableHTML5Form.js
// https://github.com/bgrins/devtools-snippets
// Remove HTML5 form validation features.
(function () {

  ['maxlength', 'required', 'min', 'max', 'pattern', 'step' ].forEach(function (attr) {
    [].forEach.call(document.querySelectorAll("[" + attr + "]"), function (node) {
      node.removeAttribute(attr);
    });
  });

  ['tel', 'url', 'email', 'datetime', 'date', 'month', 'week', 'time', 'datetime-local', 'number', 'range', 'color'].forEach(function (type) {
    [].forEach.call(document.querySelectorAll("input[type=" + type + "]"), function (node) {
      node.setAttribute('type', 'text');
    });
  });

  console.info("All HTML5 form validations have been removed.");
})();
