const fetch = require("node-fetch");

module.exports = async function saveeFeed() {
  async function getFeed() {
    return fetch("https://api.savee.it/user/interrobang/items/", {
      headers: {
        "Auth-Token": null,
      },
    }).then((response) => response.json());
  }

  return getFeed().then((json) => json.data);
};
