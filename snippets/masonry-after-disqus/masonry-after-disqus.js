<div id="disqus_thread"></div>
<script src="//cdnjs.cloudflare.com/ajax/libs/masonry/3.3.2/masonry.pkgd.min.js"></script>
<script>
/**
 * load masonry first
 * working demo https://englishextra.github.io/pages/contents.html
 */
var disqus_shortname = "englishextragithubio";
(function (a) {
	a && (a = document.createElement("script"), a.type = "text/javascript", a.async = !0, a.src = ("https:" == window.location.protocol ? "https" : "http") + "://" + disqus_shortname + ".disqus.com/embed.js", (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(a))
}
	(document.getElementById("disqus_thread") || ""));
var disqus_editable = !0;
setInterval(function () {
	var a = document.getElementById("disqus_thread") || "";
	if (a && disqus_editable && 108 < (a.clientHeight || a.offsetHeight || "")) {
		disqus_editable = !1;
		var a = window,
		b = document,
		c = Masonry;
		a.Masonry && (b = b.querySelector(".grid") || "") && (msnry = new c(b, {
					itemSelector : ".grid-item",
					columnWidth : ".grid-sizer"
				}))
	}
}, 100);

</script>
