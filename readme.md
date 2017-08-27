# attheme-js
A small framework for working with .attheme files in JS.
# Supports
- `Signed int` as a variable value is supported;
- Hex (`#rrggbb` and `#aarrggbb`) as a variable value is supported;
- Image wallpapers are supported.

## Installing
Download the framework from the “Releases” section and then add a new `<script>` tag to your HTML:
```html
<script src="attheme.min.js"></script>
```
## Usage
### Creating an empty theme
```js
const emptyTheme = new Attheme();
```
### Creating a theme with an uploaded file's content
```js
const themeContent =
        "windowbackgroundWhite=#012226" +
        "actionBarDefault=-3047847";
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
## Documentation
### new Attheme(themeContent, fillWithDefaults)
Returns an object with variables and wallpaper (if added).
- `themeContent` (String)
   Previously read theme's content. If not specified, creates an empty theme.
- `fillWithDefaults` (Boolean)
...Whether unadded variables should be added to the object. `False` by default.
   This argument requires `defaultVariablesValues` defined outside, otherwise settings this to `true` won't affect.
```js
const theme = new Attheme(themeContent, false); // Attheme {...}
```
#### Getting a variable value
```js
const actionBarBackground = theme.actionBarDefault; // { red: 255, ... }
```
#### Setting a new variable
```js
theme.chat_wallpaper = {
    red: 244,
    green: 67,
    blue: 54,
    alpha: 255
};
```
#### Changing only a channel of a variable value
```js
theme.windowBackgroundWhite.blue = 243;
```
### theme.asText()
Returns a string representing the .attheme file content for saving the theme. It automatically chooses whether use Int or Hex as a variable value.
#### Creating a download link
```js
const themeName = "Awesome theme",
      themeSaveContent = btoa(theme.asText()); // using encoding makes us sure the wallpaper will save correctly after downloading
const link = document.createElement("a");
link.download = `${themeName}.attheme`;
link.href = `data:text/plain;base64,${themeSaveContent}`;
link.innerHTML = "Download the theme";
document.body.append(link);
```
### Attheme.IMAGE_KEY
Returns `Symbol.for("image")`. The value is a symbol so the theme can have the `image` variable.
#### Getting theme's wallpaper
```js
const wallpaper = theme[Attheme.IMAGE_KEY];
```
---
## Default variables values
The repository has the `default-variables-values.js` file that adds `defaultVariablesValues` object to your environment. Just add this to your HTML and you'll be able to fill a theme with default values when creating a new theme:
###### HTML
```html
<script src="js/default-variables-values.js" defer></script>
<script src="js/attheme.js" defer></script>
```
###### JS
```js
const theme = new Attheme("", true); // { actionBarDefaultActionMode: {...}, ...}
```
## Reading a theme correctly in a browser
`new FileReader().readAsText(file)` is a simple way to read user's theme content, but if the theme has an image wallpaper, the wallpaper won't be read correctly. The following function solves the issue:
```js
function readFile(file) {
  return new Promise((resolve, reject) => {
    const CHUNK_SIZE = 0x8000;

    const reader = new FileReader();
    reader.onerror = () => {
      reject(new Error("Couldn't read the file"));
    };
    reader.onload = () => {
      const chars = new Uint8Array(reader.result),
            length = chars.length;

      let content = "";

      for (let i = 0; i < length; i += CHUNK_SIZE) {
        let slice = chars.subarray(i, Math.min(i + CHUNK_SIZE, length));
        content += String.fromCharCode.apply(null, slice);
      }
      resolve(content);
    };

    reader.readAsArrayBuffer(file);
  });
}
```
Usage:
```js
const fileInput = document.querySelector("input[type='file']");
fileInput.addEventListener("change", function() {
  readFile(this.files[0])
    .then((content) => {
      const theme = new Attheme(content);
    })
    .catch((error) => {
      console.error(error);
    });
});
```