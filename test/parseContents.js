import test from "ava";
import parseContents from "../lib/parseContents";

test(`Parses the theme well`, t => {
  const theme = `
// shouldNotParse=-1
shouldParse=-1 // comment
doParse=#102030
fullHex=#40506070
thisShouldBeIgnored=#q
WPS
let's pretend that
there's an image here
WPE
thisShouldNotParseToo=0
`;

  const expected = {
    variables: new Map([
      [
        `shouldParse`,
        {
          red: 0xff,
          green: 0xff,
          blue: 0xff,
          alpha: 0xff,
        },
      ],
      [
        `doParse`,
        {
          red: 0x10,
          green: 0x20,
          blue: 0x30,
          alpha: 0xff,
        },
      ],
      [
        `fullHex`,
        {
          red: 0x50,
          green: 0x60,
          blue: 0x70,
          alpha: 0x40,
        },
      ],
    ]),
    wallpaper: `let's pretend that
there's an image here`,
  };

  const parsed = parseContents(theme);

  // it doesn't seem to work with Map well otherwise
  t.deepEqual(parsed.variables, expected.variables);
  t.deepEqual(parsed.wallpaper, expected.wallpaper);
});

test(`Creates the wallpaper property only if the theme has`, t => {
  t.false(`wallpaper` in parseContents(``));
  t.true(`wallpaper` in parseContents(`WPS\nWPE`));
});

test(`WPE is not assumed`, t => {
  const noFinalEOL = `WPS\nWPE`;
  const twoFinalEOL = `WPS\nWPE\n\n`;

  t.is(parseContents(noFinalEOL).wallpaper, ``);
  t.is(parseContents(twoFinalEOL).wallpaper, ``);
});
