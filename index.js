const express = require('express');

const App = require('./server');

const PORT = 3000;

App.listen(PORT, ()=> {
    console.log(`listening on http://localhost:${PORT}`)
})