### plainforms.js

 HTML5 Forms are great, but sometimes you don't want the browser to validate or present special controls for them. For instance, if you want to test server-side validation of some fields, you do not want the browser to prevent invalid data for that field type. This snippet finds all of the HTML5 input elements, sets their type attributes to "text" (and keeps any values that were set), and removes any validations enforced by the browser.  Implementation by [stroebjo](https://github.com/stroebjo).

[![plainforms](plainforms.gif)](plainforms.js)