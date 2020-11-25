// NoteTaker_Express-Node.js by DavidHarris
var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var notes = [];

app.get("/notes", function(req, res) {
    res.sendFile(path.join(_dirname, "public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(_dirname, "public/index.html"));
});

app.get("/api/notes"),
    function(req, res) {
        fs.readFileSync("./db/db.json", JSON, function(err, savedNotes) {
            if (err) {
                console.log(err)
            } else {
                res.json(savedNotes)
            };
        });
    };

app.post("/api/notes"),
    function(req, res) {
        var newNote = req.body;

        fs.appendFile("/db/db.json", newNote, (err) => {
            if (err) {
                console.log(err)
            } else {
                res.json(newNote)
            }
        })
    }