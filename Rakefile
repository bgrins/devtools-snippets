require 'kramdown'

task :build do

    text = File.read("Readme.md")
    krammed = Kramdown::Document.new(text).to_html

    cmd = "pygmentize -f html " + "snippets/allcolors.js"
    content = `#{cmd}`

    template = File.read("template.html");
    regex = /<!-- REPLACE -->/

    all_files = Dir["snippets/**/**"]

    print all_files
    File.open("index.html", "w") do |io|
        io.write template.gsub(regex, krammed + content)
    end
end

=begin
# <div class="snippet" data-src="snippets/jquerify.js"></div>

task :deploy do
    system "git checkout gh-pages"
    system "git merge master"

    Rake::Task["build"].execute

    system "git commit -am 'Deploying to gh-pages'"
    system "git status"

    system "git push origin gh-pages"
    system "git checkout master"
end

task :build do
    FileUtils.cd(File.dirname(__FILE__))
    replace_snippets('snippets.html', 'index.html')
end

def replace_snippets(infile, outfile)

    doc = Nokogiri::HTML( File.read(infile) )
    doc.css("div.snippet").each do |div|
        cmd = "pygmentize -f html " + div.attr("data-src")
        content = `#{cmd}`
        div.inner_html = content
    end

    renderedhtml = doc.to_html()

    File.open(outfile, "w") do |io|
        io.write renderedhtml
    end
end
=end
task :default => [:build]
