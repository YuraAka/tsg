import express from 'express'
import body from 'body'
import morgan from 'morgan'
import path from 'path'
import React from 'react'

var app = express();

//app.use(express.favicon());
app.use(morgan('dev'));
//app.use(express.methodOverride());

//app.use(express.static(path.join(path.dirname(__dirname), 'public')));

app.get('/', function (req, res) {
    
    res.sendfile(path.join(path.dirname(__dirname), 'public', 'index.html'))
});


app.get('/api', function (req, res) {
    res.send('API is running');
});

app.listen(2406);