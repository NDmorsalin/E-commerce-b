//external recourse 
const express = require('express');
const cookieParser = require('cookie-parser')
//internal route
const productRoute = require('./router/productRoute')
const db = require('./DB/db')

const app = express()
//environment variables
require('dotenv').config()


// connect db
db()

//perser
app.use(cookieParser())
app.use(express.json())

// router
app.use('/api/v1/',productRoute)

const port = process.env.PORT || 5000

app.listen(port, ()=>{
  console.log('app is running on port ' + port)
})