const express = require('express')
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); //importing uuid package
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
app.get("/api/notes", function(req, res) {
    // Read the db.json file and return all saved notes as JSON
    res.json(notesDb);
});

//POST route to receive new note to save on the request body
app.post('api/notes', (req, res) => {
    fs.readFile(path.join(__dirname + "/db/db.json"), function(err, object) {
        if (err) {
            console.log(err)
            return
        };

        var notes = JSON.parse(object);

        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4() // unique identifier
        };

        notes.push(newNote)

        let noteJSON = JSON.stringify(notes)
        console.log(noteJSON);

        fs.writeFile(path.join(__dirname + "/db/db.json"), noteJSON, (err) => {
            if (err) {
                return console.log(err)
            }
            return noteJSON
        })
    })
});

//DELETE request
app.delete("/api/notes/:id", function(req, res) {
    id = req.params.id;
    // Splice method is used to delete note from array
    db.splice(id - 1, 1);
    // Reassign id for each note object
    db.forEach((obj, i) => {
        obj.id = i + 1;
    });
    // Return remaining notes
    fs.writeFile("./db/db.json", JSON.stringify(db), function() {
        res.json(db);
    });
});

// Listener
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
)