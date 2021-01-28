const fs = require("fs");
const path = require("path");
const lodash = require("lodash");

const langsDir = path.resolve(process.cwd(), "langs");
const parameterizedString = (...args) => {
    const params = args.slice(1);
    return args[0].replace(/\$[0-9]+/g, (matchedStr) => params[matchedStr.replace("$", "")]);
};

module.exports = class Lang {
    code;
    lang;
    constructor(mes) {
        const role = mes.member.roles.cache.find((role) => role.name === "ru" || role.name === "eng");
        if (!role) this.code = "english";
        else if (role.name === "ru") this.code = "russian";
        else if (role.name === "eng") this.code = "english";
        this.lang = JSON.parse(fs.readFileSync(`${langsDir}/${this.code}.json`, { encoding: "utf-8" }));
    }
    get(...args) {
        const path = args[0];
        const result = lodash.get(this.lang, path, null);
        if (!result) return lodash.get(this.lang, "errors.langStringNotFound");
        return parameterizedString(result, ...args.slice(1));
    }
};
