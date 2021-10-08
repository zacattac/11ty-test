const test = require("ava");
const limit = require("../filters/limit");

test("returns an object", (t) => {
  const fixture = [
    { sys: { id: "1" }, fields: { title: "test" } },
    { sys: { id: "2" }, fields: { title: "test" } },
    { sys: { id: "3" }, fields: { title: "test" } },
    { sys: { id: "4" }, fields: { title: "test" } },
  ];
  const result = limit(fixture, 3);
  const expected = [fixture[0], fixture[1], fixture[2]];
  t.deepEqual(result, expected);
});
