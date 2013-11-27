### devtools_import_export.js

### Developer Tools Import/Export Snippet for Google Chrome

Source
-------

**Release** https://raw.github.com/bgrins/devtools-snippets/master/snippets/devtools_import_export.js

**Development** https://raw.github.com/anaran/devtools-snippets/master/snippets/devtools_import_export.js

Documentation
-------

**Release** http://bgrins.github.io/devtools-snippets/#devtools_import_export

**Development** https://github.com/anaran/devtools-snippets/blob/devtools_import_export/snippets/devtools_import_export/README.md

### Features

-  Export Chrome Developer Tools Source Snippets

    - All into Single JSON File
    - Individual Source Code Files


-  Import Source Snippets into Chrome Developer Tools

    - Select Multiple Files in Dialog Box
    - Drop Multiple Files

        - Import Source Files
        - Import Previous Export File
        - Import devtools-snippets JSON File from http://bgrins.github.io/devtools-snippets/snippets.json

Implementation by [anaran](https://github.com/anaran).

[Typical Use Cases](#step-1)

[![devtools_import_export](devtools_import_export.gif)](devtools_import_export.js)

## Typical Use Cases

* [Get devtools_import_export installed](#step-1)
* [Run devtools_import_export Snippet](#step-4)
* [Export website localStorage](#step-6)
* [Import Snippets indo Developer Tools](#step-7)
* [Show/Download Developer Tools Console Command History](#step-11)
* [Delete All Developer Tools Snippets](#step-12)

### Step 1

[end](#step-13) [forward](#step-2) [overview](#typical-use-cases)

Open Developer Tools with `Ctrl`+`Shift`+`I`.

See [Chrome DevTools Keyboard Shortcuts](https://developers.google.com/chrome-developer-tools/docs/shortcuts).

### Step 2

[back](#step-1) [forward](#step-3) [overview](#typical-use-cases)

Add New snippet with Snippets tab context menu

![][dtie02]

### Step 3

[back](#step-2) [forward](#step-4) [overview](#typical-use-cases)

Accept the automatically generated snippet name

![][dtie03]

### Step 4

[back](#step-3) [forward](#step-5) [overview](#typical-use-cases)

Copy raw contents of the devtools_import_export.js snippet.

See [Source](#source)

![][dtie04]

### Step 7

[back](#step-6) [forward](#step-8) [overview](#typical-use-cases)

Undock Developer Tools into separate window.

![][dtie14]

Press `Ctrl`+`Shift`+`I` in Developer Tools to inspect it (to get access to snippets storage)

Select "Script snippet #109" and Run it

![][dtie15]

### Step 8

[back](#step-7) [forward](#step-9) [overview](#typical-use-cases)

A new window, "DevTools Import/Export", opens.

Click "Import Snippets" and pick a local download of http://bgrins.github.io/devtools-snippets/snippets.json.

![][dtie16]

### Step 9

[back](#step-8) [forward](#step-10) [overview](#typical-use-cases)

Delete all Snippets if you like.

They will always exported to a single JSON file first.

It will then ask you for confirmation you have acually verified the successful backup export of localStorage data containing snippets source code.

It will finally delete all snippets if you confirm with `OK`. You can still `Cancel` at this point.

"DevTools Import/Export" updates every 3 seconds to reflect the currently available snippets (e.g. after import or delete).

![][dtie17]

[dtie01]: dtie01.png "We start out with no snippets installed, devtools docked to main window"
[dtie02]: dtie02.png "We still see no sources displayed"
[dtie03]: dtie03.png "The Source tab now displays the empty content of the new snippet, 'Script snippet #109'"
[dtie04]: dtie04.png "Open https://raw.github.com/anaran/devtools-snippets/master/snippets/devtools_import_export.js an chrome, copy and paste the contents to the snippet Source tab. Then press Ctrl+Enter or the |> button to 'Run snippet'"
[dtie05]: dtie05.png "A popup informs us of the two major use cases: 1. inspect the webpage, 2. import/export of devtools data (snippets, command history, localStorage)"
[dtie06]: dtie06.png "This is a handy way to save and inspect data saved in localStorage of the visited website."
[dtie07]: dtie07.png "The popup indicates we are about to inspect devtools information not specific to any website."
[dtie08]: dtie08.png "First you will have to click 'Export All n localStorage Entries' so that you can import something."
[dtie09]: dtie09.png "The relevant section of data from the saved localStorage will be used to import snippets. Alternatively you can also pick individual JavaScript files to import them as snippets. Any other files would import too, but might not be very useful."
[dtie10]: dtie10.png "Individual snippet files may also be downloaded now. Take note of the download settings advice. User confirmation is necessary for downloads of files with the .js extension."
[dtie11]: dtie11.png "This console history list is easily navigated and can be downloaded as a standalone .html file which features the same easy navigation of the history. The information is read-only, but can be copied or dragged to other editable areas."
[dtie12]: dtie12.png "Deleting all snippets can be useful when you keep them under version control outside chrome and you want to import a new set, e.g. after merging with exports from other browsers."
[dtie13]: dtie13.png "We are now back at the state at the beginning of this demo, except for changes to console history and other localStorage information you may have made."
[dtie14]: dtie14.png "Undock devtools in preparation for inspecting it."
[dtie15]: dtie15.png "Run devtools 'Script snippet #109' from 'Deveoper Tools chrome-devtools://devtools/bundled/devtools.html...'."
[dtie16]: dtie16.png "DevTools Import/Export Window, featuring various import, export options."
[dtie17]: dtie17.png "Delete All n Snippets first exports them all to single JSON file."
