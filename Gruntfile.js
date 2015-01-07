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
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      jsWebsite: {
        files: ['client/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:website'],
        options: {
          livereload: {
            port: 35729,
            // key: grunt.file.read('server.key'),
            // cert: grunt.file.read('server.pem'),
            // ca: grunt.file.read('gd_bundle.crt')
          }
        }
      },
      jsTestWebsite: {
        files: ['client/test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:website', 'karma:website']
      },
      compassWebsite: {
        files: ['client/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:website', 'autoprefixer:website']
      },
      lbclient: {
        files: [
          'client/lbclient/models/*',
          'client/lbclient/app*',
          'client/lbclient/datasources*',
          'client/lbclient/models*',
          'client/lbclient/build.js'
        ],
        tasks: ['build-lbclient'],
        options: {
          livereload: {
            port: 35729,
            // key: grunt.file.read('server.key'),
            // cert: grunt.file.read('server.pem'),
            // ca: grunt.file.read('gd_bundle.crt')
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
            port: 35729,
            // key: grunt.file.read('server.key'),
            // cert: grunt.file.read('server.pem'),
            // ca: grunt.file.read('gd_bundle.crt')
          }
        },
        files: [
          'client/{,*/}*.html',
          'client/.tmp/styles/{,*/}*.css',
          'client/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'client/lbclient/browser.bundle.js'
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
          'client/scripts/{,*/}*.js'
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
            'client/.tmp',
            'dist',
            'client/lbclient/browser.bundle.js'
          ]
        }]
      },
      server: ['client/.tmp']
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      website: {
        files: [{
          expand: true,
          cwd: 'client/.tmp/styles/',
          src: '{,*/}*.css',
          dest: 'client/.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        cwd: '.'
      },
      website: {
        src: ['client/index.html'],
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
          'bower_components/es5-shim/es5-shim.js',
          'bower_components/json3/lib/json3.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
          'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angulartics/src/angulartics-adobe.js',
          'bower_components/angulartics/src/angulartics-chartbeat.js',
          'bower_components/angulartics/src/angulartics-flurry.js',
          'bower_components/angulartics/src/angulartics-ga-cordova.js',
          'bower_components/angulartics/src/angulartics-gtm.js',
          'bower_components/angulartics/src/angulartics-kissmetrics.js',
          'bower_components/angulartics/src/angulartics-mixpanel.js',
          'bower_components/angulartics/src/angulartics-piwik.js',
          'bower_components/angulartics/src/angulartics-scroll.js',
          'bower_components/angulartics/src/angulartics-segmentio.js',
          'bower_components/angulartics/src/angulartics-splunk.js',
          'bower_components/angulartics/src/angulartics-woopra.js',
          'bower_components/angulartics/src/angulartics-cnzz.js',
          'bower_components/angulartics/src/angulartics-marketo.js',
          'bower_components/angulartics/src/angulartics-intercom.js',
          'bower_components/jquery-waypoints/waypoints.js',
          'bower_components/blueimp',
          'bower_components/jquery-file-upload/',
          'bower_components/moment/',
          'bower_components/cryptojslib/',
          'bower_components/imagesloaded/',
          'bower_components/eventEmitter/',
          'bower_components/eventie/',
          'bower_components/angular-carousel/',
          'bower_components/angular-modal-service/'
        ],
      },
      sassWebsite: {
        src: ['client/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      website: {
        options: {
          sassDir: 'client/styles',
          cssDir: 'client/.tmp/styles',
          generatedImagesDir: 'client/.tmp/images/generated',
          imagesDir: 'client/images',
          javascriptsDir: 'client/scripts',
          fontsDir: 'client/fonts',
          importPath: 'bower_components',
          httpImagesPath: 'images',
          httpGeneratedImagesPath: 'client/images/generated',
          httpFontsPath: 'fonts',
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
          apiUrl: '/api'
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
          'dist/scripts/{,*/}*.js',
          'dist/styles/{,*/}*.css',
          'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'dist/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      website: {
        options: {
          dest: 'dist'
        },
        src: ['client/index.html'],
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      'website-html': {
        options: {
          assetsDirs: ['dist','dist/images'],
          type:'html'
        },
        files: { src: ['dist/*.html'] }
      },
      'website-css': {
        options: {
          assetsDirs: ['dist','dist/images'],
          type:'css'
        },
        files: { src: ['dist/styles/{,*/}*.css'] }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'client/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: 'dist/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'client/images',
          src: '{,*/}*.svg',
          dest: 'dist/images'
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
          cwd: 'dist',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: 'dist'
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
        src: [ 'client/scripts/**/*.js', 'client/*.html', 'client/views/{,*/}*.html' ],
        lang: ['en'],
        dest: 'client/locales'
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['dist/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'client',
          dest: 'dist',
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
          cwd: 'client/.tmp/images',
          dest: 'dist/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: 'client/locales/',
          src: '**',
          dest: 'dist/locales/'
        }]
      },
      styles: {
        expand: true,
        cwd: 'client/styles',
        dest: 'client/.tmp/styles/',
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
          //'compass',
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
            PORT: 50447,
            PORT_SSL: 50337
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
            PORT: 50447,
            PORT_SSL: 50337
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
    //'loopback_sdk_angular',
    //'build-lbclient',
    'wiredep',
    'autoprefixer',
    'concurrent:nodemon_dev'
  ]);

  grunt.registerTask('prod', [
    //'build-lbclient',
    //'docular',
    'concurrent:nodemon_prod'
  ]);

  grunt.registerTask('test', [
    'testWebsite'
  ]);

  grunt.registerTask('build', [
    //'build-lbclient',
    'loopback_sdk_angular',
    'buildClients'
  ]);
};
