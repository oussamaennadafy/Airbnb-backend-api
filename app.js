const express = require('express')
const app = express()
const cors = require('cors')
const usersRoutes = require('./routes/usersRouter')
const placesRoutes = require('./routes/placesRoutes')

app.use(cors())
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/places', placesRoutes)

module.exports = app