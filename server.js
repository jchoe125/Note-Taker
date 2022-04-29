const express = require('express')
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); //importing uuid package

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

//GET route for notes page when /notes is accessed 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//GET route for homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});


//API routes
//GET route for retrieving notes and returning saved notes as JSON
app.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname + "/db/db.json"), function(err, object) {
        if (err) {
            throw err
        }
        res.json(JSON.parse(object))
    })
});

//POST route to receive new note to save on the request body
app.post('/notes', (req, res) => {
    fs.readFile(path.join(__dirname + "/db/db.json"), function(err, object) {
        if (err) {
            console.log(err)
            return
        }
        var notes = JSON.parse(object)

        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4() // unique identifier
        }

        notes.push(newNote)

        let noteJSON = JSON.stringify(notes)
        console.log(noteJSON)

        fs.writeFile(path.join(__dirname + "/db/db.json"), noteJSON, (err) => {
            if (err) {
                return console.log(err)
            }
            return noteJSON
        })
    })
})


// Listener
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
)