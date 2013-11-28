//### devtools_import_export.js
//
//### Developer Tools Import/Export Snippet for Google Chrome
//
//Source
//-------
//
//**Release** https://raw.github.com/bgrins/devtools-snippets/master/snippets/devtools_import_export.js
//
//**Development** https://raw.github.com/anaran/devtools-snippets/master/snippets/devtools_import_export.js
//
//Documentation
//-------
//
//**Release** http://bgrins.github.io/devtools-snippets/#devtools_import_export
//
//**Development** https://github.com/anaran/devtools-snippets/blob/devtools_import_export/snippets/devtools_import_export/README.md
//
//### Features
//
//-  Export Chrome Developer Tools Source Snippets
//
//    - All into Single JSON File
//    - Individual Source Code Files
//
//-  Import Source Snippets into Chrome Developer Tools
//
//    - Select Multiple Files in Dialog Box
//    - Drop Multiple Files
//
//        - Import Source Files
//        - Import Previous Export File
//        - Import devtools-snippets JSON File from http://bgrins.github.io/devtools-snippets/snippets.json
//
//Implementation by [anaran](https://github.com/anaran).
(function() {
    try {
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
            window.alert(message + "\n----\nSee JavaScript console for the complete log of warnings");
            console.warn(message);
        }
        var alertAndError = function(message) {
            window.alert(message + "\n----\nSee JavaScript console for the complete log of errors");
            console.error(message);
        }
        var div = document.createElement('div');
        var devtoolsImportExport = function() {
            try {
                var w = window.open("", "");
                w.document.title = title;
                w.document.body.appendChild(document.createElement('div').appendChild(div).parentElement);
                var aClose = document.createElement('a');
                aClose.innerHTML = 'Close here (<strong>[ x ]</strong> crashes canary)';
                aClose.href = '';
                var closeDiv = document.createElement('div');
                closeDiv.appendChild(aClose);
                closeDiv.setAttribute('style', 'position:fixed; top: 0; right: 0; padding: 1em;');
                w.document.body.appendChild(closeDiv);
                aClose.addEventListener('click', function(event) {
                    event.preventDefault();
                    event.view.close();
                }, false);
                if (location.origin === "chrome-devtools://devtools") {
                    var importSnippets = document.createElement('input');
                    importSnippets.type = 'file';
                    importSnippets.title = 'Select (or drop) one (or more) export (or source) files here for import.';
                    importSnippets.multiple = true;
                    importSnippets.setAttribute('style', 'border: 0.2em dashed silver');
                    div.appendChild(document.createElement('div').appendChild(document.createTextNode('Import Snippets individually or from exported localStorage.')).parentElement);
                    div.appendChild(importSnippets);

                    var reviewImports = document.createElement('input');
                    reviewImports.id = "reviewImports";
                    //                     reviewImports.name = "reviewImports";
                    reviewImports.type = "checkbox";
                    reviewImports.title = "Review each imported snippet in popup window.";
                    // TODO Please note that closing a review window curretly crashes canary.
                    // See https://code.google.com/p/chromium/issues/detail?id=323031
                    reviewImports.checked = false;
                    var reviewImportsLabel = document.createElement('label');
                    reviewImportsLabel.
                    for = "reviewImports";
                    // TODO Remove once https://code.google.com/p/chromium/issues/detail?id=323031 gets fixed.
                    reviewImportsLabel.innerText = "review (crashes canary)";
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
                            var localStorageBlob = new window.Blob([JSON.stringify({
                                'snippets': JSON.parse(localStorage.scriptSnippets)
                                // TODO Please note order of keys -- first serializing name, then content.
                            }, ['snippets', 'name', 'content'], 2)], {
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
                    var exportTypeSelect = document.createElement('select');
                    exportTypeSelect.multiple = false;
                    exportTypeSelect.addEventListener('change', function(event) {
                        if (exportTypeSelect.value === individualFiles.innerText) {
                            missingFileTypeExtensionSelect.hidden = false;
                            // missingFileTypeExtensionSelect.disabled = false;
                        } else {
                            missingFileTypeExtensionSelect.hidden = true;
                            // missingFileTypeExtensionSelect.disabled = true;
                        }
                    }, false);
                    var singleFile = document.createElement('option');
                    var individualFiles = document.createElement('option');
                    singleFile.innerText = "All into single JSON file";
                    individualFiles.innerText = "Individual source code files";
                    singleFile.title = "All snippets are first saved into a single timestamped JSON file\n(e. g. " + getDownloadFileName('COUNT') + ')';
                    individualFiles.title = "Each snippet source code is saved by its name, adding a missing file type extension.";
                    exportTypeSelect.appendChild(individualFiles);
                    exportTypeSelect.appendChild(singleFile);
                    exportDiv.appendChild(exportTypeSelect);
                    exportTypeSelect.value = singleFile.innerText;
                    // missingFileTypeExtensionSelect
                    var missingFileTypeExtensionSelect = document.createElement('select');
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
                    missingFileTypeExtensionSelect.multiple = false;
                    missingFileTypeExtensionSelect.hidden = true;
                    // deleteButton
                    var deleteButton = document.createElement('input');
                    deleteButton.type = 'button';
                    deleteButton.title = singleFile.title;
                    deleteButton.value = 'Delete All Snippets';
                    deleteButton.addEventListener('click', function(event) {
                        exportSnippets(!"individually");
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
                        reader.onabort = errorHandler;
                        reader.onload = function(readEvent) {
                            filesLoaded++;
                            console.timeEnd('read of ' + file.name);
                            var result = readEvent.target.result;
                            try {
                                var scriptImportSnippets, parsedResult = JSON.parse(result);
                                // TODO Set to false to provoke error on snippets import for testing.
                                if (true) {
                                    if (parsedResult.hasOwnProperty('snippets')) {
                                        scriptImportSnippets = parsedResult.snippets;
                                    }
                                }
                                if (parsedResult.hasOwnProperty('scriptSnippets')) {
                                    scriptImportSnippets = JSON.parse(parsedResult.scriptSnippets);
                                }
                                scriptImportSnippets.forEach(function(snippet) {
                                    createSnippetUpdateLastId(scriptSnippetsParsed, snippetArrayIndexByName, snippet.name, snippet.content, reviewImports.checked, overwriteExisting);
                                });
                                localStorage.scriptSnippets = JSON.stringify(scriptSnippetsParsed);
                            } catch (exception) {
                                if (parsedResult) {
                                    alertAndWarn(file.name + ' is parsable, but invalid, JSON.\nIt will be loaded as source code for your review.' + '\n\nIt should instead contain\n{"snippets":\n[{"name": "...", "content": "..."}, ...]}' + '\n\nor alternatively\n{"scriptSnippets":\n"[{\\"name\\": \\"...\\", \\"content\\": \\"...\\"}, ...]"}' + '\n\nInstead it starts with ' + result.substring(0, 40));
                                }
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
                                // TODO Please note this is asychronous and does not block!
                                readFileUpdateUI(event.target.files[i]);
                            }
                        }
                        // TODO this kills an in-progress read!
                        // window.close();
                        //                        w.setInterval(refreshSnippetDisplay, 3000);
                        //                         if (w.confirm('Please confirm to close ' + title + ' now.\n\ndevtools will also be closed to avoid stale snippet information.\n\n')) {
                        //                            w.location.reload(true);
                        //                            window.location.reload(true);
                        //                        w.close();
                        // window.close();
                        //                         }
                    }, false);

                    function errorHandler(domError) {
                        console.log(domError);
                        alertAndWarn(JSON.stringify(domError, function(key, value) {
                            if (key && value instanceof Object) {
                                return value.toString();
                            } else {
                                return value;
                            }
                        }));
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
                            if (snippet.name.match(/\.[a-z]+$/i) || missingFileTypeExtensionSelect.hidden) {
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
        }
    } catch (exception) {
        alertAndWarn(exception.stack.replace(/:(\d+):(\d+)/g, "$& (Line $1, Column $2)"));
    }
})();