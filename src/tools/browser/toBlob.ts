/// <reference lib="DOM" />

import Attheme from "../..";
import { ColorSignature } from "../../types";

/**
 * Creates a Blob to download the theme.
 * @param theme The theme to download.
 * @param name The theme's name.
 * @param colorSignature Either `hex` or `int`.
 * @returns The created blob the theme can be downloaded through.
 */
export default (
  theme: Attheme,
  name: string,
  colorSignature?: ColorSignature,
): string => {
  const serialized = theme.toString(colorSignature);
  const length = serialized.length;
  const buffer = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    buffer[i] = serialized.codePointAt(i) as number;
  }

  const blob = URL.createObjectURL(new File([buffer], name));

  return blob;
};
