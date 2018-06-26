/**
 * A gulp module that updates the file name and path based on a mapping
 *
 * Unmapped entries will be moved to an '_unmapped' directory
 *
 * Entry destinations that do not have a valid destination will moved to a '_skipped' directory
 */
var rename = require("gulp-rename");
var path = require("path");

/**
 *
 * @param {Map} map
 * @param {string} baseDir
 * @param {regex} destinationFormat
 */
module.exports = (map, baseDir, destinationFormat) => {
  return rename(file => {
    let filename =
      baseDir + "/" + file.dirname + "/" + file.basename + file.extname;

    if (file.dirname === ".")
      filename = baseDir + "/" + file.basename + file.extname;

    if (map.has(filename)) {
      let destination = map.get(filename);
      if (destinationFormat.test(destination)) {
        file.dirname = path.dirname(destination);
        file.basename = path.basename(destination, ".md");
        file.extname = path.extname(destination);
      } else {
        file.dirname = "_skipped/" + file.dirname;
        console.log(
          destination + " is not a valid destination for " + filename
        );
      }
    } else {
      file.dirname = "_unmapped/" + file.dirname;
      console.error("Could not find a mapping for: " + filename);
    }
  });
};
