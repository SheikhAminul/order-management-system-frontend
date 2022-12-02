const express = require('express')
const app = express()
const path = require('path')
const http = require('http')

// Configure express 
const dir = path.join(__dirname, process.argv.includes('--development') ? 'build' : 'dist')
app.use('/', express.static(`${dir}/`))
app.get(/^(?!(\/)\/).*/, function (req, res) {
    res.sendFile(`${dir}/index.html`)
})

// Start server
http.createServer(app).listen(process.env.PORT || 3000, async () => {
    console.log(`${new Date().toLocaleString()} - http://localhost:${process.env.PORT || 3000}/`)
})