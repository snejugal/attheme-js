import test from "ava";
import fromFile from "../../../lib/tools/node/fromFile";
import toFile from "../../../lib/tools/node/toFile";
import path from "path";
import { promises as fs } from "fs";

test(`Writes the file in Node.js properly`, async (t) => {
  const outPath = path.join(__dirname, `../../exampleTheme.attheme`);
  const theme = await fromFile(outPath);

  const inPath = path.join(__dirname, `./__temp__.attheme`);

  await toFile(theme, inPath);

  t.deepEqual(theme, await fromFile(inPath));
});

test.after(`Writes the file in Node.js properly`, async () => {
  await fs.unlink(path.join(__dirname, `./__temp__.attheme`));
})
