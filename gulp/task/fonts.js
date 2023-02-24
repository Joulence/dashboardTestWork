import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        // Convert to .ttf
        .pipe(fonter({
            formats: ['ttf']
        }))
        // Upload to source folder
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
}

export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        // Convert to .woff
        .pipe(fonter({
            formats: ['woff']
        }))
        // Upload to dist folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        // Looking fonts files .ttf
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        // Convert to .woff2
        .pipe(ttf2woff2())
        // Upload to dist folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

export const fontsStyle = () => {
    // Styles file to connect fonts
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    // Checking if fonts exist
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            // Checking if styles file for connecting fonts exist
            if (!fs.existsSync(fontsFile)) {
                // If there is no file - create it
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    // Write down connection of fonts into styles file
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-') : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile,
                            `@font-face {
                                font-family : ${fontName};
                                font-display: swap;
                                src: url("../fonts/${fontFileName}.woff") format("woff"), url("../fonts/${fontFileName}.woff2") format("woff2");
                                font-weight: ${fontWeight};
                                font-style: normal;
                            }\r\n`, cb);
                        newFileOnly = fontFileName
                    }
                }
            } else {
                console.log(`File scss/fonts.scss exist already!`);
            }
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { };
}