import * as path from "path";
import * as util from "util";

function group(name, tests) {
    const relativeFilenameOrName = relativeFilename(name);

    console.log(infoStr(relativeFilenameOrName));
    console.group();
    tests();
    console.groupEnd();
}

const test = function (title, fn) {
    const end = result(title);

    try {
        const fnRes = fn();

        if (util.types.isPromise(fnRes)) {
            fnRes.then(end).catch(end);
        } else {
            end();
        }
    } catch (err) {
        end(err);
    }
};

const result = title => err => {
    if (err instanceof Error) {
        console.log(``);
        console.log(errorStr(`✖ ${title}`));
        console.error(err.actual || err);
    } else {
        console.log(successStr(`✔ ${title}`));
    }
};

function relativeFilename(filename) {
    return path.relative(process.cwd(), filename);
}

const STR_GREEN = "\x1b[32m";
const STR_RED = "\x1b[31m";
const STR_YELLOW = "\x1b[33m";
const STR_RESET = "\x1b[0m";

function successStr(text) {
    return "".concat(STR_GREEN).concat(text).concat(STR_RESET);
}

function infoStr(text) {
    return "".concat(STR_YELLOW).concat(text).concat(STR_RESET);
}

function errorStr(text) {
    return "".concat(STR_RED).concat(text).concat(STR_RESET);
}

export { group, test };
