// Generates a map of the theme out of a typical .attheme file.
//
// Usage:
//   node scripts/generateThemeMap [-d] < input.attheme > output.ts
//
// If the `-d` flag is passed, these variables are added to the theme:
// - `chat_wallpaper`;
// - `chat_serviceBackground`;
// - `chat_servicebackgroundSelected`;
// - `chats_menuTopShadow`.

const Attheme = require(`..`).default;
const themeContents = [];

process.stdin.on(`data`, (chunk) => {
  themeContents.push(...chunk);
});

process.stdin.on(`end`, () => {
  const theme = new Attheme(Buffer.from(themeContents).toString(`binary`));

  if (process.argv.includes(`-d`)) {
    theme.set(`chat_wallpaper`, {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 255,
    });

    theme.set(`chat_serviceBackground`, {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 102,
    });

    theme.set(`chat_serviceBackgroundSelected`, {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 136,
    });

    theme.set(`chats_menuTopShadow`, {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 64,
    });
  }

  console.log(`import { Color } from "../types";`);
  console.log(``);
  console.log(`export default new Map<string, Color>([`);

  theme.sort();

  for (const [variable, { red, green, blue, alpha }] of theme) {
    console.log(`  [\`${variable}\`, {`);
    console.log(`    red: ${red},`);
    console.log(`    green: ${green},`);
    console.log(`    blue: ${blue},`);
    console.log(`    alpha: ${alpha},`);
    console.log(`  }],`);
  }
  console.log(`]);`);
});
