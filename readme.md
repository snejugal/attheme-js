# attheme-js
A small framework for working with .attheme files in JS.
# Supports
- `Signed int` as a variable value;
- Hex (`#rrggbb` and `#aarrggbb`) as a variable value;
- Image wallpapers.

## Installing
You can either install `attheme-js` package from npm:
```
npm install --save attheme-js
```
or download the framework from the “Releases” section.
## Node.js
Require the `attheme-js` module:
```js
const Attheme = require("attheme-js");
```
## Browsers
Add a new `<script>` tag to your HTML:
```html
<script src="path/to/attheme.min.js"></script>
```
If you install the framework from npm, the path is `node_modules/attheme-js/dist/attheme.min.js`.
## Usage
### Creating an empty theme
```js
const emptyTheme = new Attheme();
```
### Creating a theme with an uploaded file's content
```js
const themeContent =
        `windowbackgroundWhite=#012226
         actionBarDefault=-3047847`;
const theme = new Attheme(themeContent);
```
### Changing theme's data
```js
theme.actionBarDefaultIcon = {
  red: 76,
  blue: 175,
  green: 80,
  alpha: 128
};
theme.actionBarDefault.red = 244;
```
### Get the theme's content for saving
```js
const themeContent = theme.asText();
/*
windowBackgroundWhite=#012226
actionBarDefault=#d17e59

*/
```
### Getting theme's wallapeper
```js
const themeWallpaper = theme[Attheme.IMAGE_KEY];
```
## Documentatiom
See the [doumentation](/SnejUgal/attheme-js/wiki/Documentation) here.
## Helpful stuff
- [Reading a theme file correctly in browsers](/SnejUgal/attheme-js/wiki/Reading-a-theme-file-properly-in-browsers)
- [Default variables values](/SnejUgal/attheme-js/wiki/Default-values-of-variables)