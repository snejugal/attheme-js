/**
 * Converts an old theme object into the new one. It is intended to be used
 * with `option.defaultValues`.
 * @param object The old theme object to convert.
 */
const objectToMap = (object: object): Map<string, any> => (
  new Map([
    ...Object.entries(object),
  ])
);

export default objectToMap;
