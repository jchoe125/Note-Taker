const express = require('express')
const fs = require('fs');
const path = require('path'); //provides utilities for working with file and directory paths
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

//setting variables for app to start server and listen on port 3000 for connections
const app = express();
const PORT = process.env.PORT || 3000;

//------------------------------------------e----------------------

//middleware functions
//function to serve files in public directory
app.use(express.static('public'));

//function to handle parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//----------------------------------------------------------------

//HTML routes
//GET route for homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//GET route for notes page when /notes is accessed 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//----------------------------------------------------------------

// //API routes
// //GET route for retrieving notes and returning saved notes as JSON
app.get('/api/notes', (req, res) => {
    const dbj = JSON.parse(fs.readFileSync('db/db.json'))
    res.json(dbj)
})

//POST route to receive new note to save on the request body
app.post('/api/notes', (req, res) => {
    //saves new note as a variable
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4() // unique identifier
    }
    const dbj = JSON.parse(fs.readFileSync('db/db.json'))
    dbj.push(newNote)

    fs.writeFileSync('db/db.json', JSON.stringify(dbj))
    res.json(dbj)
})

// Listener
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
)