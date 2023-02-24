// Main module
import gulp from "gulp";
// Import pathes
import { path } from "./gulp/config/path.js";
// Import general plugins
import { plugins } from "./gulp/config/plugins.js";

// Passing objects to global variable
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Import tasks
import { copy } from "./gulp/task/copy.js";
import { reset } from "./gulp/task/reset.js";
import { html } from "./gulp/task/html.js";
import { server } from "./gulp/task/server.js";
import { scss } from "./gulp/task/scss.js";
import { js } from "./gulp/task/js.js";
import { images } from "./gulp/task/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/task/fonts.js";
import { svgSprive } from "./gulp/task/svgSprive.js";
import { zip } from "./gulp/task/zip.js";
import { ftp } from "./gulp/task/ftp.js";

// File changer watcher
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

// Squential font processing
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Main tasks
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// Scenarios for executing tasks
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Export scenarios
export { dev }
export { build }
export { svgSprive }
export { deployZIP }
export { deployFTP }

// Default script execution
gulp.task('default', dev);