# HTML Localizer

HTML Localizer is a small tool allowing you to easily localize HTML text inside your HTML webpage dynamically during rendering.
* Lightweight simple localization module
* Automatically loads localized texts based on the navigator's locale 
* Automatically translate HTML texts within _<localized-text>_ tag (tag's name can be customized)
* No extra parsing needed

# Usage

Edit _localizer.js_ dictionary to add your text for each language you want to support:

```javascript
var dictionary = {
    "_": { // when language is not supported
        "hello_world": "Not Translated!"
    },
    "en": {
        "hello_world": "Hello World!"
    },
    "ja": {
        "hello_world": "こんにちは！"
    }
}
```

[Here is the list of all Language Codes](http://4umi.com/web/html/languagecodes.php)

Next, load the module at the top of your HTML page by simply importing the script:

```html
<script src="./localizer.js" type="text/javascript"></script>
```

You're now ready to localize any HTML text inside your page! To do that, use the tag _<localized-text>_ with the _key_ attribute.

```html
<localized-text key="hello_world"></localized-text>
```

If you want to force a specific language for your text to be localized, add the _lang_ attribute.

```html
<localized-text key="hello_world" lang="ja"></localized-text><
```

# Example

See _example.html_ for an example about the usage.
