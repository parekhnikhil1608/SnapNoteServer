module.exports = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    Object.keys(req.body).forEach((key) => {
      if (key.toLowerCase().includes("id") && req.body[key] === null) {
        req.body[key] = "";
      }
    });
  }
  next();
};
