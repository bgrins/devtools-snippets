### html_i18n_content.js

Generate downloadable files, based on location.href,
for [i18n](http://developer.chrome.com/extensions/i18n.html) of Chrome App or Extension:

* messages.json containing chrome.i18n messages (with placeholders) for element.innerText and input[value]
* location.href with i18n-content tags added (text and placeholders preserved to ease round-tripping changes)
* applyChromeI18nMessages.js to include in location.href to initialize localized messages on load

Implementation by [anaran](https://github.com/anaran).

[![html_i18n_content](html_i18n_content.gif)](html_i18n_content.js)
