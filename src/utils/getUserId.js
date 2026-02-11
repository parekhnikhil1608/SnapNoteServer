const jwt = require("jsonwebtoken");

module.exports = function getUserId(req) {
  if (req.claims?.sub) return req.claims.sub;

  const header = req.headers.authorization;
  if (!header) return null;

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.decode(token);
    return decoded?.sub || decoded?.id;
  } catch {
    return null;
  }
};
