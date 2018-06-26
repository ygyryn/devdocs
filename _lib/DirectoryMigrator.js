var mapGenerator = require("./MapGenerator");
var replace = require("gulp-replace");
var mapRename = require("./MigrationRename");
var mdfileprocessor = require("./MigrationMarkdownFileProcessor");

module.exports = migrationConfig => {
  let mappingFile = migrationConfig.mappingFile;
  let directory = migrationConfig.directory;
  let destination = migrationConfig.destination;
  let destinationFormat = migrationConfig.destinationFormat;
  let gulp = migrationConfig.gulp;
  let rootDirectory = migrationConfig.rootDirectory;

  mapGenerator(mappingFile, map => {
    gulp
      .src(directory + "/**/*.*")
      .pipe(replace(/{{\s+page.baseurl\s+}}/g, "{{page.baseurl}}")) //Compress {{ page.baseurl }} so Jekyll URL's can be parsed
      .pipe(replace(/{{\s+(site.mage2.00url)\s+}}/g, "{{$1}}")) //Compress {{ site.mage2x00url }} entries
      .pipe(
        mdfileprocessor({
          cwd: rootDirectory,
          mapping: map
        })
      )
      .pipe(mapRename(map, directory, destinationFormat))
      .pipe(gulp.dest(destination));
  });
};
