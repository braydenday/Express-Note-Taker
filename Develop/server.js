// boiler plate code
const path = require('path');
const fs = require("fs");
const express = require('express');
const app = express();
const savedNotes = require('./db/db.json');

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// get command for saved notes and html files
app.get('/api/notes', (req, res) => {
    res.json(savedNotes.slice(1));
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

// 2 functions . create and delete note
// this function creates a new note from notes array to post/write on the body of the page 
function createnewNotes(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;
// write file with new note through json stringify
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}
// post command for new note to be applied on body/savednotes
app.post('/api/notes', (req, res) => {
    const newNote = createnewNotes(req.body, savedNotes);
    res.json(newNote);
});
// this function deletes an old note from the notes array on the body of the page
function deleteNotes(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];
        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        }}
}
// delete command to remove the old note from params
app.delete('/api/notes/:id', (req, res) => {
    deleteNotes(req.params.id, savedNotes);
    res.json(true);
});


// app listening for server to start and kicks out our port terminal using a template literal (8080)
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});