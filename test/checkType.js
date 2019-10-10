import test from "ava";
import checkType from "../lib/checkType";

test(`Checks the type correctly`, t => {
  t.throws(
    () =>
      checkType({
        variable: 42,
        types: [`string`],
      }),
    TypeError,
  );

  t.notThrows(() =>
    checkType({
      variable: 42,
      types: [`number`],
    }),
  );
});

test(`Checks the instance correctly`, t => {
  t.throws(
    () =>
      checkType({
        variable: new Set(),
        types: [Map],
      }),
    TypeError,
  );

  t.notThrows(() =>
    checkType({
      variable: new Map(),
      types: [Map],
    }),
  );
});

test(`Works with null and undefined properly`, t => {
  t.throws(
    () =>
      checkType({
        variable: null,
        types: [`object`],
        nullOrUndefined: false,
      }),
    TypeError,
  );

  t.notThrows(() =>
    checkType({
      variable: null,
      types: [`object`],
      nullOrUndefined: true,
    }),
  );
});
