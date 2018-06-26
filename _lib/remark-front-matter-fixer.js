/**
 * A remark plugin that lets you add and remove yaml frontmatter entries in markdown
 */
var visit = require("unist-util-visit");

module.exports = config => {
  let visitor = node => {
    if (node.data.parsedValue == undefined) {
      node.data.parsedValue = {};
    }

    //Add entries by defining a map for config.add
    if (config.add != undefined) {
      config.add.forEach((value, key) => {
        node.data.parsedValue[key] = value;
      });
    }

    //Remove entries by defining an array of values for config.remove
    if (config.remove != undefined) {
      config.remove.forEach(element => {
        delete node.data.parsedValue[element];
      });
    }
  };

  return tree => {
    visit(tree, "yaml", visitor);
  };
};
