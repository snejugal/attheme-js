// Generates a map of the theme out of a typical .attheme file.
//
// Usage:
//   node scripts/generateThemeMap < input.attheme > output.ts

const Attheme = require(`..`).default;
const themeContents = [];

process.stdin.on(`data`, (chunk) => {
  themeContents.push(...chunk);
});

process.stdin.on(`end`, () => {
  const theme = new Attheme(Buffer.from(themeContents).toString(`binary`));

  console.log(`import { Color } from "../types";`);
  console.log(``);
  console.log(`export default new Map<string, Color>([`);

  for (const [variable, { red, green, blue, alpha }] of (new Map([...theme].sort()))) {
    console.log(`  [\`${variable}\`, {`);
    console.log(`    red: ${red},`);
    console.log(`    green: ${green},`);
    console.log(`    blue: ${blue},`);
    console.log(`    alpha: ${alpha},`);
    console.log(`  }],`);
  }
  console.log(`]);`);
});
