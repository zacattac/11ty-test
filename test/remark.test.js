const test = require("ava");
const remark = require("../plugins/remark");

test("remark renders anchors", async (t) => {
  const result = await remark().render("# Hello", { assets: [] });
  t.snapshot(result);
});

test("remark renders sidenotes", async (t) => {
  const fixture = "test text[^1]\n\n[^1]: Hello";
  const result = await remark().render(fixture, { assets: [] });
  t.snapshot(result);
});

test("remark renders references", async (t) => {
  const fixture = "[test](http://test.com, 'note')";
  const result = await remark().render(fixture, { assets: [] });
  t.snapshot(result);
});

test("remark renders external links", async (t) => {
  const fixture = "[test](http://test.com)";
  const result = await remark().render(fixture, { assets: [] });
  t.snapshot(result);
});

test("remark renders long lists", async (t) => {
  const fixture =
    "- on\n- twe\n- three\n- four\n- five\n- six\n- seven\n- eight\n- nine\n- ten\n- eleventy";
  const result = await remark().render(fixture, { assets: [] });
  t.snapshot(result);
});

test("remark renders images with captions", async (t) => {
  const fixture =
    "![test image](https://test.com/s/s/s/test.jpeg 'test caption')";
  const mock = {
    assets: [
      {
        sys: {
          id: "s",
        },
        fields: {
          file: {
            url: "https://test.com",
            details: { image: { width: "1000", height: "1000" } },
          },
        },
      },
    ],
  };
  const result = await remark().render(fixture, mock);
  t.snapshot(result);
});
