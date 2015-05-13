// =======================================================================
// Gulp Plugins
// =======================================================================
var gulp = require('gulp'),
	connect = require('gulp-connect'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	jscs = require('gulp-jscs'),
	concat = require('gulp-concat'),
	streamify = require('gulp-streamify'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	less = require('gulp-less'),
	prefix = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	del = require('del'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	runSequence = require('run-sequence'),
	karma = require('karma').server;


// =======================================================================
// File Paths
// =======================================================================
var filePath = {
	build: {
		dest: './dist'
	},
	lint: {
		src: ['./app/*.js', './app/**/*.js']
	},
	browserify: {
		src: './app/app.js',
		watch: [
			'!./app/assets/libs/*.js',
			'!./app/assets/libs/**/*.js',
			'!./app/**/*.spec.js',
			'./app/*.js', './app/**/*.js',
			'/app/**/*.html'
		]
	},
	styles: {
		src: './app/app.less',
		watch: ['./app/app.less', './app/**/*.less']
	},
	images: {
		src: './app/assets/images/**/*',
		watch: ['./app/assets/images', './app/assets/images/**/*'],
		dest: './dist/images/'
	},
	fonts: {
		src: './libs/font-awesome/fonts/*',
		dest: './dist/fonts'
	},
	vendorJS: {
		src: [
			'./libs/angular/angular.js',
			'./libs/angular-animate/angular-animate.js',
			'./libs/angular-bootstrap/ui-bootstrap-tpls.js',
			'./libs/angular-cookies/angular-cookies.js',
			'./libs/angular-resource/angular-resource.js',
			'./libs/angular-sanitize/angular-sanitize.js',
			'./libs/angular-ui-router/release/angular-ui-router.js',
			'./libs/jquery/dist/jquery.js',
			'./libs/bootstrap/dist/js/bootstrap.js',
			'./libs/domready/ready.js',
			'./libs/lodash/lodash.js',
			'./libs/restangular/dist/restangular.js',
			'./libs/angular-aria/angular-aria.js',
			'./libs/angular-animate/angular-animate.js',
			'./libs/angular-material/angular-material.js',
			'./libs/angular-cookies/angular-cookies.js'
		]
	},
	vendorCSS: {
		src: [
			'./libs/bootstrap/dist/css/bootstrap.css',
			'./libs/font-awesome/css/font-awesome.css',
			'./libs/angular-material/angular-material.css'
		]
	},
	copyIndex: {
		src: './app/index.html',
		watch: './app/index.html'
	},
	copyFavicon: {
		src: './app/favicon.png'
	}
};


// =======================================================================
// Error Handling
// =======================================================================
function handleError(err, self) {
	'use strict';
	console.log(err.toString());
	self.emit('end');
}


// =======================================================================
// Server Task
// =======================================================================  
var express = require('express');
var prism = require('connect-prism');
var server = express();

// Server settings
server.use(express.static(filePath.build.dest));
// Redirects everything back to our index.html
server.all('/*', function (req, res) {
	'use strict';
	res.sendfile('/', {
		root: filePath.build.dest
	});
});

prism.create({
	name: 'mock',
	mode: 'mock',
	context: '/api',
	host: 'localhost',
	mockFilenameGenerator: 'humanReadable',
	port: 5000
});

prism.useVerboseLog();

gulp.task('server', function () {
	'use strict';
	connect.server({
		root: filePath.build.dest,
		fallback: filePath.build.dest + '/index.html',
		port: 5000,
		livereload: true,
		middleware: function (connect, o) {
			return [
				prism.middleware
			];
		}
	});
});


// =======================================================================
// Clean out dist folder contents on build
// =======================================================================  
gulp.task('clean-dev', function () {
	'use strict';
	del(['./dist/*.js', './dist/*.css', '!./dist/vendor.js', '!./dist/vendor.css', './dist/*.html', './dist/*.png', './dist/*.ico']);
});

gulp.task('clean-full', function () {
	'use strict';
	del(['./dist/*']);
});


// =======================================================================
// JSHint
// =======================================================================
gulp.task('lint', function () {
	'use strict';
	return gulp.src(filePath.lint.src)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});


// =======================================================================
// Javascript Checkstyles (JSCS)
// =======================================================================
gulp.task('checkstyle', function () {
	'use strict';
	return gulp.src(filePath.lint.src)
		.pipe(jscs())
		.on('error', function (error) {
			return handleError(error, this);
		});
});


// =======================================================================
// Browserify Bundle
// =======================================================================  

// Dev
gulp.task('bundle-dev', function () {
	'use strict';

	var b = browserify({
		entries: filePath.browserify.src,
		external: filePath.vendorJS.src,
		debug: true,
		cache: {},
		packageCache: {}
	});
	var bundler = watchify(b);

	function rebundle() {
		return bundler.bundle()
			.pipe(source('bundle.js'))
			.on('error', function (error) {
				return handleError(error, this);
			})
			.pipe(buffer())
			.pipe(sourcemaps.init({
				loadMaps: true
			}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(filePath.build.dest))
			.pipe(connect.reload());
	}

	bundler.on('update', rebundle);

	return rebundle();
});

// Prod
gulp.task('bundle-prod', function () {
	'use strict';

	var b = browserify({
		entries: filePath.browserify.src,
		external: filePath.vendorJS.src,
		debug: true,
		cache: {},
		packageCache: {}
	});
	var bundler = watchify(b);

	function rebundle() {
		return bundler.bundle()
			.pipe(source('bundle.js'))
			.on('error', handleError)
			.pipe(buffer())
			.pipe(streamify(uglify({
				mangle: false
			})))
			.pipe(gulp.dest(filePath.build.dest))
			.pipe(connect.reload());
	}

	bundler.on('update', rebundle);

	return rebundle();
});


// =======================================================================
// Styles Task
// =======================================================================  
gulp.task('styles-dev', function () {
	'use strict';
	return gulp.src(filePath.styles.src)
		.pipe(sourcemaps.init())
		.pipe(less())
		.on('error', handleError)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(filePath.build.dest))
		.on('error', handleError)
		.pipe(connect.reload());
});

gulp.task('styles-prod', function () {
	'use strict';
	return gulp.src(filePath.styles.src)
		.pipe(less())
		.on('error', handleError)
		.pipe(prefix('last 1 version', '> 1%', 'ie 8', 'ie 7', {
			map: true
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(filePath.build.dest))
		.on('error', handleError);
});


// =======================================================================
// Images Task
// =======================================================================  
gulp.task('images', function () {
	'use strict';
	return gulp.src(filePath.images.src)
		.on('error', handleError)
		.pipe(gulp.dest(filePath.images.dest))
		.pipe(connect.reload());
});


// =======================================================================
// Fonts Task
// ======================================================================= 
gulp.task('fonts', function () {
	'use strict';
	return gulp.src(filePath.fonts.src)
		.on('error', handleError)
		.pipe(gulp.dest(filePath.fonts.dest))
		.pipe(connect.reload());
});


// =======================================================================
// Vendor JS Task
// =======================================================================  
gulp.task('vendorJS', function () {
	'use strict';
	var b = browserify({
		debug: true,
		require: filePath.vendorJS.src
	});
	
	return b.bundle()
		.pipe(source('vendor.js'))
		.on('error', handleError)
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(filePath.build.dest));
});


// =======================================================================
// Vendor CSS Task
// =======================================================================  
gulp.task('vendorCSS', function () {
	'use strict';
	return gulp.src(filePath.vendorCSS.src)
		.pipe(concat('vendor.css'))
		.on('error', handleError)
		.pipe(minifyCSS())
		.pipe(gulp.dest(filePath.build.dest))
		.pipe(connect.reload());
});


// =======================================================================
// Copy index.html
// =======================================================================  
gulp.task('copyIndex', function () {
	'use strict';
	return gulp.src(filePath.copyIndex.src)
		.pipe(gulp.dest(filePath.build.dest))
		.pipe(connect.reload());
});


// =======================================================================
// Copy Favicon
// =======================================================================  
gulp.task('copyFavicon', function () {
	'use strict';
	return gulp.src(filePath.copyFavicon.src)
		.pipe(gulp.dest(filePath.build.dest));
});


// =======================================================================
// Watch for changes
// =======================================================================  
gulp.task('watch', function () {
	'use strict';
	gulp.watch(filePath.styles.watch, ['styles-dev']);
	gulp.watch(filePath.images.watch, ['images']);
	gulp.watch(filePath.vendorJS.src, ['vendorJS']);
	gulp.watch(filePath.vendorCSS.src, ['vendorCSS']);
	gulp.watch(filePath.copyIndex.watch, ['copyIndex']);
	gulp.watch(filePath.lint.src, ['checkstyle']);
	console.log('Watching...');
});


// =======================================================================
// Karma Configuration
// =======================================================================
gulp.task('karma', function (done) {
	karma.start({
		configFile: __dirname + '/karma.conf.js'
	}, done);
});


// =======================================================================
// Sequential Build Rendering
// =======================================================================

// run "gulp" in terminal to build the DEV app
gulp.task('build-dev', function (callback) {
	'use strict';
	runSequence(
		['clean-dev', 'lint', 'checkstyle'],
		// images and vendor tasks are removed to speed up build time. Use "gulp build" to do a full re-build of the dev app.
		['bundle-dev', 'styles-dev', 'copyIndex', 'copyFavicon'],
		['server', 'watch'],
		callback
	);
});

// run "gulp test" in terminal to build the DEV app
gulp.task('build-test', function (callback) {
	'use strict';
	runSequence(
		['build-dev'],
		['karma'],
		callback
	);
});

// run "gulp prod" in terminal to build the PROD-ready app
gulp.task('build-prod', function (callback) {
	'use strict';
	runSequence(
		['clean-full', 'lint', 'checkstyle'],
		['bundle-prod', 'styles-prod', 'images', 'fonts', 'vendorJS', 'vendorCSS', 'copyIndex', 'copyFavicon'],
		['server'],
		callback
	);
});

// run "gulp build" in terminal for a full re-build in DEV
gulp.task('build', function (callback) {
	'use strict';
	runSequence(
		['clean-full', 'lint', 'checkstyle'],
		['bundle-dev', 'styles-dev', 'images', 'fonts', 'vendorJS', 'vendorCSS', 'copyIndex', 'copyFavicon'],
		['server', 'watch'],
		callback
	);
});

gulp.task('default', ['build-dev']);
gulp.task('test', ['build-test']);
gulp.task('prod', ['build-prod']);