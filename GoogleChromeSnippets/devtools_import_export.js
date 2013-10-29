// snippet devtools_import_export.js exported by snippeteer from
// Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1684.0 Safari/537.36
// at 2013-10-28T20:19:08.356Z
(function() {
    try {
        var alertAndWarn = function(message) {
            window.alert(message + "\nSee JavaScript console the complete log of warnings");
            console.warn(message);

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
        var w = window.open("", "", "width=400,height=500,top=100,left=100");
        w.document.title = 'DevTools Import/Export';
        w.document.body.appendChild(document.createElement('div').appendChild(div).parentElement);
        div.appendChild(document.createElement('hr'));
        if (location.origin === "chrome-devtools://devtools") {
            var importSnippets = document.createElement('input');
            importSnippets.type = 'file';
            importSnippets.multiple = true;
            importSnippets.setAttribute('style', 'border: 0.2em dashed silver');
            var exportButton = document.createElement('input');
            exportButton.type = 'button';
            var snippets = JSON.parse(localStorage.scriptSnippets);
            exportButton.value = 'Export All ' + snippets.length + ' Snippets';

            //             div.appendChild(document.createElement('div').appendChild(document.createTextNode('Set Google Chrome to ask for download location to avaid malware warning')).parentElement);
            var aa = document.createElement('div');
            aa.innerHTML = 'Set Google Chrome to <a href="chrome://settings/search#download">ask for download location</a> to avoid malware warning';
            div.appendChild(aa);
            div.appendChild(document.createElement('div').appendChild(document.createTextNode('Import Snippets')).parentElement);
            div.appendChild(importSnippets);
            div.appendChild(document.createElement('hr'));
            div.appendChild(document.createElement('div').appendChild(exportButton).parentElement);
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
                    p.createFile(file.name, file.name, result, function(filePath) {
                        p.rename(p._uiSourceCodesMap[filePath].uiSourceCode, file.name.replace(/\.snippet$/, '.js'), function(success) {
                            if (!success) {
                                alertAndWarn('failed to rename ' + filePath + ' to ' + file.name);
                            }
                        })
                    });
                    p.refresh();
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
        } else {
            div.appendChild(document.createTextNode('Undock Developer tools into separate window and press Ctrl+Shift+I to inspect it. Then run snipetter from there to import/export snippets.'));
        }
    } catch (exception) {
        alertAndWarn(exception.stack.replace(/:(\d+):(\d+)/g, "$& (Line $1, Column $2)"));
    }
})();