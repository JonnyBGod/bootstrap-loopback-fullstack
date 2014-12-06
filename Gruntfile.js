// Generated on 2014-07-04 using generator-angular 0.9.2
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
var buildClientBundle = require('./client/lbclient/build');

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bowerWebsite: {
        files: ['bower.json'],
        tasks: ['wiredep:website']
      },
      jsWebsite: {
        files: ['website/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:website'],
        options: {
          livereload: {
            port: 35729
          }
        }
      },
      jsTestWebsite: {
        files: ['website/test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:website', 'karma:website']
      },
      compassWebsite: {
        files: ['website/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:website', 'autoprefixer:website']
      },
      lbclient: {
        files: [
          'lbclient/models/*',
          'lbclient/app*',
          'lbclient/datasources*',
          'lbclient/models*',
          'lbclient/build.js'
        ],
        tasks: ['build-lbclient'],
        options: {
          livereload: {
            port: 35729
          }
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      server: {
        files: ['server/{,*/}*.{js,json}', 'common/{,*/}*.{js,json}'],
        tasks: [
          'loopback_sdk_angular',
          //'docular'
        ]
      },
      livereload: {
        options: {
          livereload: {
            port: 35729
          }
        },
        files: [
          'website/{,*/}*.html',
          'website/.tmp/styles/{,*/}*.css',
          'website/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'lbclient/browser.bundle.js'
        ]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      website: {
        src: [
          'Gruntfile.js',
          'website/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'website/.tmp',
            'client/website/{,*/}*',
            '!client/website/.git*',
            'lbclient/browser.bundle.js'
          ]
        }]
      },
      server: ['website/.tmp']
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      website: {
        files: [{
          expand: true,
          cwd: 'website/.tmp/styles/',
          src: '{,*/}*.css',
          dest: 'website/.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        cwd: ''
      },
      website: {
        //cwd:'website',
        bowerJson: './bower.json',
        directory: './bower_components/',
        src: ['/website/index.html'],
        ignorePath:  /\.\.\//,
        fileTypes: {
          html: {
            replace: {
              js: '<script src="/{{filePath}}"></script>',
              css: '<link rel="stylesheet" href="/{{filePath}}" />'
            }
          }
        },
        exclude: [
          '/bower_components/es5-shim/es5-shim.js',
          '/bower_components/json3/lib/json3.js',
          '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js',
          '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js',
          '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js',
          '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js',
          '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
          '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js',
          '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js',
          '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js',
          '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js',
          '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
          '/bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js',
          '/bower_components/angulartics/src/angulartics-adobe.js',
          '/bower_components/angulartics/src/angulartics-chartbeat.js',
          '/bower_components/angulartics/src/angulartics-flurry.js',
          '/bower_components/angulartics/src/angulartics-ga-cordova.js',
          '/bower_components/angulartics/src/angulartics-gtm.js',
          '/bower_components/angulartics/src/angulartics-kissmetrics.js',
          '/bower_components/angulartics/src/angulartics-mixpanel.js',
          '/bower_components/angulartics/src/angulartics-piwik.js',
          '/bower_components/angulartics/src/angulartics-scroll.js',
          '/bower_components/angulartics/src/angulartics-segmentio.js',
          '/bower_components/angulartics/src/angulartics-splunk.js',
          '/bower_components/angulartics/src/angulartics-woopra.js',
          '/bower_components/jquery-waypoints/waypoints.js'
        ],
      },
      sassWebsite: {
        //cwd:'website',
        bowerJson: './bower.json',
        directory: './bower_components/',
        src: ['/website/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      website: {
        options: {
          sassDir: 'website/styles',
          cssDir: 'website/.tmp/styles',
          generatedImagesDir: 'website/.tmp/images/generated',
          imagesDir: 'website/images',
          javascriptsDir: 'website/scripts',
          fontsDir: 'website/styles/fonts',
          importPath: './bower_components',
          httpImagesPath: 'website/images',
          httpGeneratedImagesPath: 'website/images/generated',
          httpFontsPath: 'website/styles/fonts',
          relativeAssets: false,
          assetCacheBuster: false,
          raw: 'Sass::Script::Number.precision = 10\n'
        }
      },
      dist: {
        options: {
          generatedImagesDir: 'client/website/images/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    loopback_sdk_angular: {
      services: {
        options: {
          input: 'server/server.js',
          output: 'client/lb-services.js',
          apiUrl: 'http://localhost:3000/'
        }
      }
    },
    docular: {
      groups: [
        {
          groupTitle: 'LoopBack',
          groupId: 'loopback',
          sections: [
            {
              id: 'lbServices',
              title: 'LoopBack Services',
              scripts: [ 'client/lb-services.js' ]
            }
          ]
        }
      ]
    },

    // Renames files for browser caching purposes
    filerev: {
      website: {
        src: [
          'client/website/scripts/{,*/}*.js',
          'client/website/styles/{,*/}*.css',
          'client/website/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'client/website/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      website: {
        options: {
          dest: 'client/website'
        },
        src: ['website/index.html'],
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      'website-html': {
        options: {
          assetsDirs: ['client/website','client/website/images'],
          type:'html'
        },
        files: { src: ['client/website/{,*/}*.html'] }
      },
      'website-css': {
        options: {
          assetsDirs: ['client/website','client/website/images'],
          type:'css'
        },
        files: { src: ['client/website/styles/{,*/}*.css'] }
      },
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'website/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: 'client/website/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'website/images',
          src: '{,*/}*.svg',
          dest: 'client/website/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'client/website',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: 'client/website'
        }]
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    i18nextract: {
      website: {
        src: [ 'website/scripts/**/*.js', 'website/**/*.html' ],
        lang: ['en'],
        dest: 'website/locales'
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['client/website/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'website',
          dest: 'client/website',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: 'client/website/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: 'website/locales/',
          src: '**',
          dest: 'client/website/locales/'
        }]
      },
      styles: {
        expand: true,
        cwd: 'website/styles',
        dest: 'website/.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      nodemon_dev: {
        options: {
          logConcurrentOutput: true,
        },
        tasks: [
          'compass',
          'nodemon:dev',
          'watch'
        ]
      },
      nodemon_prod: {
        options: {
          logConcurrentOutput: true,
        },
        tasks: [
          'nodemon:prod',
          'watch'
        ]
      },
      server: [
        'compass:server'
      ],
      dist: [
        'compass',
        'imagemin',
        'svgmin'
      ],
      test: [
        'compass'
      ]
    },

    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          args: ['development'],
          watch: ['server', 'common'],
          ignore: ['node_modules/**'],
          debug: false,
          delayTime: 1,
          env: {
            NODE_ENV: 'development',
            PORT: 3000,
            PORT_SSL: 4000
          },
          cwd: __dirname
        }
      },
      prod: {
        script: 'server/server.js',
        options: {
          args: ['production'],
          watch: ['server', 'common'],
          ignore: ['node_modules/**'],
          debug: false,
          delayTime: 1,
          env: {
            NODE_ENV: 'production',
            PORT: 3000,
            PORT_SSL: 4000
          },
          cwd: __dirname
        }
      }
    },

    // Test settings
    karma: {
      website: {
        configFile: 'website/test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('build-lbclient', 'Build lbclient browser bundle', function() {
    var done = this.async();
    buildClientBundle(process.env.NODE_ENV || 'development', done);
  });

  grunt.registerTask('buildClients', [
    'i18nextract',
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('dev', [
    'build-lbclient',
    'wiredep',
    'autoprefixer',
    'concurrent:nodemon_dev'
  ]);

  grunt.registerTask('prod', [
    'build-lbclient',
    'docular',
    'concurrent:nodemon_prod'
  ]);

  grunt.registerTask('test', [
    'testWebsite'
  ]);

  grunt.registerTask('build', [
    'build-lbclient',
    'buildClients'
  ]);
};
