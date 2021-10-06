const contentful = require("../providers/contentful");

module.exports = async function list() {
  return contentful.client
    .getEntry("2uust09L73V2AcXwl3F80h")
    .then((result) => result);
};
