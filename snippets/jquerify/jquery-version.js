// jquery-version
// https://github.com/yawboakye/dev-tools
// https://github.com/bgrins/dev-tools
// Add a specific version of jQuery to any page at all.
// If jQuery already existed, it saves the original version
// in case you wanna revert back to it.

(function() {
    'use strict';

    var ALL_VERSIONS = window.JQUERY_VERSIONS = [
        '1.0    1.0.1  1.0.2  1.0.3   1.0.4  1.1.0 1.1.1  1.1.2  1.1.3  1.1.4   1.2.0  1.2.1',
        '1.2.2  1.2.3  1.2.4  1.2.5   1.2.6  1.3.1 1.3.2  1.4.0  1.4.1  1.4.2   1.4.3  1.4.4',
        '1.5.0  1.5.1  1.5.2  1.6.0   1.6.1  1.6.2 1.6.3  1.6.4  1.7.0  1.7.1   1.7.2  1.8.0',
        '1.8.1  1.8.2  1.8.3  1.9.0   1.9.1  1.10.0 1.10.1 1.10.2 2.0.0  2.0.1   2.0.2  2.0.3'
    ].join('\n').split(/\s+/);

    var oldjQuery = window.jQuery;

    window.resetjQuery = function () {
        console.group('Resetting jQuery version');
        if ( !oldjQuery ) {
            if (window.jQuery) {
                delete window.jQuery;
                console.log('all jQuery objects removed from window');
            }

            console.log('no jQuery in this window');
        } else {
            window.jQuery = oldjQuery;
            var style0 = "font-style: italic; color: #333";
            var style1 = "font-weight: bold;";
            console.log('%cOriginal jQuery (version %c%s%c) loaded back into window. Enjoy!', style0, style1, window.jQuery.fn.jquery, style0);
        }

        console.groupEnd();
    };

    window.loadjQuery = function (version) {
        var LATEST      = '1.10.2',
            ourScriptId = 'jquery-version-devtools-snippet',

            loadScript  = function () {
                var script = document.createElement('script');
                script.id  = ourScriptId;

                ALL_VERSIONS.indexOf(version) > -1
                    ? script.src = '//code.jquery.com/jquery-' + version + (version < '1.2.0' ? '.pack.js' : '.min.js')
                    : script.src = '//code.jquery.com/jquery-latest.min.js';

                return script;
            };

        if ( window.jQuery ) {
            if ( window.jQuery.fn.jquery === (version || LATEST) ) {
                console.log('jQuery v%s already loaded.', (version || LATEST));
                return;
            }

            delete window.jQuery; // set current jQuery object to null
        }

        // remove previously inserted scripts
        // console.log(script);
        var oldScript = document.querySelector('#' + ourScriptId);
        if ( oldScript ) {
            delete window.jQuery;
            document.body.removeChild(oldScript);
        }

        document.body.appendChild(loadScript());

    };

})();