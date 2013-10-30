// snippet devtools_import_export.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1685.0 Safari/537.36
// at 2013-10-29T19:42:34.721Z
// snippet devtools_import_export.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36
// at 2013-10-29T19:25:35.298Z
// snippet devtools_import_export.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-29T00:31:54.370Z
(function() {
    try {
        function downloadConsoleHistory() {
    try {
        function alertAndWarn(message) {
            window.alert(message + "\nSee JavaScript console the complete log of warnings");
            console.warn(message);
        }
        function selectCommand(event, prevent, stop) {
            if (prevent) {
                event.preventDefault();
            }
            if (stop) {
                event.stopPropagation();
            }
            var selection = window.getSelection();
            selection.removeAllRanges();
            var range = document.createRange();
            range.selectNodeContents(event.target);
            // Collapse range to end, i.e. toStart argument is false.
            // range.collapse(false);
            // Always add the range to restore focus.
            selection.addRange(range);
        }
        function setupEventListeners(element) {
            element.addEventListener('mouseenter', selectCommand, true);
            element.addEventListener('dragstart', function(event) {
                event.dataTransfer.effectAllowed = "copy";
            }, false);
            element.addEventListener('drop', function(event) {
                event.dataTransfer.effectAllowed = "none";
            }, false);
            element.addEventListener('keydown', function(event) {
                selectCommand(event, false, true)
            }, true);
            element.addEventListener('keypress', function(event) {
                selectCommand(event, true, true)
            }, true);
            element.addEventListener('keyup', function(event) {
                selectCommand(event, false, true)
            }, true);
        }
        function installGeneratedHtmlEventListeners() {
            document.addEventListener('readystatechange', function(event) {
                if (event.target.readyState !== 'complete') {
                    return;
                }
                (function() {
                    var nds = document.querySelectorAll('div>pre');
                    for (var i = 0, len = nds.length; i < len; i++) {
                        setupEventListeners(nds[i]);
                    }
                    // TODO Please note the Download button would be confusing in the generated document.
                    document.body.removeChild(document.querySelector('.download').parentElement);
                })();
            }, false);
        }
            var w = window.open("", "");
//         var w = window.open("", "dtie_ch", "width=" + window.screen.availWidth / 2 + ",height=" + window.screen.availHeight / 2);
//         var w = window;
        var meta = document.createElement('meta');
        meta.content = "text/html; charset=UTF-8";
        meta.httpEquiv = "content-type";
        w.document.head.appendChild(meta);
        var script = document.createElement('script');
        // TODO Why the \/ (see https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement)?
        script.type = "text\/javascript";
        script.textContent = '"use strict"' + ';\n' + selectCommand + ';\n' + setupEventListeners + ';\n' + installGeneratedHtmlEventListeners + ';\n' + 'installGeneratedHtmlEventListeners();\n';
        w.document.head.appendChild(script);
        var style = document.createElement('style');
        style.type="text/css";
        style.textContent = 'pre:before { content: attr(line-number); float: left; text-align: right; width: 2em; padding-right: 1em; }\n';
        w.document.head.appendChild(style);
        var now = new Date();
        var ch = JSON.parse(localStorage.consoleHistory);
        w.document.title = "consoleHistory (" + ch.length + ' commands)';
        var consoleHistoryDownloadButton = document.createElement('input');
        consoleHistoryDownloadButton.type = 'button';
        consoleHistoryDownloadButton.className = 'download';
        consoleHistoryDownloadButton.value = 'Download consoleHistory';
        w.document.body.appendChild(document.createElement('div').appendChild(document.createTextNode(w.document.title + ' as of ' + now + ' in ' + navigator.userAgent)).parentElement);
        w.document.body.appendChild(document.createElement('div').appendChild(consoleHistoryDownloadButton).parentElement);
        ch.forEach(function(command, index) {
            var pre = document.createElement('pre');
//            pre.setAttribute('style', 'display: inline; border: 1px solid silver; margin: 1em;');
           pre.setAttribute('style', 'margin: 0em;');
            var div = document.createElement('div');
            div.setAttribute('style', 'margin: 0.25em;');
            pre.setAttribute('line-number', index + 1);
            pre.contentEditable = true;
            setupEventListeners(pre);
            pre.innerText = command;
            w.document.body.appendChild(div.appendChild(pre).parentElement);
//             w.document.body.appendChild(pre);
            console.log(command);
        });
        consoleHistoryDownloadButton.addEventListener('click', function(event) {
            var consoleHistoryDocumentBlob = new window.Blob([
                w.document.documentElement.innerHTML], {
                'type': 'text/utf-8'
            });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(consoleHistoryDocumentBlob);
            a.download = "consoleHistory_" + (now).toJSON().replace(/:/g, '') + '.html';
            a.click();
        }, false);
    } catch (exception) {
        alertAndWarn(exception.stack.replace(/:(\d+):(\d+)/g, "$& (Line $1, Column $2)"));
    }
}
        var title = 'DevTools Import/Export';
        var cancel = 'Cancel';
        var alertAndWarn = function(message) {
            window.alert(message + "\nSee JavaScript console the complete log of warnings");
            console.warn(message);
        }
        var alertAndError = function(message) {
            window.alert(message + "\nSee JavaScript console the complete log of errors");
            console.error(message);
        }
        var div = document.createElement('div');
        div.innerText = location.origin + " has " + localStorage.length + " items in localStorage.";
        var localStorageDownloadButton = document.createElement('input');
        localStorageDownloadButton.type = 'button';
        localStorageDownloadButton.value = 'Export localStorage';
        localStorageDownloadButton.addEventListener('click', function(event) {
            var localStorageBlob = new window.Blob([JSON.stringify(localStorage, null, 4)], {
                'type': 'text/utf-8'
            });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(localStorageBlob);
            a.download = "localStorage_" + (new Date()).toJSON().replace(/:/g, '') + '.txt';
            a.click();
        }, false);
        div.appendChild(document.createElement('div').appendChild(localStorageDownloadButton).parentElement);
        var aYes = document.createElement('a');
        var aNo = document.createElement('a');
        aYes.innerText = 'Open ' + title;
        aNo.innerText = cancel;
        aYes.href = '';
        aNo.href = '';
        aYes.target = 'dtie_dt';
        aNo.target = '';
        var confirmerDiv = document.createElement('div');
        confirmerDiv.appendChild(document.createElement('div').appendChild(aYes).parentElement);
        confirmerDiv.appendChild(document.createElement('div').appendChild(aNo).parentElement);
        confirmerDiv.setAttribute('style', 'position:fixed; top: 25%; left: 25%; width: 50%; height: 50%; padding: 1em; border: 0.2em solid silver; background: white; font-size: large; z-index: 100;');
        if (location.origin === "chrome-devtools://devtools") {
            var wa = window.open("", "", "width=300,height=50,left=" + window.screen.availWidth / 2 + ",top=" + window.screen.availHeight / 2);
            wa.document.title = title;
//             window.alert("Please confirm " + title + " to access data for " + location.origin);
            var confirmerDivPopup = wa.document.createElement('div');
            confirmerDivPopup.appendChild(document.createElement('div').appendChild(aYes).parentElement);
            confirmerDivPopup.appendChild(document.createElement('div').appendChild(aNo).parentElement);
            wa.document.body.appendChild(confirmerDivPopup);
        } else {
//             if (document.hasFocus()) {
                document.body.appendChild(confirmerDiv);
//                 div.appendChild(document.createTextNode('To import/export devtools source snippets:\nUndock Developer tools into separate window\nand press Ctrl+Shift+I to inspect it.\nThen run this snippet from there.'));
                window.alert('To import/export devtools source snippets:\nUndock Developer tools into separate window\nand press Ctrl+Shift+I to inspect it.\nThen run this snippet from there.');
//             } else {
//                 alertAndWarn("Select tab for " + location.href);
//             }
        }
        var removeConfirmer = function(confirmerDiv) {
            document.body.removeChild(confirmerDiv);
        }
        aYes.addEventListener('click', function(event) {
            event.preventDefault();
            devtoolsImportExport();
            if (event.view.location.href !== "about:blank") {
                document.body.removeChild(event.target.parentElement.parentElement);
            } else {
                event.view.close();
            }
        }, false);
        aNo.addEventListener('click', function(event) {
            event.preventDefault();
            if (event.view.location.href !== "about:blank") {
                document.body.removeChild(event.target.parentElement.parentElement);
            } else {
                event.view.close();
            }
        }, false);
        var devtoolsImportExport = function() {
            var w = window.open("", "");
//             try {
//                 window.open("chrome://settings/search#download");
//             } catch (exception) {
//                 alertAndWarn(exception.stack);
//             }
//             var w = window.open("", "dtie_dt");
            //             var w = window.open("", "_blank", "width=400,height=500,top=100,left=100");
            w.document.title = title;
            w.document.body.appendChild(document.createElement('div').appendChild(div).parentElement);
            div.appendChild(document.createElement('hr'));
            //            settings.location.href = "chrome://extensions";
            if (location.origin === "chrome-devtools://devtools") {
                if (localStorage.consoleHistory) {
                    var aHistory = document.createElement('a');
                    aHistory.href = '';
                    aHistory.target = 'dtie_ch';
                    aHistory.innerText = 'devtools console history';
                    var aHistoryDiv = document.createElement('div');
                    div.appendChild(aHistoryDiv);
                    aHistoryDiv.appendChild(aHistory);
                aHistoryDiv.addEventListener('click', function(event) {
            event.preventDefault();
                    downloadConsoleHistory();
                }, false);
                div.appendChild(document.createElement('hr'));
                }
                var importSnippets = document.createElement('input');
                importSnippets.type = 'file';
                importSnippets.multiple = true;
                importSnippets.setAttribute('style', 'border: 0.2em dashed silver');
                var exportButton = document.createElement('input');
                exportButton.type = 'button';
                var snippets = JSON.parse(localStorage.scriptSnippets);
                exportButton.value = 'Export All ' + snippets.length + ' Snippets';

                //             div.appendChild(document.createElement('div').appendChild(document.createTextNode('Set Google Chrome to ask for download location to avaid malware warning')).parentElement);
                div.appendChild(document.createElement('div').appendChild(document.createTextNode('Import Snippets')).parentElement);
                div.appendChild(importSnippets);
                div.appendChild(document.createElement('hr'));
                div.appendChild(document.createElement('div').appendChild(exportButton).parentElement);
                var aa = document.createElement('div');
                aa.innerHTML = 'Set Google Chrome to ask for download location (visit <a href="chrome://settings/search#download">chrome://settings/search#download</a>) to avoid malware warning';
                div.appendChild(aa);
                div.appendChild(document.createElement('div').appendChild(document.createTextNode('Export Snippets Individually')).parentElement);
                snippets.forEach(function(snippet) {
                    var blob = new window.Blob(['// snippet ' + snippet.name + ' exported by snippeteer from\n// ' + navigator.userAgent + '\n// at ' + (new Date()).toJSON() + '\n' + snippet.content], {
                        'type': 'text/utf-8'
                    });
                    var a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    //                 a.download = snippet.name.replace(/\.js$/, '.snippet');
                    a.download = snippet.name;
                    //                 a.title = 'Saving as ' + a.download + ' to avoid Google Chrome malware warning'
                    a.innerText = snippet.name;
                    var aDiv = document.createElement('div');
                    div.appendChild(aDiv);
                    aDiv.appendChild(a);
                });
                exportButton.addEventListener('click', function(event) {
                    var aNodeList = w.document.querySelectorAll('a[download]');
                    for (var i = 0, len = aNodeList.length; i < len; i++) {
                        aNodeList[i].click();
                    }
                }, false);
                var checkFileCount = function(files) {
                    if (files.length === 0) {
                        alertAndWarn('Please pick some .js files for import as google chrome devtools snippets.');
                        return false;
                    } else {
                        return true;
                    }
                };
                var readFileUpdateUI = function(file) {
                    var reader = new FileReader();
                    var filesLoaded = 0;
                    reader.onerror = errorHandler;
                    reader.onload = function(readEvent) {
                        filesLoaded++;
                        var w = window.open("", "", "width=" + window.screen.availWidth / 2 + ",height=" + window.screen.availHeight / 2 + ",top=100,left=100");
                        w.document.title = 'Snippet ' + file.name;
                        console.timeEnd('read of ' + file.name);
                        var result = readEvent.target.result;
                        var pre = document.createElement('pre');
                        pre.innerText = result;
                        w.document.body.appendChild(pre);
                        p = WebInspector.scriptSnippetModel.project();
                        if (p.createFile.length === 4) {
                            p.createFile(file.name, file.name, result, function(filePath) {
                                p.rename(p._uiSourceCodesMap[filePath].uiSourceCode, file.name.replace(/\.snippet$/, '.js'), function(success) {
                                    if (!success) {
                                        alertAndWarn('failed to rename ' + filePath + ' to ' + file.name);
                                    }
                                });
                            });
                            p.refresh();
                        } else if (p.createFile.length === 3) {
                            p.createFile(file.name, file.name, function(filePath) {
                                p.setFileContent(p._uiSourceCodesMap[filePath].uiSourceCode, result, function(what) {
                                    console.log('setFileContent callback argument what:', what);
                                });
                                p.rename(p._uiSourceCodesMap[filePath].uiSourceCode, file.name.replace(/\.snippet$/, '.js'), function(success) {
                                    if (!success) {
                                        alertAndWarn('failed to rename ' + filePath + ' to ' + file.name);
                                    }
                                });
                            });
                            p.refresh();
                        } else {
                            alertAndError("Cannot handle p.createFile with " + p.createFile.length + " arguments");
                        }
                    };
                    console.time('read of ' + file.name);
                    reader.readAsText(file);
                };
                importSnippets.addEventListener('change', function(event) {
                    console.log(event.target.files);
                    if (checkFileCount(event.target.files)) {
                        // TODO files are added to head of the list, so we have to process in reverse order.
                        console.log("Importing snippet files, please wait...");
                        for (var i = 0, len = event.target.files.length; i < len; i++) {
                            readFileUpdateUI(event.target.files[i]);
                        }
                    }
                }, false);

                function errorHandler(domError) {
                    alertAndWarn(domError);
                }
                var handleDrop = function(file) { //$NON-NLS-0$
                    readFileUpdateUI(file);
                };
                w.document.body.addEventListener("dragover", function(event) { //$NON-NLS-0$
                    event.preventDefault();
                    if ((event.srcElement === importSnippets)) {
                        event.dataTransfer.effectAllowed = "copy"; //$NON-NLS-0$
                        event.dataTransfer.dropEffect = "copy"; //$NON-NLS-0$
                        w.document.body.classList.add('valid');
                        console.log(event.dataTransfer.effectAllowed, event.dataTransfer.dropEffect);
                    } else {
                        event.dataTransfer.effectAllowed = "none"; //$NON-NLS-0$
                        event.dataTransfer.dropEffect = "none"; //$NON-NLS-0$
                        w.document.body.classList.remove('valid');
                        console.log(event.dataTransfer.effectAllowed, event.dataTransfer.dropEffect);
                    }
                    return false;
                }, false && "useCapture"); //$NON-NLS-0$ //$NON-NLS-1$
                w.document.body.addEventListener("dragstart", function(event) {
                    // TODO needed for drop to work!
                    event.preventDefault(); // stops the browser from redirecting.
                }, false);
                div.addEventListener("drop", function(event) {
                    // TODO needed for drop to work!
                    event.preventDefault(); // stops the browser from redirecting.
                    if (checkFileCount(event.dataTransfer.files)) {
                        // TODO files are added to head of the list, so we have to process in reverse order.
                        filesLoaded = 0;
                        console.log("Loading files, please wait...");
                        for (var i = 0, len = event.dataTransfer.files.length; i < len; i++) {
                            handleDrop(event.dataTransfer.files[i]);
                        }
                        w.document.body.classList.remove('valid');
                    }
                }, false && "useCapture"); //$NON-NLS-0$ //$NON-NLS-1$
            }
//             else {
//                 div.appendChild(document.createTextNode('Undock Developer tools into separate window and press Ctrl+Shift+I to inspect it. Then run snipetter from there to import/export snippets.'));
//             }
        }
        //         aYes.click();
    } catch (exception) {
        alertAndWarn(exception.stack.replace(/:(\d+):(\d+)/g, "$& (Line $1, Column $2)"));
    }
})();