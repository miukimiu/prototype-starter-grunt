'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Watch for changes and trigger compass and livereload
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      compass: {
        files: ['sass/{,**/}*.scss'],
        tasks: ['compass:dev']
      },
      includes: {
        files: ['pages/*', 'pages/**/*'],
        tasks: ['includes']
      },
      scripts: {
        files: ['assets/js/**/*.js', 'javascriptfiles.json'],
        tasks: ['uglify:header', 'uglify:footer'],
        options: {
          interrupt: false,
        }
      },
      vendor: {
        files: ['assets/js/vendor/*.js', 'javascriptfiles.json'],
        tasks: ['uglify:vendor'],
        options: {
          interrupt: false,
        }
      }
    },

    // Grunt Includes
    // https://www.npmjs.org/package/grunt-includes
    includes: {
      files: {
       src: ['pages/*.html'], // Source files
       dest: 'web', // Destination directory
       flatten: true,
       cwd: '.',
       options: {
        includePath: 'pages/includes/'
       }
     }
    },

    // Grunt Contrib Compass
    // https://github.com/gruntjs/grunt-contrib-compass
    compass: {
      options: {
        sassDir: 'sass',
        cssDir: 'assets/css'
      },
      dev: {
        options: {
          environment: 'development',
          outputStyle: 'expanded',
          importPath: 'node_modules/bootstrap-sass',
        }
      },
      dist: {
        options: {
          environment: 'production',
          outputStyle: 'compact',
        }
      },
    },

  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-includes');

  grunt.registerTask('default', [
    'uglify',
    'compass:dev',
    'includes',
    'watch'
  ]);

};
