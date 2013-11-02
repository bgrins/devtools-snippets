require 'kramdown'

task :build do

    template = File.read("template.html");
    regex = /<!-- REPLACE -->/
    link_regex = /<!-- REPLACELINKS -->/

    markup = ""
    all_folders = Dir["snippets/**/"]
    all_links = []

    all_folders.drop(1).each do |folder|
        file = folder.split("/")[1];
        js_file = "#{folder}#{file}.js";
        print "hello " + folder + file + "\n"

        readme = File.read(folder + "Readme.md")
        krammed = Kramdown::Document.new(readme).to_html

        cmd = "pygmentize -f html " + js_file
        pretty_code = `#{cmd}`

        all_links.push("<li><a href='##{file}'>#{file}</a></li>")
        new_heading = "<h3><a href='https://github.com/bgrins/devtools-snippets/tree/master/#{js_file}'>#{file}.js</a> <a href='##{file}'>#</a> &nbsp; <small style='float:right'><a href='#{js_file}'>(view raw)</a></small></h3>"
        krammed = krammed.gsub(/<h3.*<\/h3>/, new_heading);
        krammed = krammed.gsub(/\"#{file}/, "\"#{folder}#{file}");
        krammed = "<div class='snippet'>" + krammed + "</div>";
        markup = markup + "<div class='snippet-wrapper' id='" + file + "'>" + krammed + pretty_code + "</div>"
    end

    File.open("index.html", "w") do |io|
        with_markup = template.gsub(regex, markup)
        io.write with_markup.gsub(link_regex, all_links.join("\n"))
    end

end

# Migration:
# mkdir snippets/wrapelement; mv snippets/wrapelement.js snippets/wrapelement; mv screenshots/wrapelement.* snippets/wrapelement; touch snippets/wrapelement/README.md;

task :default => [:build]
