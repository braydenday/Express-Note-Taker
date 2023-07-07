const path = require('path');
const fs = require("fs");
const express = require('express');
const app = express();
const savedNotes = require('./db/db.json');

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(savedNotes.slice());
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
