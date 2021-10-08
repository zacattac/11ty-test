const test = require("ava");
const date = require("../filters/date");

test("returns a date", (t) => {
  const result = date("2021-09-21");
  t.is(result, "Sep 21, 2021");
});

test("returns a long date", (t) => {
  const result = date("2021-09-21", "long");
  t.is(result, "September 2021");
});

test("returns a short date", (t) => {
  const result = date("2021-09-21", "short");
  t.is(result, "Sep 21, 2021");
});

test("returns a medium date", (t) => {
  const result = date("2021-09-21", "short");
  t.is(result, "Sep 21, 2021");
});
