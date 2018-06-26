/**
 * A gulp module that processes a markdown file for migration
 */
var Transform = require("stream").Transform;
var path = require("path");
var frontmatter = require("remark-frontmatter");
var unified = require("unified");
var parse = require("remark-parse");
var stringify = require("remark-stringify");
var parseFrontMatter = require("remark-parse-yaml");
var attr = require("remark-attr");
var jekyllLinks = require("./jekyll-links");

var frontMatterFixer = require("./remark-front-matter-fixer");

module.exports = config => {
  var MarkdownFileProcessor = new Transform({ objectMode: true });

  /**
   *
   * @param {Buffer|string} file
   * @param {string=} encoding
   * @param {function(Error, object)} callback
   */
  MarkdownFileProcessor._transform = (file, encoding, callback) => {
    console.log("Processing: "+file.path);
    let error = null;

    if(!/\.md$/.test(file.path)){
      callback(error, file)
      return;
    }

    let name = path.basename(file.path);

    content = file.contents.toString();

    // Add redirect from old path
    let frontMatterFixerConfig = {
      add: new Map([
        [
          "redirect_from",
          "/" + path.relative(config.cwd, file.path).replace(/\.md$/, ".html")
        ]
      ]),
      remove: ["subgroup", "menu_title", "menu_order", "menu_node", "version", "level3_subgroup"]
    };

    // Calculate and add new github link
    let githubLink = config.mapping.get(path.relative(config.cwd, file.path));
    let destinationFormat = /\.md$/;

    if (destinationFormat.test(githubLink)) {
      frontMatterFixerConfig.add.set("github_link", githubLink);
    } else {
      frontMatterFixerConfig.remove.push("github_link");
    }

    // Parse markdown and apply plugins
    let result = unified()
      .use(parse)
      .use(stringify, {
        fence: "`",
        fences: true,
        bullet: "*",
        gfm: false
      })
      .use(jekyllLinks, {
        mapping: config.mapping
      })
      .use(frontmatter)
      .use(parseFrontMatter)
      .use(attr)
      .use(frontMatterFixer, frontMatterFixerConfig)
      .processSync(content);

    // Set file content to transpiled content
    let newContents = result.contents;

    file.contents = new Buffer(newContents, "utf8");

    callback(error, file);
  };
  return MarkdownFileProcessor;
};
