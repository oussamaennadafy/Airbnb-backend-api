const loggedIn = (req, res, next) => {
  next();
};
const aliasTopPlaces = (req, res, next) => {
  req.query.sort = "price";
  req.query.limit = "5";
  next();
};

module.exports = {
  loggedIn,
  aliasTopPlaces,
};
