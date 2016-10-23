module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        expand: true,
        cwd: 'dist/assets',
        src: ['<%= pkg.name %>.js'],
        dest: 'dist/assets',
        ext: '.min.js',
        extDot: 'last'
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**/*.css', '!**/*.min.css'],
          dest: 'dist',
          ext: '.min.css'
        }]
      }
    },
    concat: {
        options:{
          stripBanners: true,
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n' +
            '(function(window, angular){\n\n',
          footer: '\n\n}(window, window.angular));'
        },
        ng: { 
            src: [
              'build/restak.module.js', // must be first
              'build/restak.routes.js', // must be first
              'build/templates.js',
              'build/services/**/*.js',
              'build/controllers/**/*.js',
              'build/directives/**/*.js'              
            ],
            dest: 'dist/assets/<%= pkg.name %>.js'
        }
    },
    ngAnnotate: {
      options: {
          singleQuotes: true
      },
      app: {
        files: [
            {
                cwd: 'src',
                expand: true,
                src: ['**/*.js', '!**/*.spec.js'],
                dest: 'build/',
                ext: '.js',     // Dest filepaths will have this extension.
                extDot: 'last'  // Extensions in filenames begin after the last dot
            }
        ]
      }      
    },
    ngtemplates:  {
      app:        {
        cwd:      'src',
        src:      '**/*.html',
        dest:     'build/templates.js',
        options:    {
          htmlmin:  { 
            collapseWhitespace: true, 
            collapseBooleanAttributes: true 
          },
          bootstrap: function(module, script) {
            return 'angular.module(\'restak\').run([\'$templateCache\', function($templateCache) { ' + script + ' }]);';
          }
        }
      }
    },
    copy: {
      'dist': {
        files: [          
          { cwd: 'build/css', src: ['**/*.css'], dest: 'dist/assets', expand: true },
          { cwd: 'src', src: ['scss/**/**.scss'], dest: 'dist/assets', expand: true}
        ]
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          loadPath: [
            'node_modules/bootstrap-sass/assets/stylesheets'
          ]
        },
        files: {
          'build/css/<%= pkg.name %>.css': 'src/scss/app.scss'
        }
      }
    },
    clean: {
      options: { force: true },
      build: ['build', 'dist'],
      'test-results': ['test-results']
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      unit: {
        // run tests once instead of continuously
        singleRun: true
      }
    }
  });
  
  // Load plugins
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ng-annotate');
  
  grunt.registerTask('default', ['clean', 'sass', 'ngAnnotate', 'ngtemplates', 'concat', 'copy:dist', 'cssmin', 'uglify']);

};