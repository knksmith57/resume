'use strict';
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    server: '.tmp'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      options: {
        nospawn: true
      },
      markdown: {
        files: ['<%= yeoman.app %>/*.md'],
        tasks: ['markdown']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/main.scss'],
        tasks: ['compass:server', 'concat:server']
      },
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      },
      server: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.server)
            ];
          }
        }
      }
    },
    open: {
      server: {
        // no index.html file, so force open resume.html instead
        path: 'http://localhost:<%= connect.options.port %>/resume.html'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*',
            '<%= yeoman.app %>/resume.html',
            '<%= yeoman.app %>/styles/*.css'
          ]
        }]
      },
      server: '.tmp'
    },
    markdown: {
      all: {
        files: [{
          expand: true,
          src: '<%= yeoman.app %>/*.md',
          ext: '.html'
        }],
        options: {
          template: '<%= yeoman.app %>/index.jst'
        }
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        specify: '<%= yeoman.app %>/styles/main.scss',
        cssDir: '<%= yeoman.app %>/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        relativeAssets: false
      },
      dist: {
        options: {}
      },
      server: {
        options: {
          debugInfo: true,
        }
      }
    },
    concat: {
      dist: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        dest: '<%= yeoman.dist %>/styles/main.css'
      },
      server: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        dest: '<%= yeoman.server %>/styles/main.css'
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      options: {
        dest: '<%= yeoman.dist %>'
      },
      html: '<%= yeoman.app %>/index.html'
    },
    usemin: {
      options: {
        dirs: ['<%= yeoman.dist %>']
      },
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: '<%= yeoman.dist %>/styles/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= yeoman.dist %>/styles/',
        ext: '.css'
      }
    },
    htmlmin: {
      dist: {
        options: {
          // collapseWhitespace: true,
          removeComments: true,
          removeCommentsFromCDATA: false
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/*',
            '*.pdf'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      server: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.server %>',
          src: [
            '.htaccess',
            '*.html',
            '*.pdf'
          ]
        }]
      }
    },
    concurrent: {
      server: [
        'compass:server'
      ],
      dist: [
        'compass:dist',
        'htmlmin'
      ]
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'markdown',
      'concurrent:server',
      'concat:server',
      'copy:server',
      'connect:server',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'markdown',
    'useminPrepare',
    'concurrent:dist',
    'concat:dist',
    'cssmin',
    'copy:dist',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
