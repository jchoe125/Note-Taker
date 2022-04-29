const express = require('express')
const fs = require('fs');
const path = require('path');
const uuid = require('uuid'); //importing uuid package
const notesDb = require('./db/db.json');

//setting variables for app to start server and listen on port 3000 for connections
const app = express();
const PORT = process.env.PORT || 3000;

//------------------------------------------e----------------------

//function to handle parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//----------------------------------------------------------------

//middleware functions
//function to serve files in public directory
app.use(express.static('public'));

//----------------------------------------------------------------

//HTML routes

//GET route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//GET route for notes page when /notes is accessed 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});


//API routes
//GET route for retrieving notes and returning saved notes as JSON
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    })
});

//POST route to receive new note to save on the request body
//New Note
app.post("/api/notes", function(req, res) {
    fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = uuid.v4();
        notes.push(newNote);

        const createNote = JSON.stringify(notes);
        fs.writeFile(path.join(__dirname, "./db/db.json"), createNote, (err) => {
            if (err) throw err;
        });
        res.json(newNote);
    });
});

//DELETE request
app.delete("/api/notes/:id", function(req, res) {
    id = req.params.id;
    // Splice method is used to delete note from array
    notesDb.splice(id - 1, 1);
    // Reassign id for each note object
    notesDb.forEach((obj, i) => {
        obj.id = i + 1;
    });
    // Return remaining notes
    fs.writeFile("./db/db.json", JSON.stringify(notesDb), function() {
        res.json(notesDb);
    });
});

// Listener
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
)