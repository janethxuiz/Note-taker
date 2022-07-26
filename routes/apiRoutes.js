const fs = require('fs');
const util = require('util');
const router = require('express').Router();
const path = require('path');

let notes = require('../db/notes.json');
const { json } = require('express');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: notes.length
    }
    console.log(newNote);
    res.json(newNote);
    notes.push(newNote);

    fs.writeFileSync(path.join(__dirname, '../db/notes.json'),
        JSON.stringify(notes)
    );
});

module.exports = router;