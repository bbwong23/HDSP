module.exports = function (grunt) {

    grunt.initConfig({

        // check all js files for errors
        jshint: {
            all: ['public/app/**/*.js']
        },
        // take all the js files and minify them into app.min.js
        uglify: {
            build: {
                files: {
                    'public/dist/js/app.min.js': ['public/app/common/**/*.js', 'public/app/common/*.js', 'public/app/*.js']
                }
            }
        },
        // process the less file to style.css
        less: {
            build: {
                files: {
                    'public/dist/css/style.css': 'public/src/css/style.less'
                }
            }
        },
        // take the processed style.css file and minify
        cssmin: {
            build: {
                files: {
                    'public/dist/css/style.min.css': 'public/dist/css/style.css'
                }
            }
        },
        // watch css and js files and process the above tasks
        // configure watch to auto update ----------------
        watch: {

            // for stylesheets, watch css and less files 
            // only run less and cssmin 
            stylesheets: {
                files: ['src//*.css', 'src//*.less'],
                tasks: ['less', 'cssmin']
            },

            // for scripts, run jshint and uglify 
            scripts: {
                files: ['public/app/common/**/*.js', 'public/app/common/*.js', 'public/app/*.js'], tasks: ['jshint', 'uglify']
            }
        },
        // configure nodemon
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        // run watch and nodemon at the same time
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }

    });

    // load tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'concurrent']);

};