const auth = require("json-server-auth");

module.exports = {
  rules: auth.rewriter({
    users: 600,
    notes: 660,
  }),
  auth,
};
