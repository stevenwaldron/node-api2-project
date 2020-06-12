require('dotenv').config()
const express = require('express');

const App = require('./server');

const PORT = process.env.PORT ||  3000;

App.listen(PORT, ()=> {
    console.log(`listening on http://localhost:${PORT}`)
})