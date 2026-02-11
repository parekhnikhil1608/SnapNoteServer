module.exports = (req, res, next) => {
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header("Cache-Control", "no-store");
  next();
};
