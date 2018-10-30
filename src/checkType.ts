interface CheckTypeArguments {
  variable: unknown;
  types: (string | Function)[];
  functionName: string;
  argumentName: string;
  nullOrUndefined?: boolean;
};

/**
 * Checks the type of a variable and throws if invalid.
 * @param param0.variable The variable to check type of.
 * @param param0.types The types that the variable can be of.
 * @param param0.functionName The function name for the error message.
 * @param param0.argumentName The argument name for the error message.
 * @param param0.nullOrUndefined Whether the variable can be null or undefined.
 * @throws The variable is of a wrong type.
 */
export default ({
  variable,
  types,
  functionName,
  argumentName,
  nullOrUndefined = true,
}: CheckTypeArguments): void => {
  /**
   * Throws an error that the type is wrong.
   * @param variableType The variable type.
   * @throws Always.
   */
  const throwError = (variableType: string) => {
    throw new TypeError(`The ${argumentName} argument to ${functionName} is of ${variableType} type, but it must be one of these types: ${types.join(`, `)}${nullOrUndefined ? `, null or undefined` : ``}.`);
  };

  if (variable === undefined || variable === null) {
    if (nullOrUndefined) {
      return;
    } else {
      throwError(variable === null ? `null` : `undefined`);
    }
  }

  const variableType = typeof variable;

  for (const type of types) {
    if (typeof type === `string`) {
      if (variableType === type) {
        return;
      }
    } else if (variable instanceof type) {
      return;
    }
  }

  throwError(variableType);
};
