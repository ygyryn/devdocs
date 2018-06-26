/**
 * A unified plugin that replaces old links to new links based on a mapping
 */
var visit = require("unist-util-visit");

var jekyllLinks = options => {
  options = options || {};

  let mapping = options.mapping;

  let jekyllLinkRegex = /^{{page.baseurl}}\/(.*?)\.html(.*?)$/;

  let transformer = tree => {
    visit(tree, ["link", "definition"], visitor);
  };

  let visitor = node => {
    matches = jekyllLinkRegex.exec(node.url);
    if (matches) {
      let source = matches[1] + ".md";
      let replacement = mapping.get(source);
      if (replacement) {
        node.url =
          "{{page.baseurl}}/" +
          replacement.replace(/\.md$/, ".html") +
          matches[2];
      }
    }
  };

  return transformer;
};

module.exports = jekyllLinks;
