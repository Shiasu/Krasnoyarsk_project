var gulp = require("gulp");
var less = require("gulp-less");
var sourcemaps = require("gulp-sourcemaps");
var rigger = require("gulp-rigger");
var prefixer = require("gulp-autoprefixer");
var watch = require("gulp-watch");
var del = require("del");

gulp.task("image", function(){

	return gulp.src("src/img/**")
	.pipe(gulp.dest("build/img"))
});

gulp.task("del", function(){

	return del("build/img/**")
});

gulp.task("fonts", function(){
	
	return gulp.src("src/fonts/**", {base: "src"})
	.pipe(gulp.dest("build"))
});

gulp.task("less", function(){

	return gulp.src("src/style/*.less", {base: "src"})
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(prefixer({
			overrideBrowserslist: ["last 10 versions"],
			cascade: false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("build"))
});

gulp.task("html", function() {

	return gulp.src("src/*.html")
		.pipe(rigger())
		.pipe(gulp.dest("build"))
});

gulp.task("js", function(){

	return gulp.src("src/js/*.js", {base: "src"})
		.pipe(gulp.dest("build"))
});

gulp.task("build", gulp.series("del", "image", "fonts", "less", "html", "js"));

gulp.task("watch", function(){
	gulp.watch("src/img/**/*.*", gulp.series("del", "image"))

	gulp.watch("src/style/**/*.*", gulp.series("less"))

	gulp.watch("src/**/*.html", gulp.series("html"))

	gulp.watch("src/js/*.js", gulp.series("js"))
});

gulp.task("dev", gulp.series("build", "watch"));