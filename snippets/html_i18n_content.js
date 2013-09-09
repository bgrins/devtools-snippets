// html_i18n_content.js
// https://github.com/anaran/devtools-snippets
// Generate downloadable chrome.i18n messages file for location.href.
// See http://developer.chrome.com/extensions/i18n.html.
// Messages are based on innerText or value attribute, keyed by class attribute.
// Generate downloadable HTML file with i18n-content attributes added.
// Generate downloadable script to initialize localized messages on load.
try {
    console.log(location.href);
    var hsh = {};
    var i18nForValueAttribute = function(select, messages) {
        var nds = document.querySelectorAll(select);
        for (i = 0, len = nds.length; i < len; i++) {
            var value = nds[i].getAttribute('value');
            if (value) {
                var key = nds[i].className;
                if (key && value) {
                    nds[i].setAttribute('i18n-content', key);
                    nds[i].setAttribute('value', '');
                    messages[key] = {'message': value,'description': value};
                }
            }
        }
    };
    var i18nForInnerText = function(select, messages) {
        var nds = document.querySelectorAll(select);
        for (i = 0, len = nds.length; i < len; i++) {
            var value = nds[i].innerText;
            if (nds[i].childElementCount === 0 && value) {
                var key = nds[i].className;
                var value = value.replace(/\s+/g, ' ').trim();
                if (key && value) {
                    nds[i].setAttribute('i18n-content', key);
                    nds[i].innerText = '';
                    messages[key] = {'message': value,'description': value};
                }
            }
        }
    };
    i18nForInnerText('*', hsh);
    i18nForValueAttribute('input[value]', hsh);
    var messagesString = JSON.stringify(hsh, Object.getOwnPropertyNames(hsh).sort().concat('message', 'description'), 4);
    var htmlFileText = '<!DOCTYPE ' + document.doctype.name + '>\n' 
    + document.documentElement.outerHTML;
    var htmlFileName = location.pathname.split('/').pop();
    var makeDownloadLink = function(data, filename, style) {
        var blob = new window.Blob([data], {
            'type': 'text/utf-8'
        });
        var a = document.createElement('a');
        a.innerText = 'Download ' + filename;
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.setAttribute('style', style);
        a.onclick = function() {
            setTimeout(function() {
                document.body.removeChild(a);
            }, 500);
        };
    }
    var applyChromeI18nMessages = function () {
        // This generated function body is wrapped in (...)(); to execute on load.
        // This will only install the onreadystatechange event handler
        // to be run when the document load is complete.
        // Load this file into the associated HTML file by including
        // <script src="applyChromeI18nMessages.js"></script>
        // in its head element.
        try {
            document.addEventListener('readystatechange', function(event) {
                if (event.target.readyState !== "complete") {
                    return;
                }
                (function() {
                    var nds = document.querySelectorAll('[i18n-content]');
                    for (i = 0, len = nds.length; i < len; i++) {
                        var value = nds[i].getAttribute('value');
                        var key = nds[i].getAttribute('i18n-content');
                        if (value === null) {
                            nds[i].innerText = chrome.i18n.getMessage(key);
                        } else {
                            nds[i].setAttribute('value', chrome.i18n.getMessage(key));
                        }
                    }
                })();
            }, false);
        } catch (exception) {
            window.alert('exception.stack: ' + exception.stack);
            console.log((new Date()).toJSON(), "exception.stack:", exception.stack);
        }
    };
    makeDownloadLink(messagesString, 'messages.json', 'position:fixed;top:2em;left:50%;opacity:0.5');
    makeDownloadLink(htmlFileText, htmlFileName, 'position:fixed;top:4em;left:50%;opacity:0.5');
    makeDownloadLink('(' + applyChromeI18nMessages + ')();', 'applyChromeI18nMessages.js', 'position:fixed;top:6em;left:50%;opacity:0.5');
} catch (exception) {
    console.log(exception.stack);
}
