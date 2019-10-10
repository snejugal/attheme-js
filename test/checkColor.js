import test from "ava";
import checkColor from "../lib/checkColor";

test(`Checks the types properly`, t => {
  t.throws(
    () =>
      checkColor({
        color: `#424242`,
      }),
    TypeError,
  );

  t.throws(
    () =>
      checkColor({
        color: null,
      }),
    TypeError,
  );

  t.throws(
    () =>
      checkColor({
        color: {
          red: `42`,
          green: 69,
          blue: 13,
          alpha: 146,
        },
      }),
    TypeError,
  );

  t.notThrows(() =>
    checkColor({
      color: {
        red: 42,
        green: 69,
        blue: 13,
        alpha: 146,
      },
    }),
  );
});

test(`Checks for unspecified and excessive properties`, t => {
  t.throws(
    () =>
      checkColor({
        color: {
          red: 0,
          green: 0,
        },
      }),
    TypeError,
  );

  t.throws(
    () =>
      checkColor({
        color: {
          red: 0,
          green: 0,
          blue: 0,
          alpha: 0,
          wtf: `??`,
        },
      }),
    TypeError,
  );

  t.notThrows(() =>
    checkColor({
      color: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0,
      },
    }),
  );
});

test(`Checks for valid channel value`, t => {
  t.notThrows(() =>
    checkColor({
      color: {
        red: 0,
        green: 100,
        blue: 200,
        alpha: 255,
      },
    }),
  );

  t.throws(
    () =>
      checkColor({
        color: {
          red: -10,
          green: 100,
          blue: 200,
          alpha: 255,
        },
      }),
    TypeError,
  );

  t.throws(
    () =>
      checkColor({
        color: {
          red: 1984,
          green: 100,
          blue: 200,
          alpha: 255,
        },
      }),
    TypeError,
  );

  t.throws(
    () =>
      checkColor({
        color: {
          red: 10.4,
          green: 100,
          blue: 200,
          alpha: 255,
        },
      }),
    TypeError,
  );
});
