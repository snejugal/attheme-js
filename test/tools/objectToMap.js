import test from "ava";
import objectToMap from "../../lib/tools/objectToMap";

test(`Convers an object to Map correctly`, t => {
  const object = {
    foo: `bar`,
  };

  const expected = new Map([[`foo`, `bar`]]);

  t.deepEqual(objectToMap(object), expected);
});
