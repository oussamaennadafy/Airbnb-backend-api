const express = require('express')
const app = express()
const cors = require('cors')
const usersRoutes = require('./routes/usersRouter')
const placesRoutes = require('./routes/placesRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')

app.use(cors())
app.use(express.json());
app.use(express.static(`${__dirname}/public`))
// resources
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/places', placesRoutes)
app.use('/api/v1/categories', categoriesRoutes)

module.exports = app