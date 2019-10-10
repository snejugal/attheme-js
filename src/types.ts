import { RgbColor } from "@snejugal/color";

export type Color = RgbColor;
export type ColorSignature = "hex" | "int";
export type VariableIterator = Iterable<[string, RgbColor]>;
