require('dotenv').config()
const express = require('express')

const app = express()

require('./startup/config')()

require('./startup/db')()
require('./startup/router')(app)

app.listen(3000, () => console.log('Server on...'))
