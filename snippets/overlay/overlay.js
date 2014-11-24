var storageKey = 'overlay-default';
var overlayDefault = localStorage.getItem(storageKey) || '';
var url = prompt('paste overlay url', overlayDefault);
if (url) {
    localStorage.setItem(storageKey, url);
    var overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.left = 0;
    overlay.style.top = 0;
    overlay.style.width = '100%';
    overlay.style.height='100%';
    overlay.style.backgroundImage = 'url(' + url + ')';
    overlay.style.backgroundSize = 'cover';
    overlay.style.zIndex=10000;
    overlay.style.opacity = 0.5;
    document.body.appendChild(overlay);
}
