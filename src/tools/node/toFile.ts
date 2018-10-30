/// <reference types="node" />

import * as fs from "fs";
import Attheme from "../..";
import { ColorSignature } from "../../types";

/**
 * Writes the theme into a file.
 * @param theme The theme to write.
 * @param path The file to write in.
 * @param colorSignature Either `hex` or `int`.
 * @returns Promised resolved when the file is written
 */
const toFile = (
  theme: Attheme,
  path: string,
  colorSignature?: ColorSignature,
): Promise<void> => new Promise((resolve, reject) => {
  fs.writeFile(path, theme.toString(colorSignature), `binary`, (error) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
});

export default toFile;
