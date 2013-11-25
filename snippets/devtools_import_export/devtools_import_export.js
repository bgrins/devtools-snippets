//
// DevTools Import/Export Snippet for Google Chrome
//
// Source: https://raw.github.com/anaran/devtools-snippets/master/snippets/devtools_import_export/devtools_import_export.js
//
// Documentation: http://bgrins.github.io/devtools-snippets/#devtools_import_export
//
// Features
//
//  Export Chrome Developer Tools information to JSON
//      Source Snippets
//      Command History
//      localStorage
//
//  Import Source Snippets (from .js or JSON export) into Chrome Developer Tools
//
//  Export localStorage of websites to JSON
//
(function() {
    try {
<<<<<<< HEAD
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
                style.type = "text/css";
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
        div.innerText = "Inspecting " + location.origin;
        var localStorageDownloadButton = document.createElement('input');
        localStorageDownloadButton.type = 'button';
        localStorageDownloadButton.value = 'Export All localStorage Entries';
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
            document.body.appendChild(confirmerDiv);
            window.alert("To inspect localStorage of\n" + location.origin + '\n\n* Open ' + title + '\n\nTo import/export devtools source snippets:\n\n* Cancel\n* Undock Developer Tools into separate window\n* Press Ctrl+Shift+I to inspect it.\n* Run this snippet from there.');
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
            w.document.title = title;
            w.document.body.appendChild(document.createElement('div').appendChild(div).parentElement);
            if (location.origin === "chrome-devtools://devtools") {
                div.appendChild(document.createElement('hr'));
                if (localStorage.consoleHistory) {
                    var aHistory = document.createElement('a');
                    aHistory.href = '';
                    aHistory.target = 'dtie_cch';
                    aHistory.innerText = 'Console Command History';
                    var aHistoryDiv = document.createElement('div');
                    div.appendChild(aHistoryDiv);
                    var aHistoryText = document.createTextNode('Show All Entries ');
                    aHistoryDiv.appendChild(aHistoryText);
                    aHistoryDiv.appendChild(aHistory);
                    aHistory.addEventListener('click', function(event) {
                        event.preventDefault();
                        downloadConsoleHistory();
                    }, false);
                    div.appendChild(document.createElement('hr'));
                }
                var importSnippets = document.createElement('input');
                importSnippets.type = 'file';
                importSnippets.multiple = true;
                importSnippets.setAttribute('style', 'border: 0.2em dashed silver');
                div.appendChild(document.createElement('div').appendChild(document.createTextNode('Import Snippets individually or from exported localStorage.')).parentElement);
                div.appendChild(importSnippets);
                div.appendChild(document.createElement('hr'));
                var aDownloadAsk = document.createElement('a');
                aDownloadAsk.href = 'https://support.google.com/chrome/answer/95574?hl=' + navigator.language;
                aDownloadAsk.target = 'dtie_afd';
                aDownloadAsk.innerText = 'ask for download location';
                var aDownloadAskDiv = document.createElement('div');
                div.appendChild(aDownloadAskDiv);
                aDownloadAskDiv.appendChild(document.createTextNode('Set Google Chrome to '));
                aDownloadAskDiv.appendChild(aDownloadAsk);
                aDownloadAskDiv.appendChild(document.createTextNode(' to avoid malware warning (still requires confirming each download).'));
                aDownloadAskDiv.addEventListener('click', function(event) {
                    event.preventDefault();
                    window.open(aDownloadAsk.href, aDownloadAsk.target);
                }, false);
                var exportButton = document.createElement('input');
                exportButton.type = 'button';
                exportButton.value = 'Export All Snippets';
                exportButton.addEventListener('click', function(event) {
                    var aNodeList = w.document.querySelectorAll('a[download]');
                    for (var i = 0, len = aNodeList.length; i < len; i++) {
                        aNodeList[i].click();
                    }
                }, false);
                div.appendChild(document.createElement('div').appendChild(exportButton).parentElement);
                var deleteButton = document.createElement('input');
                deleteButton.type = 'button';
                deleteButton.value = 'Delete All Snippets';
                deleteButton.addEventListener('click', function(event) {
                    localStorageDownloadButton.click();
                    if (window.confirm("I have verified localStorage download completed successfully and would like to delete all snippets from Chrome now.\n\n(This cannot be undone when localStorage data has not been downloaded.)")) {
                        p = WebInspector.scriptSnippetModel.project();
                        var scs = p.uiSourceCodes();
                        // TODO Please note Chrome 30 deleteFile takes a uiSourceCode argument.
                        if (p.deleteFile.toString().match(/function\s*\(uiSourceCode\)/)) {
                            // TODO Please note Chrome 30 misses entries when counting up.
                            for (var i = scs.length - 1; i >= 0; i--) {
                                console.log("deleting snippet " + scs[i].path());
                                p.deleteFile(scs[i]);
                            }
                        } else {
                            // TODO Please note Chrome 32 deleteFile takes a path argument.
                            var paths = scs.map(function(sc) {
                                return sc.path();
                            });
                            paths.forEach(function(path) {
                                p.deleteFile(path);
                                console.log("snippet " + path + " has been deleted.");
                            });
                        }
                        p.refresh();
                    }
                }, false);
                div.appendChild(document.createElement('div').appendChild(deleteButton).parentElement);
                var snippetLinks = document.createElement('div');
                div.appendChild(document.createElement('div').appendChild(document.createTextNode('Export Snippets Individually')).parentElement);
                div.appendChild(snippetLinks);
                var checkFileCount = function(files) {
                    if (files.length === 0) {
                        alertAndWarn('Please pick some .js files for import as google chrome devtools snippets.');
                        return false;
                    } else {
                        return true;
                    }
                };

                function createSnippet(fileName, result, review) {
                    if (review) {
                        var w = window.open("", "", "width=" + window.screen.availWidth / 2 + ",height=" + window.screen.availHeight / 2 + ",top=100,left=100");
                        w.document.title = 'Snippet ' + fileName;
                        var pre = document.createElement('pre');
                        pre.innerText = result;
                        w.document.body.appendChild(pre);
                    }
                    p = WebInspector.scriptSnippetModel.project();
                    if (p.createFile.length === 4) {
                        p.createFile(fileName, fileName, result, function(filePath) {
                            p.rename(p._uiSourceCodesMap[filePath].uiSourceCode, fileName.replace(/\.snippet$/, '.js'), function(success) {
                                if (!success) {
                                    alertAndWarn('failed to rename ' + filePath + ' to ' + fileName);
                                }
                            });
                        });
                    } else if (p.createFile.length === 3) {
                        p.createFile(fileName, fileName, function(filePath) {
                            p.setFileContent(p._uiSourceCodesMap[filePath].uiSourceCode, result, function(what) {
                                console.log('setFileContent callback argument what:', what);
                            });
                            p.rename(p._uiSourceCodesMap[filePath].uiSourceCode, fileName.replace(/\.snippet$/, '.js'), function(success) {
                                if (!success) {
                                    alertAndWarn('failed to rename ' + filePath + ' to ' + fileName);
                                }
                            });
                        });
                    } else {
                        alertAndError("Cannot handle p.createFile with " + p.createFile.length + " arguments");
                    }
                }

                function readFileUpdateUI(file) {
                    var reader = new FileReader();
                    var filesLoaded = 0;
                    reader.onerror = errorHandler;
                    reader.onload = function(readEvent) {
                        filesLoaded++;
                        console.timeEnd('read of ' + file.name);
                        var result = readEvent.target.result;
                        try {
                            var scriptSnippets = JSON.parse(JSON.parse(result).scriptSnippets);
                            scriptSnippets.forEach(function(snippet) {
                                createSnippet(snippet.name, snippet.content, true && "review");
                            });
                        } catch (exception) {
                            createSnippet(file.name, result, true && "review");
                        }
                    };
                    console.time('read of ' + file.name);
                    reader.readAsText(file);
                }
                importSnippets.addEventListener('change', function(event) {
                    console.log(event.target.files);
                    if (checkFileCount(event.target.files)) {
                        // TODO files are added to head of the list, so we have to process in reverse order.
                        console.log("Importing snippet files, please wait...");
                        for (var i = 0, len = event.target.files.length; i < len; i++) {
                            readFileUpdateUI(event.target.files[i]);
                        }
                    }
                    WebInspector.scriptSnippetModel.project().refresh();
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
            window.setInterval(function() {
                localStorageDownloadButton.value = 'Export All ' + localStorage.length + ' localStorage Entries';
                if (location.origin === "chrome-devtools://devtools") {
                    var nds = snippetLinks.querySelectorAll('div');
                    for (var i = 0, len = nds.length; i < len; i++) {
                        snippetLinks.removeChild(nds[i]);
                    }
                    var snippets = JSON.parse(localStorage.scriptSnippets);
                    snippets.forEach(function(snippet) {
                        var blob = new window.Blob(['// snippet ' + snippet.name + ' exported by snippeteer from\n// ' + navigator.userAgent + '\n// at ' + (new Date()).toJSON() + '\n' + snippet.content], {
                            'type': 'text/utf-8'
                        });
                        var a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.download = snippet.name;
                        a.innerText = snippet.name;
                        snippetLinks.appendChild(document.createElement('div').appendChild(a).parentElement);
                    });
                    var snippets = JSON.parse(localStorage.scriptSnippets);
                    aHistoryText.textContent = 'Show All ' + JSON.parse(localStorage.consoleHistory).length + ' Entries ';
                    deleteButton.value = 'Delete All ' + snippets.length + ' Snippets';
                    exportButton.value = 'Export All ' + snippets.length + ' Snippets';
                }
            }, 3000);
=======
        function getDownloadFileName(count) {
            var abbrevCount;
            var d = new Date();
            var fileName = 'chrome-snippets-' + count + '-'; //$NON-NLS-0$
            fileName += d.getFullYear();
            var month = d.getMonth() + 1;
            fileName += "-" + ((month < 10) ? "0" + month : month); //$NON-NLS-0$ //$NON-NLS-1$
            //	TODO Please note getDay() returns the day of week,
            //	see http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.5.16
            var day = d.getDate();
            fileName += "-" + ((day < 10) ? "0" + day : day); //$NON-NLS-0$ //$NON-NLS-1$
            var hours = d.getHours();
            fileName += "T" + ((hours < 10) ? "0" + hours : hours); //$NON-NLS-0$ //$NON-NLS-1$
            var minutes = d.getMinutes();
            fileName += ((minutes < 10) ? "0" + minutes : minutes); //$NON-NLS-0$
            var seconds = d.getSeconds();
            fileName += ((seconds < 10) ? "0" + seconds : seconds); //$NON-NLS-0$
            var timeZoneOffset = -d.getTimezoneOffset();
            var offsetMinutes = timeZoneOffset % 60;
            var offsetHours = (timeZoneOffset - offsetMinutes) / 60;
            // TODO FIXME >= 0 ?
            fileName += (offsetHours > 0 ? "+" : "") + ((offsetHours < 10) ? "0" + offsetHours : offsetHours) + ((offsetMinutes < 10) ? "0" + offsetMinutes : offsetMinutes); //$NON-NLS-0$ //$NON-NLS-2$ //$NON-NLS-1$
            fileName += '.json'; //$NON-NLS-0$
            return fileName;
        }

        var title = 'DevTools Import/Export';
        var cancel = 'Cancel';
        var alertAndWarn = function(message) {
            window.alert(message + "\nSee JavaScript console for the complete log of warnings");
            console.warn(message);
        }
        var alertAndError = function(message) {
            window.alert(message + "\nSee JavaScript console for the complete log of errors");
            console.error(message);
        }
        var div = document.createElement('div');
        var devtoolsImportExport = function() {
            try {
                var w = window.open("", "");
                w.document.title = title;
                w.document.body.appendChild(document.createElement('div').appendChild(div).parentElement);
                if (location.origin === "chrome-devtools://devtools") {
                    var importSnippets = document.createElement('input');
                    importSnippets.type = 'file';
                    importSnippets.multiple = true;
                    importSnippets.setAttribute('style', 'border: 0.2em dashed silver');
                    div.appendChild(document.createElement('div').appendChild(document.createTextNode('Import Snippets individually or from exported localStorage.')).parentElement);
                    div.appendChild(importSnippets);

                    var reviewImports = document.createElement('input');
                    reviewImports.id = "reviewImports";
                    //                     reviewImports.name = "reviewImports";
                    reviewImports.type = "checkbox";
                    reviewImports.title = "Review each imported snippet in popup window.";
                    reviewImports.checked = true;
                    var reviewImportsLabel = document.createElement('label');
                    reviewImportsLabel.
                    for = "reviewImports";
                    reviewImportsLabel.innerText = "review";
                    div.appendChild(reviewImportsLabel);
                    div.appendChild(reviewImports);

                    var conflictDiv = div.appendChild(document.createElement('div'));
                    conflictDiv.appendChild(document.createTextNode('What if snippets by those names exist in devtools?'));
                    var conflictSelect = document.createElement('select');
                    conflictSelect.multiple = false;
                    var overwrite = document.createElement('option');
                    var rename = document.createElement('option');
                    overwrite.innerText = "Import overwrites existing content";
                    rename.innerText = "Rename imported content";
                    overwrite.title = "The existing snippet's ID is used, its content replaced.";
                    rename.title = "The ID of the newly created snippet is included in its name.";
                    conflictSelect.appendChild(rename);
                    conflictSelect.appendChild(overwrite);
                    conflictDiv.appendChild(conflictSelect);
                    conflictSelect.value = rename.innerText;

                    div.appendChild(document.createElement('hr'));
                    var aDownloadAsk = document.createElement('a');
                    aDownloadAsk.href = 'https://support.google.com/chrome/answer/95574?hl=' + navigator.language;
                    aDownloadAsk.target = 'dtie_afd';
                    aDownloadAsk.innerText = 'ask for download location';
                    var aDownloadAskDiv = document.createElement('div');
                    div.appendChild(aDownloadAskDiv);
                    aDownloadAskDiv.appendChild(document.createTextNode('You may set Google Chrome to '));
                    aDownloadAskDiv.appendChild(aDownloadAsk);
                    aDownloadAskDiv.appendChild(document.createTextNode(' to avoid malware warning (still requires confirming each download).'));
                    aDownloadAskDiv.addEventListener('click', function(event) {
                        event.preventDefault();
                        window.open(aDownloadAsk.href, aDownloadAsk.target);
                    }, false);
                    var exportButton = document.createElement('input');
                    exportButton.type = 'button';
                    exportButton.value = 'Export All Snippets';
                    var exportSnippets = function(individually) {
                        var aNodeList = w.document.querySelectorAll('a[download]');
                        if (individually) {
                            for (var i = 0, len = aNodeList.length; i < len; i++) {
                                aNodeList[i].click();
                            }
                        } else {
                            var localStorageBlob = new window.Blob([JSON.stringify(localStorage, ['scriptSnippets'], 2)], {
                                'type': 'text/utf-8'
                            });
                            var a = document.createElement('a');
                            a.href = URL.createObjectURL(localStorageBlob);
                            var snippets = JSON.parse(localStorage.scriptSnippets);
                            a.download = getDownloadFileName(snippets.length);
                            a.click();
                        }
                    }
                    exportButton.addEventListener('click', function(event) {
                        if (exportTypeSelect.value === individualFiles.innerText) {
                            exportSnippets( !! "individually");
                        } else {
                            exportSnippets(!"individually");
                        }
                    }, false);
                    var exportDiv = document.createElement('div');
                    div.appendChild(exportDiv.appendChild(exportButton).parentElement);
                    // exportTypeSelect
                    //                    var exportTypeDiv = exportDiv.appendChild(document.createElement('div'));
                    var exportTypeSelect = document.createElement('select');
                    exportTypeSelect.multiple = false;
                    var singleFile = document.createElement('option');
                    var individualFiles = document.createElement('option');
                    singleFile.innerText = "All into single JSON file";
                    individualFiles.innerText = "Individual source code files";
                    singleFile.title = "All snippets are saved into a single timestamped JSON file\n(e. g. " + getDownloadFileName('COUNT') + ')';
                    individualFiles.title = "Each snippet source code is saved by its name, adding a missing file type extension.";
                    exportTypeSelect.appendChild(individualFiles);
                    exportTypeSelect.appendChild(singleFile);
                    exportDiv.appendChild(exportTypeSelect);
                    exportTypeSelect.value = singleFile.innerText;
                    // missingFileTypeExtensionSelect
                    var missingFileTypeExtensionSelect = document.createElement('select');
                    missingFileTypeExtensionSelect.multiple = false;
                    var textFile = document.createElement('option');
                    var javaScriptFile = document.createElement('option');
                    // Documented in https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement
                    textFile.value = ".txt";
                    javaScriptFile.value = ".js";
                    // Displayed in the meu
                    textFile.innerText = ".txt";
                    javaScriptFile.innerText = ".js";
                    textFile.title = "Extension is only added when snippet name has none (causes no malware warning).";
                    javaScriptFile.title = "Extension is only added when snippet name has none (causes malware warning).";
                    missingFileTypeExtensionSelect.appendChild(javaScriptFile);
                    missingFileTypeExtensionSelect.appendChild(textFile);
                    exportDiv.appendChild(missingFileTypeExtensionSelect);
                    missingFileTypeExtensionSelect.value = javaScriptFile.innerText;
                    // deleteButton
                    var deleteButton = document.createElement('input');
                    deleteButton.type = 'button';
                    deleteButton.title = singleFile.title + 'first';
                    deleteButton.value = 'Delete All Snippets';
                    deleteButton.addEventListener('click', function(event) {
                        exportSnippets(!"individually");
                        //                        localStorageDownloadButton.click();
                        if (window.confirm("I have verified localStorage download completed successfully and would like to delete all snippets from Chrome now.\n\n(This cannot be undone when localStorage data has not been downloaded.)")) {
                            localStorage.scriptSnippets = "";
                        }
                    }, false);
                    div.appendChild(document.createElement('div').appendChild(deleteButton).parentElement);
                    var snippetLinks = document.createElement('div');
                    div.appendChild(document.createElement('div').appendChild(document.createTextNode('Export Snippets Individually')).parentElement);
                    div.appendChild(snippetLinks);
                    var checkFileCount = function(files) {
                        if (files.length === 0) {
                            alertAndWarn('Please pick some .js files for import as google chrome devtools snippets.');
                            return false;
                        } else {
                            return true;
                        }
                    };

                    function createSnippetUpdateLastId(scriptSnippetsParsed, snippetArrayIndexByName, fileName, result, review, overwrite) {
                        function newSnippet(rename) {
                            var newID = Number(localStorage.scriptSnippets_lastIdentifier) + 1;
                            localStorage.scriptSnippets_lastIdentifier = JSON.stringify(newID);
                            scriptSnippetsParsed.push({
                                id: newID,
                                name: rename ? (fileName.replace(/^(.+?)(\.[a-z]+)?$/, '$1_' + newID + '$2')) : fileName,
                                content: result
                            });
                        }
                        if (review) {
                            var w = window.open("", "", "width=" + window.screen.availWidth / 2 + ",height=" + window.screen.availHeight / 2 + ",top=100,left=100");
                            w.document.title = 'Snippet ' + fileName;
                            var pre = document.createElement('pre');
                            pre.innerText = result;
                            w.document.body.appendChild(pre);
                        }
                        var snippetArrayIndex = snippetArrayIndexByName[fileName];
                        if (snippetArrayIndex) {
                            if (overwrite) {
                                scriptSnippetsParsed[snippetArrayIndex].content = result;
                            } else {
                                newSnippet( !! 'rename');
                            }
                        } else {
                            newSnippet(!'rename');
                        }
                    }

                    function readFileUpdateUI(file) {
                        var reader = new FileReader();
                        var filesLoaded = 0;
                        var scriptSnippetsParsed = localStorage.scriptSnippets.length ? JSON.parse(localStorage.scriptSnippets) : [];
                        var snippetArrayIndexByName = {};
                        var overwriteExisting = (conflictSelect.value === overwrite.innerText);
                        scriptSnippetsParsed.forEach(function(value, index) {
                            snippetArrayIndexByName[value.name] = index;
                        });
                        reader.onerror = errorHandler;
                        reader.onload = function(readEvent) {
                            filesLoaded++;
                            console.timeEnd('read of ' + file.name);
                            var result = readEvent.target.result;
                            try {
                                var scriptImportSnippets = JSON.parse(JSON.parse(result).scriptSnippets);
                                scriptImportSnippets.forEach(function(snippet) {
                                    createSnippetUpdateLastId(scriptSnippetsParsed, snippetArrayIndexByName, snippet.name, snippet.content, reviewImports.checked, overwriteExisting);
                                });
                                localStorage.scriptSnippets = JSON.stringify(scriptSnippetsParsed);
                            } catch (exception) {
                                createSnippetUpdateLastId(scriptSnippetsParsed, snippetArrayIndexByName, file.name, result, reviewImports.checked, overwriteExisting);
                                localStorage.scriptSnippets = JSON.stringify(scriptSnippetsParsed);
                            }
                        };
                        console.time('read of ' + file.name);
                        reader.readAsText(file);
                    }
                    importSnippets.addEventListener('change', function(event) {
                        //                        console.log(event.target.files);
                        if (checkFileCount(event.target.files)) {
                            // TODO files are added to head of the list, so we have to process in reverse order.
                            //                            console.log("Importing snippet files, please wait...");
                            for (var i = 0, len = event.target.files.length; i < len; i++) {
                                readFileUpdateUI(event.target.files[i]);
                            }
                        }
                        //                        w.setInterval(refreshSnippetDisplay, 3000);
                        if (w.confirm('Please confirm to close ' + title + ' now.\n\ndevtools will also be closed to avoid stale snippet information.\n\n')) {
                            //                            w.location.reload(true);
                            //                            window.location.reload(true);
                            window.close();
                            w.close();
                        }
                        //                        WebInspector.scriptSnippetModel.project().refresh();
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
                var refreshSnippetDisplay = function() {
                    //                localStorageDownloadButton.value = 'Export All ' + localStorage.length + ' localStorage Entries';
                    if (location.origin === "chrome-devtools://devtools") {
                        var nds = snippetLinks.querySelectorAll('div');
                        for (var i = 0, len = nds.length; i < len; i++) {
                            snippetLinks.removeChild(nds[i]);
                        }
                        var snippets = localStorage.scriptSnippets.length ? JSON.parse(localStorage.scriptSnippets) : [];
                        snippets.forEach(function(snippet) {
                            var blob = new window.Blob(['// snippet ' + snippet.name + ' exported by devtools_import_export.js from\n// ' + navigator.userAgent + '\n// at ' + Date() + '\n' + snippet.content], {
                                'type': 'text/utf-8'
                            });
                            var a = document.createElement('a');
                            a.href = URL.createObjectURL(blob);
                            if (snippet.name.match(/\.[a-z]+$/i)) {
                                a.download = snippet.name;
                            } else {
                                a.download = snippet.name + missingFileTypeExtensionSelect.value;
                            }
                            a.innerText = a.download;
                            snippetLinks.appendChild(document.createElement('div').appendChild(a).parentElement);
                        });
                        deleteButton.value = 'Delete All ' + snippets.length + ' Snippets';
                        exportButton.value = 'Export All ' + snippets.length + ' Snippets';
                    }
                };
                refreshSnippetDisplay();
                w.setInterval(refreshSnippetDisplay, 3000);
            } catch (exception) {
                alertAndWarn(exception.stack.replace(/:(\d+):(\d+)/g, "$& (Line $1, Column $2)"));
            }
        }
        if (location.origin === "chrome-devtools://devtools") {
            devtoolsImportExport();
        } else {
            window.alert('To import/export devtools source snippets:\n\n* Undock Developer Tools into separate window\n* Press Ctrl+Shift+I to inspect it.\n* Run this snippet from there.');
>>>>>>> devtools_import_export
        }
    } catch (exception) {
        alertAndWarn(exception.stack.replace(/:(\d+):(\d+)/g, "$& (Line $1, Column $2)"));
    }
})();