const express = require("express");
const fs = require('fs-extra')
const path = require('path');
const app = express();
const noteData = require('./db/db.json')
const port = 3009;
const unID = require('uniqid');
const {
    readFile
} = require("fs");



app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(express.json());


// server is listening for user asking for notes
app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, allNotes) => {
        if (err) {
            console.log("oh no")
            res.status(500).json({err: "try again"})
        }
        else {
            let data = JSON.parse(allNotes)
            res.json(data);
        }
    })
});
// server is listening for the user asking for a specific note .get(path,(req, res),)
app.get('/api/notes/1', (req, res) => {
    res.send(noteData);
});

function genNewNote(title, text) {
    let enteredNote = {
        id: unID(),
        title: title,
        text: text,
    };
    let dbJsonNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    dbJsonNotes.push(enteredNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(dbJsonNotes), (err) => {
        if (err) {
            console.log(err)
            res.status(500).json({
                err: "oh no"
            })
        } else {
            console.log(enteredNote);
            res.json(dbJsonNotes);
        }
    });

    return enteredNote
}

// server is listening for a request to create a note. .post recieve data to create data. Ability to create
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/api/notes', (req, res) => {
    //     let enteredNote = req.body.title;
    //    console.log(typeof(enteredNote))
    // let dbJsonNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    // enteredNote.id = unID();
    // dbJsonNotes.push(enteredNote); 
    console.log(req.body);
    console.log("TRETRAEEGARGRAGAEGRHGERAHAERHGAEHAEHHDBBH");
    let typedNoted = genNewNote(req.body.title, req.body.text)
    res.json(typedNoted)
});




app.listen(port)
// app.get('/api/terms', (req, res) => {
//     console.log('example at http://localhost: ${PORT}')
// })