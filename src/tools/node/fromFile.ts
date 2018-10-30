/// <reference types="node" />

import * as fs from "fs";
import Attheme from "../..";
import { AtthemeOptions } from "../../types";

export default (
  path: string,
  options?: AtthemeOptions,
): Promise<Attheme> => new Promise((resolve, reject) => {
  fs.readFile(path, `binary`, (error, contents) => {
    if (error) {
      reject(error);
    } else {
      resolve(new Attheme(contents, options));
    }
  });
});
