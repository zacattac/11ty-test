const test = require("ava");
const findByID = require("../filters/findByID");

test("returns an object", (t) => {
  const fixture = [
    { sys: { id: "1" }, fields: { title: "test" } },
    { sys: { id: "2" }, fields: { title: "test" } },
  ];
  const result = findByID(fixture, "1");
  const expected = fixture[0];
  t.is(result, expected);
});
