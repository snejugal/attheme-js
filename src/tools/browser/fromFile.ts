/// <reference lib="DOM" />

import Attheme from "../..";

const fromFile = (file: File): Promise<Attheme> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const chars = new Uint8Array(reader.result as ArrayBuffer);

      let contents = ``;

      for (const char of chars) {
        contents += String.fromCharCode(char);
      }

      resolve(new Attheme(contents));
    };

    reader.onerror = () => reject(reader.error);

    reader.readAsArrayBuffer(file);
  });

export default fromFile;
