// IMPORTS
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const path = require('path')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 3000

// setup database 
const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI

// connect to mongo 
mongoose.connect(mongoURI)
const db = mongoose.connection
// check mongo connection 
db.on('error', (err) => { console.log('ERROR: ' , err)})
db.on('connected', () => { console.log('mongo connected')})
db.on('disconnected', () => { console.log('mongo disconnected')})

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

// For Static Files
app.use(express.static('public'))

// For Template
app.use(expressLayout)


// Define settings at the beginning of application
// Setting the views directory to the correct path
app.set('views', path.join(__dirname, 'views'))
// Specify layout and setting up views 
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// For Routes
const goalRoutes = require('./backend/routes/goal')
app.use('/', goalRoutes)


app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})