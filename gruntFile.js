module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', [
    'clean:build',
    'copy:misc',
    'copy:src',
    'copy:vendor',
    'less',
    'clean:less',
    'html2js',
    'htmlbuild:build'
  ]);
  
  grunt.registerTask('release', [
    'build',
    'karma',
    'copy:release',
    'concat:misc',
    'concat:src',
    'htmlbuild:release'
  ]);
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      less: {
        src: [
          ['build/css/**/*.less']
        ]
      },
      build: {
        src: [
          ['build/*']
        ]
      },
    },
    copy: {
      misc:{
        files: [
          {expand: true, flatten: true, src: ['misc/**/*.js'], dest: 'build/js', filter: 'isFile'},
          {expand: true, flatten: true, src: ['misc/**/img/*'], dest: 'build/img', filter: 'isFile'},
          {expand: true, flatten: true, src: ['misc/**/*.less'], dest: 'build/css', filter: 'isFile'},
          {expand: true, flatten: true, src: ['misc/**/fonts/*'], dest: 'build/fonts', filter: 'isFile'},
        ]
      },
      src:{
        files: [
          {expand: true, flatten: true, src: ['src/**/*.js'], dest: 'build/js', filter: 'isFile'},
          {expand: true, flatten: true, src: ['src/**/img/*'], dest: 'build/img', filter: 'isFile'},
          {expand: true, flatten: true, src: ['src/**/*.less'], dest: 'build/css', filter: 'isFile'},
          {expand: true, flatten: true, src: ['src/**/fonts/*'], dest: 'build/fonts', filter: 'isFile'},
        ]
      },
      vendor:{
        files: [
          {expand: true, flatten: true, src: ['vendor/angular/angular.js'], dest: 'build/js'},
          {expand: true, flatten: true, src: ['vendor/angular-resource/angular-resource.js'], dest: 'build/js/'},
          {expand: true, flatten: true, src: ['vendor/angular-route/angular-route.js'], dest: 'build/js/'},
          {expand: true, flatten: true, src: ['vendor/bootstrap/less/*'], dest: 'build/css', filter: 'isFile'},
          {expand: true, flatten: true, src: ['vendor/bootstrap/fonts/*'], dest: 'build/fonts', filter: 'isFile'},
        ]
      },
      release:{
        files: [
          {expand: true, flatten: true, src: ['build/css/*'], dest: 'release/css'},
          {expand: true, flatten: true, src: ['build/fonts/*'], dest: 'release/fonts'},
        ]
      },
    },
    html2js: {
      misc: {
        options: {
          base: 'misc/'
        },
        src: ['misc/**/*.tpl.html'],
        dest: 'build/js/app-tpls.js',
        module: 'app.tpls'
      },
      src: {
        options: {
          base: 'src/'
        },
        src: ['src/**/*.tpl.html'],
        dest: 'build/js/stackoverflow-activity-tpls.js',
        module: 'stackoverflow.activity.tpls'
      }  
    },
    concat:{
      misc:{
        src:[
            'build/js/angular.js',
            'build/js/angular-resource.js',
            'build/js/angular-route.js',
            'build/js/app-tpls.js',
            'build/js/app.js',
             ],
        dest:'release/js/app.js'
      },
      src:{
        src:[
            'build/js/stackoverflow-activity.js',
            'build/js/stackoverflow-activity-tpls.js',
             ],
        dest:'release/js/stackoverflow-activity.js'
      },
    },
    htmlbuild: {
      build: {
        src: 'misc/index.html',
        dest: 'build',
        options: {
          prefix: '/',
          relative: true,
          styles: {
            bundle: [
              'build/css/app.css',
              'build/css/stackoverflow-activity.css',
            ]
          },
          scripts: {
            bundle: [
            'build/js/angular.js',
            'build/js/angular-resource.js',
            'build/js/angular-route.js',
            'build/js/stackoverflow-activity.js',
            'build/js/stackoverflow-activity-tpls.js',
            'build/js/app-tpls.js',
            'build/js/app.js',
            ]
          },
        }
      },
      release: {
        src: 'misc/index.html',
        dest: 'release',
        options: {
          prefix: '/',
          relative: true,
          styles: {
            bundle: [
              'release/css/app.css',
              'release/css/stackoverflow-activity.css',
            ]
          },
          scripts: {
            bundle: [
              'release/js/app.js',
              'release/js/stackoverflow-activity.js',
            ]
          },
        }
      }
    },
    less: {
      misc:{
        options: {
          yuicompress: true,
        },
        files: {
          'build/css/app.css': 'build/css/app.less'
        }
      },
      src:{
        options: {
          yuicompress: true,
        },
        files: {
          'build/css/stackoverflow-activity.css': 'build/css/stackoverflow-activity.less'
        }
      },
    },
    watch: {
      build: {
        files: ['misc/**/*','src/**/*'],
        tasks: [
          'build'
        ]
      },
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });
};