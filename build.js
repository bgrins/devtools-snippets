#!/usr/bin/env node

var marked = require('marked');
var glob = require('glob');
var path = require('path');
var fs = require('fs');

var snippetsFolder = './snippets',
    templatePath = './template.html',
    githubProjectPage = 'https://github.com/bgrins/devtools-snippets';

// use highlight.js
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});


function build() {
    var links = [];
    var json = {
        snippets: []
    };
    var html = '';
    glob(snippetsFolder + "/**/*.js", {}, function (er, files) {

      files.forEach(function(filePath) {

        var filename = path.basename(filePath, path.extname(filePath)),
            foldername = path.basename(path.dirname(filePath)),
            readmePath = path.dirname(filePath) + '/README.md',
            snippetCode = fs.readFileSync(filePath).toString(),
            readmeHTML = marked(fs.readFileSync(readmePath).toString()),
            // we need to escape $ for javascript replace function
            codeHTML = marked('```js\n' + snippetCode.replace(/\$/g, '$$$$') + '```');

        // create heading with correct links
        var newHeading = "<h3>" +
                            "<a href='" + githubProjectPage + "/tree/master/snippets/" + foldername + "/" + filename + ".js'>" +
                            filename + ".js</a> " +
                            "<small style='float:right'>" +
                                "<a href='snippets/" + foldername + "/" + filename + ".js'>(view raw)</a>" +
                            "</small>" +
                         "</h3>\n\n";

        // replace heading with links + wrap
        readmeHTML = "<div class='snippet'>" + readmeHTML.replace(/<h3.*<\/h3>/, newHeading) + "</div>";
        readmeHTML = readmeHTML.replace(new RegExp('"' + filename, "g"), "\"snippets/" + foldername + "/" + filename );

        // wrap doc + code
        var snippetHTML = "<div class='snippet-wrapper' id='" + filename + "'>" +
                            readmeHTML +
                            codeHTML +
                          "</div>";

        // add to global HTML
        html += snippetHTML;

        // add link for the TOC
        links.push("<li><a href='#" + filename + "'>" + filename + "</a></li>");

        // add to the JSON
        json.snippets.push({
            "name": filename,
            "content": snippetCode
        });

      });

      // fill the tempalte blocks
      var template = fs.readFileSync(templatePath).toString();
      template = template.replace('<!-- REPLACELINKS -->', links.join('\n'));
      template = template.replace('<!-- REPLACE -->', html);

      fs.writeFile('index.html', template, function (err) {
        if (err) throw err;
        console.log('[+] index.html updated');
      });

      fs.writeFile('snippets.json', JSON.stringify(json, null, '  '), function (err) {
        if (err) throw err;
        console.log('[+] snippets.json updated');
      });

    });

}


build();
