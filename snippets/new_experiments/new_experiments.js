(function() {
  'use strict';

  var expElems    = document.querySelectorAll('.experiment-name');
  var lastMemo    = JSON.parse(localStorage.getItem('Experiments')) || {};
  var cache       = {};
  var expCache    = {};
  var tabs        = [];
  var timeCheck   = lastMemo['Timestamp'];
  var placeholder = [{
      'Experiment': 'next time',
      'Supported Platforms': 'O_O'
    }];
  var platform;

  (function() {
    for (var i = 0, len = expElems.length; i < len; i += 1) {

      if (expElems[i].classList.contains('no-experiments')) {
        continue;
      } else {
        platform = (expElems[i].nextElementSibling.textContent.trim()).split(
          ',');
        cache[expElems[i].textContent.trim()] = platform;
      }
    }

    for (var prop in cache) {

      if (!(prop in lastMemo)) {
        expCache[prop] = cache[prop];
      }

      lastMemo[prop] = cache[prop];
    }

    for (var index in expCache) {
      var arr = [];
      arr.push(index);
      arr.push(expCache[index]);

      tabs.push(arr);
    }

    tabs = tabs.map(function(exp) {
      var o = {};
      var k = [];
      for (var n = 0; n < exp.length; n += 1) {
        if (Array.isArray(exp[n])) {
          for (var j = 0; j < exp[n].length; j += 1) {
            k.push(exp[n][j]);
          }
          o['Supported Platforms'] = k.join(', ');
        } else {
          o['Experiment'] = exp[n];
        }

      }

      return o;
    }).filter(function(h) {
      return h['Supported Platforms'] !== undefined;
    });
  })();

  lastMemo['Timestamp'] = (new Date()).toDateString();
  localStorage.setItem('Experiments', JSON.stringify(lastMemo));

  console.group('New Experiments');
  console.log('Last check: ' + timeCheck);
  console.table(tabs.length > 0 ? tabs : placeholder);
  console.groupEnd('New Experiments');
}).call(this);
