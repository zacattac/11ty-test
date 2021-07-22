const FeedbinAPI = require("../providers/feedbin");

module.exports = async function feeds() {
  const api = new FeedbinAPI();

  return api.getSubscriptions().then((json) => json);
};
