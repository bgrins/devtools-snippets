// console-restore.js
// Restore console's functionality

(function(document, window){

    // jQuery version: window.console = jQuery('<iframe>').hide().appendTo('body')[0].contentWindow.console;

    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'about: blank';

    document.body.appendChild(iframe);
    window.console = iframe.contentWindow.console;

})(document, window)
