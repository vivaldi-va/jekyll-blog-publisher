'use strict';

module.exports = function (grunt) {
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);
	require('jit-grunt')(grunt, {
		injector: 'grunt-asset-injector'
	});

	var ports = {
		devServ: 5000,
		prodServ: 5001,
		liveReload: 35729
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		paths: {
			dev: require('./bower.json').appPath || 'dev',
			dist: 'dist',
			srv: 'lib'
		},
		watch: {
			injectJS: {
				files: [
					'<%= paths.dev %>/{app,components}/**/*.js',
					'!<%= paths.dev %>/{app,components}/**/*.{spec,mock}.js',
					'!<%= paths.dev %>/app/app.js'],
				tasks: ['injector:scripts']
			},
			injectSass: {
				files: [
					'<%= paths.dev %>/{app,components,styles}/**/*.{scss,sass}'],
				tasks: ['injector:sass', 'sass:watch', 'autoprefixer']
			},
			injectBowerComponents: {
				files: [
					'bower.json'
				],
				tasks: ['wiredep']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			//livereload: {
			//	files: [
			//		'{.tmp,<%= paths.dev %>}/{app,components}/**/*.css',
			//		'{.tmp,<%= paths.dev %>}/{app,components}/**/*.html',
			//		'{.tmp,<%= paths.dev %>}/{app,components}/**/*.js',
			//		'!{.tmp,<%= paths.dev %>}{app,components}/**/*.spec.js',
			//		'!{.tmp,<%= paths.dev %>}/{app,components}/**/*.mock.js',
			//		'<%= paths.dev %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
			//	],
			//	options: {
			//		livereload: true
			//	}
			//}
		},
		connect: {
			options: {
				port: ports.devServ,
				livereload: ports.liveReload,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					middleware: function (connect) {
						return [
							connect.static('.tmp'),
							connect().use(
								'/bower_components',
								connect.static('dev/bower_components')
							),
							connect.static('dev')
						];
					}
				}
			},
			dist: {
				options: {
					port: ports.prodServ,
					open: true,
					base: [
						'<%= paths.dist %>'
					]
				}
			}
		},
		clean: {
			dist: {
				files: [
					{
						dot: true,
						src: [
							'<%= paths.dist %>/*',
							// Running Jekyll also cleans the target directory.  Exclude any
							// non-standard `keep_files` here (e.g., the generated files
							// directory from Jekyll Picture Tag).
							'!<%= paths.dist %>/.git*'
						]
					}
				]
			},
			server: [
				'.tmp'
			]
		},
		sass: {
			options: {
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= paths.dev %>/app',
						src: 'app.scss',
						dest: '.tmp/public',
						ext: '.css'
					}
				]
			},
			watch: {
				files: [
					{
						expand: true,
						cwd: '<%= paths.dev %>/app',
						src: 'app.scss',
						dest: '.tmp/app',
						ext: '.css'
					}
				]
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: '.tmp',
						src: '**/*.css',
						dest: '.tmp'
					}
				]
			}
		},
		concurrent: {
			server: [
				'sass:watch'
			],

			// TODO: dist will include image optimization eventually
			dist: [
				'sass:dist'
			]
		},
		// Allow the use of non-minsafe AngularJS files. Automatically makes it
		// minsafe compatible so Uglify does not destroy the ng references
		ngAnnotate: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '.tmp/concat',
						src: '*/**.js',
						dest: '.tmp/concat'
					}
				]
			}
		},
		// Automatically inject Bower components into the dev
		wiredep: {
			target: {
				src: '<%= paths.dev %>/index.html',
				ignorePath: '<%= paths.dev %>/',
				exclude: [
					/bootstrap-sass-official/,
					/bootstrap.js/,
					'/json3/',
					'/es5-shim/',
					/bootstrap.css/,
					/font-awesome.css/,
					/cryptojslib/,
					/angular-mocks/
				]
			}
		},
		injector: {
			options: {

			},
			// Inject application script files into index.html (doesn't include bower)
			scripts: {
				options: {
					transform: function (filePath) {
						filePath = filePath.replace('/dev/', '');
						filePath = filePath.replace('/.tmp/', '');
						return '<script src="' + filePath + '"></script>';
					},
					starttag: '<!-- injector:js -->',
					endtag: '<!-- endinjector -->'
				},
				files: {
					'<%= paths.dev %>/index.html': [
						[
							'{.tmp,<%= paths.dev %>}/{app,components}/**/*.js',
							'!{.tmp,<%= paths.dev %>}/app/app.js',
							'!{.tmp,<%= paths.dev %>}/{app,components}/**/*.spec.js',
							'!{.tmp,<%= paths.dev %>}/{app,components}/**/*.mock.js'
						]
					]
				}
			},

			// Inject component scss into app.scss
			sass: {
				options: {
					transform: function (filePath) {
						filePath = filePath.replace('/dev/app/', '');
						filePath = filePath.replace('/dev/components/', '../components/');
						filePath = filePath.replace('/dev/styles/', '../styles/');
						return '@import \'' + filePath + '\';';
					},
					starttag: '// injector',
					endtag: '// endinjector'
				},
				files: {
					'<%= paths.dev %>/app/app.scss': [
						'<%= paths.dev %>/{app,components,styles}/**/*.{scss,sass}',
						'!<%= paths.dev %>/app/app.{scss,sass}'
					]
				}
			}
		},
		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= paths.dev %>',
						dest: '<%= paths.dist %>/public',
						src: [
							'*.{ico,png,txt}',
							'.htaccess',
							'**/*.html',
							'assets/images/{,*/}*.{svg,jpg,png}',
							'!bower_components/**/*'
						]
					},
					{
						expand: true,
						cwd: '<%= paths.srv %>',
						dest: '<%= paths.dist %>/lib',
						src: [
							'**/*'
						]
					},
					{
						expand: true,
						cwd: './',
						dest: '<%= paths.dist %>',
						src: [
							'package.json',
							'Procfile'
						]
					},
					{
						expand: true,
						cwd: '<%= paths.dev %>/fonts',
						dest: '<%= paths.dist %>/public/fonts',
						src: [
							'*'
						]
					},
				]
			},
			styles: {
				expand: true,
				cwd: '<%= paths.dev %>',
				dest: '.tmp/',
				src: ['{app,components}/**/*.css']
			},
			fonts: {
				expand: true,
				flatten: true,
				filter: 'isFile',
				cwd: '<%= paths.dev %>/bower_components',
				dest: '<%= paths.dev %>/fonts',
				src: ['**/*.{eot,svg,woff,woff2}']
			}
		},
		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= paths.dist %>/public/{,*/}*.js',
						'<%= paths.dist %>/public/{,*/}*.css',
						'<%= paths.dist %>/public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= paths.dist %>/public/fonts/*',
					]
				}
			}
		},
		useminPrepare: {
			html: '<%= paths.dev %>/index.html',
			options: {
				dest: '<%= paths.dist %>/public'
			}
		},

		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin: {
			html: ['<%= paths.dist %>/public/{,*/}*.html'],
			css: ['<%= paths.dist %>/public/{,*/}*.css'],
			js: ['<%= paths.dist %>/public/{,*/}*.js'],
			options: {
				assetsDirs: [
					'<%= paths.dist %>',
					'<%= paths.dist %>/images'
				],
				patterns: {
					js: [
						[/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
					]
				}
			}
		},
		// Test settings
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		},
		mochaTest: {
			units: {
				options: {
					ui: 'bdd',
					reporter: 'list',
					require: ['./test/helpers/chai']
				},
				src: ['./lib/**/*.unit.js']
			},
			specs: {
				options: {
					ui: 'bdd',
					reporter: 'spec',
					require: ['./test/helpers/chai']
				},
				src: ['./lib/**/*.spec.js']
			}
		},
		buildcontrol: {
			options: {
				dir: 'dist',
					commit: true,
					push: true,
					connectCommits: false,
					message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
			},
			heroku: {
				options: {
					remote: 'git@heroku.com:moniblogeditor.git',
					branch: 'master'
				}
			}
		}
	});

	grunt.registerTask('inject', [
		'injector',
		'wiredep'
	]);

	grunt.registerTask('b', [
		'clean:server',
		'inject',
		'concurrent:server',
		'newer:copy:fonts',
		'autoprefixer'
	]);

	grunt.registerTask('serve', [
		'clean:server',
		'injector:sass',
		'concurrent:server',
		'injector',
		'wiredep',
		'autoprefixer',
		'connect:livereload',
		'watch'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'injector:sass',
		'concurrent:dist',
		'injector',
		'wiredep',
		'useminPrepare',
		'autoprefixer',
		'concat',
		'ngAnnotate',
		'copy:dist',
		'cssmin',
		'uglify',
		//'rev',
		'usemin'
	]);

	grunt.registerTask('deploy', [
		'build',
		'buildcontrol:heroku'
	]);
};