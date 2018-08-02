import { Color } from "./types";
import checkType from "./checkType";

interface CheckColorParameters {
  color: Color;
  functionName: string;
  argumentName: string;
}

const CHANNELS = [`red`, `green`, `blue`, `alpha`];

const checkColor = ({
  color,
  functionName,
  argumentName,
}: CheckColorParameters) => {
  checkType({
    variable: color,
    types: [`object`],
    functionName,
    argumentName,
    nullOrUndefined: false,
  });

  for (const property of Object.keys(color)) {
    if (!CHANNELS.includes(property)) {
      throw new Error(`The ${argumentName} argument to ${functionName} must be a color, but it has property ${property} which can't be on a color.`);
    }
  }

  for (const channel of CHANNELS) {
    checkType({
      variable: color[channel as keyof Color],
      types: [`number`],
      functionName,
      argumentName,
      nullOrUndefined: false,
    });
  }
};

export default checkColor;
