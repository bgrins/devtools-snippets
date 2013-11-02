### devtools_import_export.js

### Developer Tools Import/Export Snippet for Google Chrome

**Source** https://raw.github.com/anaran/devtools-snippets/master/snippets/devtools_import_export.js

**Documentation** http://bgrins.github.io/devtools-snippets/#devtools_import_export

### Features

-  Export Chrome Developer Tools information to JSON

    - Source Snippets

    - Command History

    - localStorage

-  Import Source Snippets (from .js or JSON export) into Chrome Developer Tools

-  Export localStorage of websites to JSON

Implementation by [anaran](https://github.com/anaran).

[Typical Use Cases](#typical-use-cases)

[![devtools_import_export](devtools_import_export.gif)](devtools_import_export.js)

## Typical Use Cases

### dtie01
Open Source Tab with Ctrl+Shift+I and Ctrl+3
[back](#dtie13) [forward](#dtie02)
![][dtie01]
### dtie02
Add New snippet with Snippets tab context menu
[back](#dtie01) [forward](#dtie03)
![][dtie02]
### dtie03
Accept the automatically generated snippet name
[back](#dtie02) [forward](#dtie04)
![][dtie03]
### dtie04
Copy raw contents of the devtools_import_export.js snippet
[back](#dtie03) [forward](#dtie05)
![][dtie04]
### dtie05
Choose to inspect the current webpage by clicking the "Open DevTools Import/Export" link
[back](#dtie04) [forward](#dtie06)
![][dtie05]
### dtie06
Click the "Export All n localStorage Entries" if you like
[back](#dtie05) [forward](#dtie07)
![][dtie06]
### dtie07
Undock devtools into separate window, press Ctrl+Shift+I Ctrl+3 and select "Script snipper #109" and Run it
[back](#dtie06) [forward](#dtie08)
![][dtie07]
### dtie08
A new tab, "DevTools Import/Export", opens. In addition to localStorage it also shows information about available console command history and snippets. Click "Import Snippets" and pick a previously save export of localStorage.
[back](#dtie07) [forward](#dtie09)
![][dtie08]
### dtie09
Pick a file from your downloads folder, named similar to, e.g. "localStorage_2013-11-01T130645.378Z.txt"
[back](#dtie08) [forward](#dtie10)
![][dtie09]
### dtie10
"DevTools Import/Export" updates within 3 seconds to reflect the newly imported snippets available for export now.
[back](#dtie09) [forward](#dtie11)
![][dtie10]
### dtie11
Click "Show All n Entries Console Command History" to see the last commands you used in the console for debugging.
[back](#dtie10) [forward](#dtie12)
![][dtie11]
### dtie12
Click "Delete All n Snippets" which will ask you for confirmation you have acually verified the successful backup export of localStorage data containing snippets source code, among other information.
[back](#dtie11) [forward](#dtie13)
![][dtie12]
### dtie13
"DevTools Import/Export" updates within 3 seconds to confirm all snippets have been deleted, including the copy of devtools_import_export.js
[back](#dtie12) [forward](#dtie01)
![][dtie13]

[dtie01]: dtie01.png "We start out with no snippets installed, devtools docked to main window"
[dtie02]: dtie02.png "We still see no sources displayed"
[dtie03]: dtie03.png "The Source tab now displays the empty content of the new snippet, 'Script snipper #109'"
[dtie04]: dtie04.png "Open https://raw.github.com/anaran/devtools-snippets/master/snippets/devtools_import_export.js an chrome, copy and paste the contents to the snippet Source tab. Then type Ctrl+Enter or the |> button to 'Run snippet'"
[dtie05]: dtie05.png "A popup informs us of the two major use cases: 1. inspect the webpage, 2. import/export of devtools data (snippets, command history, localStorage)"
[dtie06]: dtie06.png "This is a handy way to save and inspect data saved in localStorage of the visited website."
[dtie07]: dtie07.png "The popup indicated we are about to inspect devtools information not specific to any website."
[dtie08]: dtie08.png "First you will have to click 'Export All n localStorage Entries' so that you can import something."
[dtie09]: dtie09.png "The relevant section of data from the saved localStorage will be used to import snippets. Alternatively you can also pick individual JavaScript files to import them as snippets. Any other files would import too, but might not be very useful."
[dtie10]: dtie10.png "Individual snippet files may also be downloaded now. Take note of the download settings advice. User confirmation is necessary for downloads of files with the .js extension."
[dtie11]: dtie11.png "This console history list is easily navigated and can be downloaded as a standalone .html file which features the same easy navigation of the history. The information is read-only, but can be copied or dragged to other editable areas."
[dtie12]: dtie12.png "Deleting all snippets can be useful when you keep them under version control outside chrome and you want to import a new set, e.g. after merging with exports from other browsers."
[dtie13]: dtie13.png "We are now back at the state at the beginning of this demo, except for changes to console history and other localStorage information you may have made."
