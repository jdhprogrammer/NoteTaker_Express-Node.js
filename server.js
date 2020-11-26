// NoteTaker_Express-Node.js by DavidHarris
var express = require("express");
var path = require("path");
var fs = require("fs");
const db = require('./db/db.json');

var PORT = process.env.PORT || 9000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Read from db.json
app.get("/api/notes", function(req, res) {
    res.json(db.map((note, i) => ({...note, id: i + "" })))
});

// Append to db.json
app.post("/api/notes", function(req, res) {

    db.push(req.body);

    fs.writeFileSync("./db/db.json", JSON.stringify(db, null, '\t'))

    res.json(req.body);
});

// Delete note from db.json  ????
app.delete("/api/notes/:id", function(req, res) {
    // var noteId = req.params.name;
    // console.log(noteId); or... 
    db.splice(req.params.id, 1);

    // for (var i = 0; i < savedNotes.length; i++) {
    //     if (chosen === notes[i].routeName) {
    //         return res.json(notes[i]);});

    fs.writeFileSync(".db/db.json"), JSON.stringify(db, null, '\t');

    res.status(200).end();
});

app.listen(PORT, function() {
    console.log("APP listening on PORT: " + PORT);
});