/// <reference types="node" />

import * as fs from "fs";
import Attheme from "../..";

const fromFile = (path: string): Promise<Attheme> =>
  new Promise((resolve, reject) => {
    fs.readFile(path, `binary`, (error, contents) => {
      if (error) {
        reject(error);
      } else {
        resolve(new Attheme(contents));
      }
    });
  });

export default fromFile;
