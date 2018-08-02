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
    const value = color[channel as keyof Color];

    checkType({
      variable: value,
      types: [`number`],
      functionName,
      argumentName,
      nullOrUndefined: false,
    });

    if (value < 0) {
      throw new Error(`The ${argumentName} argument to ${functionName} must be a valid color, but its ${channel} channel is less than 0.`);
    }

    if (value > 255) {
      throw new Error(`The ${argumentName} argument to ${functionName} must be a valid color, but its ${channel} channel is greater than 255.`);
    }

    if (value % 1 !== 0) {
      throw new Error(`The ${argumentName} argument to ${functionName} must be a valid color, but its ${channel} channel is a fraction (${value}).`);
    }
  }
};

export default checkColor;
