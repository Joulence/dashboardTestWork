import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from "gulp-rename";

import cleanCss from 'gulp-clean-css'; // Css compression
import webpcss from 'gulp-webpcss'; // Show webp images
import autoprefixer from 'gulp-autoprefixer'; // Adding vendor prefixes
import groupCssmediaQueries from 'gulp-group-css-media-queries'; // Group media queries

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourceMaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))

        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssmediaQueries()
            )
        )

        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss(
                    {
                        webpClass: ".webp",
                        noWebpClass: ".no-webp"
                    }
                )
            )
        )

        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserList: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        // If you don't need compressed css - uncomment it
        /* .pipe(app.gulp.dest(app.path.build.css)) */
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}