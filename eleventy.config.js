// Eleventy config. Sources keep the Jekyll layout: _posts/<lang>/, _includes/, _layouts/, _data/.
import * as yaml from "js-yaml";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import site from "./_data/site.js";
import * as lib from "./lib/blog.js";

export default function (cfg) {
  cfg.addDataExtension("yml", (s) => yaml.load(s));
  cfg.addPassthroughCopy("assets");
  // The dev server's emulated passthrough serves empty files under pathPrefix: really copy them.
  cfg.setServerPassthroughCopyBehavior("copy");
  cfg.addPlugin(syntaxHighlight, { preAttributes: { tabindex: 0 } });

  // Markdown close to kramdown (GFM): raw HTML, smart quotes, ids on headings.
  const md = markdownIt({ html: true, typographer: true, linkify: false })
    .use(markdownItAnchor, { slugify: lib.slug, tabIndex: false });
  cfg.setLibrary("md", md);

  // Liquid as in Jekyll: {% include animations/x.html lang=page.lang %} gives include.lang.
  cfg.setLiquidOptions({ jekyllInclude: true, dynamicPartials: false, timezoneOffset: 0 });
  // Posts pass `lang=page.lang`; in Eleventy front matter is not under `page`.
  cfg.addPreprocessor("jekyll-page-vars", "md", (data, content) => content.replace(/\bpage\.lang\b/g, "lang"));

  // Jekyll filters still used in posts, plus the blog's own.
  const prefix = site.baseurl.replace(/\/$/, "");
  const rel = (p = "/") => (/^[a-z]+:/i.test(p) ? p : prefix + (p.startsWith("/") ? p : "/" + p));
  cfg.addFilter("relative_url", rel);
  cfg.addFilter("absolute_url", (p) => site.url + rel(p));
  cfg.addFilter("date_to_xmlschema", (d) => new Date(d).toISOString());
  cfg.addFilter("xml_escape", lib.escape);
  cfg.addFilter("json", (v) => JSON.stringify(v));
  for (const [name, fn] of Object.entries(lib.filters)) cfg.addFilter(name, fn);

  // Collections: posts_<lang> (newest first), and the derived pages (players, months, lengths).
  for (const l of site.languages) {
    cfg.addCollection(`posts_${l}`, (api) => lib.sortPosts(api.getFilteredByGlob(`_posts/${l}/*.md`)));
  }
  cfg.addCollection("playerPages", (api) =>
    site.languages.flatMap((l) => lib.playerPages(lib.sortPosts(api.getFilteredByGlob(`_posts/${l}/*.md`)), l)));
  cfg.addCollection("refs", (api) => lib.refMap(api.getAll()));

  return {
    dir: { input: ".", includes: "_includes", layouts: "_layouts", data: "_data", output: "_site" },
    pathPrefix: site.baseurl,
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    templateFormats: ["md", "html", "liquid"],
  };
}
