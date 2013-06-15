devtools-snippets
=================

A collection of snippets for use inside of developer tools.  View them all on a single page: http://bgrins.github.io/devtools-snippets/ or all of them inside of github: https://github.com/bgrins/devtools-snippets/tree/master/snippets.

## To Enable DevTools Snippets in Chrome

* Open Chrome
* Navigate to `chrome://flags` -> `Enable Developer Tools experiments`
* Open Devtools -> `Settings` -> `Developer Tools Experiments` -> `Enable "Snippets support"`
* Close and reopen devtools
* Open "Sources" panel
* Go to "Snippets" tab, and add whichever ones you want

![Chrome Flags](screenshots/chrome-flags.png)

![Chrome Enable Snippets](screenshots/chrome-enable-snippets.png)

![Chrome Snippets](screenshots/chrome-snippets.png)

## To Use DevTools Snippets in Firefox Scratchpad

* Open Firefox
* Go to `Tools` > `Web Developer` > `Scratchpad`.
* Copy/paste and Cmd-R / Ctrl-R to run.

![Firefox Scratchpad](screenshots/firefox-scratchpad.png)


## Snippet screenshots

Or, view all on a single page with code: http://bgrins.github.io/devtools-snippets/

### jquerify.js
Includes jQuery onto a page if it is not yet included.
[![jquerify](screenshots/jquerify.png)](snippets/jquerify.js)

### log.js
Adds a `log` function to window object.
[![log](screenshots/log.png)](snippets/log.js)

### showheaders.js
Pretty prints the HTTP headers for the current page into the console.  *Uses console.table*
[![showheaders](screenshots/showheaders.png)](snippets/showheaders.js)

### dataurl.js
Convert all images on the page to data URLs.  *Note: this only works for images that are on the same domain as the current page*
[![dataurl](screenshots/dataurl.png)](snippets/dataurl.js)

### allcolors.js
Print out all colors from computed styles used in elements on the page.  *Uses styled console.log calls to visualize each color*.
[![allcolors](screenshots/allcolors.png)](snippets/allcolors.js)

### performance.js
Print out information about the [window.performance object](https://developer.mozilla.org/en-US/docs/Navigation_timing).  *Uses console.table and grouping to organize the information*.
[![performance](screenshots/performance.png)](snippets/performance.js)
