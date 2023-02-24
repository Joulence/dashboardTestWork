import replace from "gulp-replace"; // Search and change
import plumber from "gulp-plumber"; // Error proccesing
import notify from "gulp-notify"; // Messages (hints)
import browsersync from "browser-sync"; //Live server
import newer from "gulp-newer"; // Check updates
import ifPlugin from "gulp-if" // Сonditional branch

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin
}