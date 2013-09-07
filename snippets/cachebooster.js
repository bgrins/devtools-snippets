//Cache Booster
(function (){
  var rep = /.*\?.*/,
      links = document.getElementsByTagName('link'),
      scripts = document.getElementsByTagName('script');
  for (i=0;i<links.length;i++){
    var link = links[i],
        href = link.href;
    if(rep.test(href)){
      link.href = href+'&'+Date.now();
    }
    else{
      link.href = href+'?'+Date.now();
    }

  }
  for (i=0;i<scripts.length;i++){
    var script = scripts[i],
        src = script.src;
    if(rep.test(src)){
      script.src = src+'&'+Date.now();
    }
    else{
      script.src = src+'?'+Date.now();
    }

  }
})();