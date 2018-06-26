/**
 * Parses a 2 colummn csv into a Map file
 */
var csv = require("csvtojson");

/**
 *
 * @param {string} mapfile the filename for a CSV file
 * @param {(Map)} callback
 */
module.exports = (mapfile, callback) => {
  csv({
    flatKeys: true,
    noheader: true,
    headers: ["original", "new"]
  })
    .fromFile(mapfile)
    .then(jsonObj => {
      let map = new Map();
      jsonObj.forEach(element => {
        if (element.original) {
          map.set(element.original, element.new);
        }
      });
      callback(map);
    });
};
