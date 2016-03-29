// snippet autosaveParent.js exported by devtools_import_export.js from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1738.0 Safari/537.36
// at Sun Dec 15 2013 16:57:42 GMT+0100 (Westeuropäische Normalzeit)
/*jslint browser: true*/
/*globals URL: false, console: false */
    'use strict';
// Normalize comments because Format JS cannot do that yet.
// From:^(\s*//\s)(\s+):To:$1:
(function() {
    var r, s, popup, popupFeatures = 'width=250,height=120',
        come, text, autosaveInterval = 5000,
        supportedProtocolRegExp = /^https?:$/;
    var getElementPath = function getElementPath(element, path) {
        if (!path) {
            path = "";
        }
        // console.trace();
        if (!element) {
            return path;
        } else {
            var elementSelector = element.localName + (element.id ? '#' + element.id : "") + (element.className.length ? '.' + element.className.replace(/ /g, '.') : "");
            return getElementPath(element.parentElement, elementSelector + " " + path);
        }
    };
    var getText = function(node) {
        if (node.nodeType === document.TEXT_NODE) {
            return node.data;
        }
        var txt = '';
        if (node.nodeType === document.ELEMENT_NODE) {
            if (node = node.firstChild) do {
                var cs;
                try {
                    cs = window.getComputedStyle(node);
                } catch (exception) {
                    console.log(exception.stack);
                }
                txt += getText(node);
                if (cs && cs.display.match(/block/)) {
                    // console.log(cs.display);
                    txt += '\n';
                }
            } while (node = node.nextSibling);
        }
        return txt;
    };
    if (supportedProtocolRegExp.test(location.protocol)) {
        while ((s = window.getSelection()) && window.confirm('Select parentElement of current selection?\n\nCancel to select current selection.\n')) {
            if (s.rangeCount) {
                r = document.createRange();
                r.selectNodeContents(s.getRangeAt(0).commonAncestorContainer.parentElement);
                s.removeAllRanges();
                s.addRange(r);
            }
        }
        if (!window.confirm('Enable autosaving selected element every ' + Number(autosaveInterval / 1000).toFixed(1) + ' seconds?\n\nSee [Previous autosave] [autosave] [x]\nat bottom right of page to download or quit autosaves.\n')) {
            return;
        }
        come = s.getRangeAt(0).commonAncestorContainer;
    } else if (location.protocol === "chrome-devtools:") {
        come = document.getElementById('console-messages');
    } else {
        window.alert('Can only autosave nodes in\nGoogle Chrome console\nor pages matching\n' + supportedProtocolRegExp + '\nGiving up on ' + location.href);
    }
    if (come) {
        var autosaveIndicator = document.createElement('span');
        autosaveIndicator.style.position = 'fixed';
        autosaveIndicator.style.bottom = '1em';
        autosaveIndicator.style.right = '1em';
        autosaveIndicator.style.backgroundColor = 'white';
        autosaveIndicator.style.border = '1px dashed';
        autosaveIndicator.style.transition = 'opacity 1s 0s';

        var downloadLink = document.createElement('a');
        downloadLink.innerHTML = '&DoubleDownArrow; autosave';
        autosaveIndicator.appendChild(downloadLink);

        var close = autosaveIndicator.appendChild(document.createElement('span'));
        close.textContent = "[x]";
        close.addEventListener('click', function(event) {
            window.clearInterval(timerID);
            if (location.protocol === "chrome-devtools:") {
                popup.close();
            } else {
                document.body.removeChild(autosaveIndicator);
            }
        }, false);
        if (location.protocol === "chrome-devtools:") {
            popup = window.open('', '', popupFeatures);
            popup.document.body.appendChild(autosaveIndicator);
        } else {
            document.body.appendChild(autosaveIndicator);
        }
        if (localStorage.autosaveElementText && localStorage.autosaveElementTime) {
            var downloadOldLink = document.createElement('a');
            downloadOldLink.innerHTML = '&DoubleDownArrow; Previous autosave';
            autosaveIndicator.insertBefore(downloadOldLink, downloadLink);
            var time = localStorage.autosaveElementTime;
            var autosaveElementFileText =
                'autosaveElement\n' + localStorage.autosaveElementPath + '\nfrom ' + (new Date(Number(localStorage.autosaveElementTime))) + '\n\n' + localStorage.autosaveElementText;
            // 'chrome devtools autosave from ' + time + '\n\n' + text;
            var autosaveElementBlob = new Blob([autosaveElementFileText], {
                'type': 'text/plain;charset=utf-8'
            });
            // var div = document.createElement('div');
            // div.style.position = 'fixed';
            // div.style.top = '5em';
            // div.style.left = '5em';
            // div.style.backgroundColor = 'white';
            // div.style.border = '1px dashed';
            // document.body.appendChild(div);
            // var a = document.createElement('a');
            downloadOldLink.href = window.URL.createObjectURL(autosaveElementBlob);
            // a.textContent = 'Download autosaveElement';
            // a.download = 'autosaveElement' + time.getTime() + '.txt';
            downloadOldLink.download = 'autosaveElement' + localStorage.autosaveElementTime + '.txt';
            // div.appendChild(a);
            downloadOldLink.addEventListener('click', function(event) {
                // event.preventDefault();
                autosaveIndicator.removeChild(downloadOldLink);
            }, false);
            // var pre = div.appendChild(document.createElement('pre'));
            // pre.textContent = autosaveElementFileText;
        }
        localStorage.autosaveElementText = '';
        localStorage.autosaveElementPath = getElementPath(come, location.href);
        localStorage.autosaveElementTime = Date.now();
        var timerID = window.setInterval(function() {
            text = getText(come);
            if (text.length - localStorage.autosaveElementText.length > 20) {
                autosaveIndicator.style.opacity = 1;
                localStorage.autosaveElementTime = Date.now();
                localStorage.autosaveElementText = text;
                var autosaveElementFileText =
                    'autosaveElement\n' + localStorage.autosaveElementPath + '\nfrom ' + (new Date(Number(localStorage.autosaveElementTime))) + '\n\n' + localStorage.autosaveElementText;
                var autosaveElementBlob = new Blob([autosaveElementFileText], {
                    'type': 'text/plain;charset=utf-8'
                });
                downloadLink.title = localStorage.autosaveElementText.length + ' characters saved at ' + new Date(Number(localStorage.autosaveElementTime)).toString();
                downloadLink.href = window.URL.createObjectURL(autosaveElementBlob);
                downloadLink.download = 'autosaveElement' + localStorage.autosaveElementTime + '.txt';
                window.setTimeout(function() {
                    autosaveIndicator.style.opacity = 0.3;
                }, 2000);
            }
        }, autosaveInterval);
    } else {
        console.error(come);
    }
})();