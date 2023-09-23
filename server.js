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
// optional create status messages to check mongo connection 
db.on('error', (err) => { console.log('ERROR: ' , err)})
db.on('connected', () => { console.log('mongo connected')})
db.on('disconnected', () => { console.log('mongo disconnected')})

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

// For static files
app.use(express.static('public'))

// For Template
app.use(expressLayout)

// Setting the views directory to the correct path
app.set('views', path.join(__dirname, 'views'))

app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// Routes
const goalRoutes = require('./backend/routes/goal')
app.use('/', goalRoutes)


// Handling 404 error
app.get('*', (req, res) => {
    res.status(404).render('404')
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})