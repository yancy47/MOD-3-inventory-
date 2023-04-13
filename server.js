// Require dotenv to setup environment variables in our server
require('dotenv').config()

// Load express
const express = require('express')

// Setup our Express app
const app = express()

const PORT = 8099

// Load the connectDB function
const connectDB = require('./config/db')

// Connect to database
connectDB()

// Load the create engine -> (npm install jsx-view-engine react react-dom)
const { createEngine } = require('jsx-view-engine')

// Load the method-override middleware
const methodOverride = require('method-override')

const itemRoutes = require('./routes/itemRoutes')

// Configure the view engine and look for files ending in jsx
app.set('view engine', 'jsx')

// Create the engine and accept files ending in jsx
app.engine('jsx', createEngine())

// a middleware that formats the form data (currently a string that looks like query params) into a object we can use
app.use(express.urlencoded({ extended: true }))

// hack into our form and give it more HTTP methods (like DELETE and PUT)
app.use(methodOverride('_method'))

app.use(express.static('public'))

app.use('/items', itemRoutes)

// Setup an "index" route for vegetables
app.get('/', (req, res) => {
    res.redirect('/items')
})

// Listen to the given port
app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})

/* 
NOTES 
npm i
npm init -y
npm i dotenv
npm i express 
npm i react
npm install jsx-view-engine react react dom 
npm install method-override
npm i mongoose
*/