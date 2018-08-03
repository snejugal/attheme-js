import test from "ava";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import jimp from "jimp";
import fromFile from "../../../lib/tools/browser/fromFile";

test(`Reads the file in the browser correctly`, async (t) => {
  const { window: { File, FileReader } } = new JSDOM();

  global.FileReader = FileReader;

  const themePath = path.join(__dirname, `../../exampleTheme.attheme`);
  const contents = fs.readFileSync(themePath);
  const esBufferArray = new Uint8Array(contents);
  const file = new File(
    [esBufferArray],
    `i think i might have an easter egg here`,
  );

  const theme = await fromFile(file);

  const wallpaperBuffer = Buffer.from(theme.getWallpaper(), `binary`);

  // If the image is incorrectly read, it will throw
  t.notThrows(() => jimp.read(wallpaperBuffer));

  const expectedTheme = new Map([
    [`divider`, {
      red: 217,
      green: 217,
      blue: 217,
      alpha: 255,
    }],
  ]);

  t.deepEqual(theme._variables, expectedTheme);
});
