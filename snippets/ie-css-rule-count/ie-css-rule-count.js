// ie-css-rule-count.js
// https://github.com/bgrins/devtools-snippets
// Counts css rules per stylesheet for IE browser limitation check (4096 rules).

(function () {
    var results = '',
            log = '';

    var cssRuleCounter = (function () {
        var wrapper = {
            _countSheet: function(stylesheet) {
                var count = 0;
                if (stylesheet && stylesheet.cssRules) {
                    for (var j = 0, l = stylesheet.cssRules.length; j < l; j++) {
                        if (!stylesheet.cssRules[j].selectorText) {
                            if (stylesheet.cssRules[j].cssRules) {
                                for (var m = 0, n = stylesheet.cssRules[j].cssRules.length; m < n; m++) {
                                    if(stylesheet.cssRules[j].cssRules[m].selectorText) {
                                        count += stylesheet.cssRules[j].cssRules[m].selectorText.split(',').length;
                                    }
                                }
                            }
                        }
                        else {
                            count += stylesheet.cssRules[j].selectorText.split(',').length;
                        }
                    }
    
                    log += '\nFile: ' + (stylesheet.href ? stylesheet.href : 'inline <style> tag');
                    log += '\nRules: ' + stylesheet.cssRules.length;
                    log += '\nSelectors: ' + count;
                    log += '\n--------------------------';
                    if (count >= 4096) {
                        results += '\n********\nWARNING:\n There are ' + count + ' CSS rules in the stylesheet ' + stylesheet.href + ' - IE will ignore the last ' + (count - 4096) + ' rules!\n';
                    }
               }
            },
            init: function() {                
                for (var i = 0; i < document.styleSheets.length; i++) {
                    wrapper._countSheet(document.styleSheets[i]);
                }
                console.log(log);
                console.log(results);
            }
        }
        return {
            init: wrapper.init,
        }
    })();

    cssRuleCounter.init();
})();
