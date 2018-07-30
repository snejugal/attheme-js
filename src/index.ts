const IMAGE_KEY = Symbol.for(`image`);

interface Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

interface Theme {
  [key: string]: Color;
  [IMAGE_KEY]?: string;
}

interface Options {
  defaultValues?: Theme;
}

const parseTheme = (content: string): Theme => {
  /** @todo: Write the parser */
  return {};
};

class Attheme implements Theme {
  [key: string]: Color;

  static IMAGE_KEY = IMAGE_KEY;

  constructor(content?: string | null, options: Options = {}) {
    if (
      typeof content !== `string`
      && content !== undefined
      && content !== null
    ) {
      throw new TypeError(`new Attheme()'s content argument is of ${typeof content} type, though it may only be a string, null, or undefined.`);
    }

    if (typeof options !== `object`) {
      throw new TypeError(`new Attheme()'s options argument is of ${typeof options} type, though it may only be an object, null, or undefined.`);
    }

    if (options !== null) {
      if (`defaultValues` in options) {
        if (typeof options.defaultValues === `object`) {
          if (options.defaultValues !== null) {
            Object.assign(this, options.defaultValues);
          }
        } else if (options.defaultValues !== undefined) {
          throw new TypeError(`new Attheme()'s options.defaultValues argument is of ${typeof options.defaultValues}, though it may only be an object, null, or undefined.`);
        }
      }
    }

    if (typeof content === `string`) {
      Object.assign(this, parseTheme(content));
    }
  }
}

export default Attheme;
