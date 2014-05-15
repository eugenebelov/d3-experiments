module.exports = function(grunt) {

  "use strict";

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({

    config: {
          // Configurable paths
          app: 'example',
          dist: 'dist'
    },

    meta: {
      pkg: grunt.file.readJSON("package.json"),
      srcFiles: [
        "src/template.js",
        "src/template-extensions.js"
      ]
    },
    watch: {
      scripts: {
        files: ["src/**/*.js", "example/index.html", "example/*.js"],
        tasks: ["jshint"]
      },
      js: {
          files: ['<%= config.app %>/scripts/{,*/}*.js'],
          // tasks: ['concat'],
          options: {
              livereload: true
          }
      },
      livereload: {
          options: {
              livereload: '<%= connect.options.livereload %>'
          },
          files: [
              '<%= config.app %>/{,*/}*.html',
              '<%= config.app %>/views/{,*/}*.html',
              '.tmp/styles/{,*/}*.css',
              '<%= config.app %>/images/{,*/}*'
          ]
      }
    },
    connect: {
        options: {
            port: 9000,
            livereload: 35729,
            // Change this to '0.0.0.0' to access the server from outside
            hostname: 'localhost'
        },
        livereload: {
            options: {
                open: true,
                base: [
                    '.tmp',
                    '<%= config.app %>'
                ]
            }
        },
        test: {
            options: {
                port: 9001,
                base: [
                    '.tmp',
                    'test',
                    '<%= config.app %>'
                ]
            }
        },
        dist: {
            options: {
                open: true,
                base: '<%= config.dist %>',
                livereload: false
            }
        }
    },
    jshint: {
      options: {
        curly: true,
        undef: true
      },
      chart: {
        options: {
          browser: true,
          globals: {
            d3: true
          }
        },
        files: {
          src: "<%= meta.srcFiles %>"
        }
      },
      grunt: {
        options: {
          node: true
        },
        files: {
          src: ["Gruntfile.js"]
        }
      }
    },
    concat: {
      options: {
        banner: "/*! <%= meta.pkg.name %> - v<%= meta.pkg.version %>\n" +
          " *  License: <%= meta.pkg.license %>\n" +
          " *  Date: <%= grunt.template.today('yyyy-mm-dd') %>\n" +
          " */\n"
      },
      dist: {
        files: {
          "dist/d3.chart.template.js": "<%= meta.srcFiles %>"
        }
      },
      release: {
        files: {
          "d3.chart.template.js": "<%= meta.srcFiles %>"
        }
      }
    },
    uglify: {
      options: {
        // Preserve banner
        preserveComments: "some"
      },
      dist: {
        files: {
          "dist/d3.chart.template.min.js": "dist/d3.chart.template.js"
        }
      },
      release: {
        files: {
          "d3.chart.template.min.js": "dist/d3.chart.template.js"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("work", function(target) {
    grunt.task.run([
        'connect:livereload',
        'watch'
    ]);
  });
  grunt.registerTask("default", ["jshint", "concat:dist", "uglify:dist"]);
  grunt.registerTask("release", ["jshint", "concat", "uglify"]);
};
