const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const notes = require('../../db/db');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    console.log(req.body);
    if (typeof req.body !== 'object'){
        res.end();
        return;
    }
    let db = fs.readFileSync(notes);
    db.push(req.body)
    fs.writeFileSync(notes, '../../db/db')
    res.json('../../db/db');
});

module.exports = router;