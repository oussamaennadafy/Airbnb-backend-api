const loggedIn = (req, res, next) =>
{
 next()
}
const mutateQueryRequest = (req, res, next) =>
{
 req.query.sort = 'price';
 req.query.limit = '5';
 next()
}


module.exports = {
 loggedIn,
 mutateQueryRequest
}