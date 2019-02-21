const path = require("path")
const electron = require('electron')
const fs = require('fs');
let loadedLanguage;
let app = electron.app ? electron.app : electron.remote.app

module.exports = Localizer;

function Localizer(options = {}) {
    var locale = "locale" in options ? options.locale : app.getLocale(); // Use system locale by default
    var locales_directory = "locales_directory" in options ? options.locales_directory : "./locales";
    var locale_default = "locale_default" in options ? options.locale_default : "default";
    var localized_tag = "localized_tag" in options ? options.locales_directory : "localized-text";

    var language = locale.split("-")[0]; // en-US -> en
    
    // Load localized texts 
    // First check if a file matches the locale name (e.g. en-US.json) ; if not, try with the language code only (e.g. en.json)
    if(fs.existsSync(path.join(locales_directory, locale + '.json')))
       load_language(path.join(locales_directory, locale + '.json'));
    else if(fs.existsSync(path.join(locales_directory, language + '.json')))
        load_language(path.join(locales_directory, language + '.json'));
    else {
        console.warn("No localization available for locale " + locale + " or language " + language + ", loading default");
        load_language(path.join(locales_directory, locale_default + '.json'));
    }

    // Register localized-text HTML tag
    var localizedTextProto = Object.create(HTMLElement.prototype);
    var localizer = this;
    localizedTextProto.attachedCallback = function() {
        this.innerHTML = localizer.__(this.innerHTML);
    }
    document.registerElement(localized_tag, {prototype: localizedTextProto});
}

Localizer.prototype.__ = function(phrase) {
    let translation = loadedLanguage[phrase.trim()]

    if(translation === undefined)
        translation = phrase

    return translation
}

function load_language(path) {
    loadedLanguage = JSON.parse(fs.readFileSync(path, 'utf8'));
}

