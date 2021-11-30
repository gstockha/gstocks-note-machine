const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const idList = [];

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

router.post('/notes', (req, res) => {
    if (typeof req.body === 'object'){
        let db = fs.readFileSync(path.join(__dirname, '../../db/db.json'), 'utf8');
        db = JSON.parse(db);
        let alreadyHas = false;
        if (req.body.title){
            for (let i = 0; i < db.length; i++){
                if (db[i].title === req.body.title){
                    alreadyHas = true;
                    break;
                }
            }
        }
        else alreadyHas = true;
        if (!alreadyHas){
            req.body.id = generateID();
            db.unshift(req.body);
            console.log(db);
            fs.writeFileSync(path.join(__dirname, '../../db/db.json'),JSON.stringify(db));
        }
        res.sendFile(path.join(__dirname, '../../db/db.json'));
    }
    else{
        res.status(400);
        res.end();
    }
});

router.delete('/notes/:id', (req,res)=>{
    console.log(req.params.id);
    if (req.params.id){
        let db = fs.readFileSync(path.join(__dirname, '../../db/db.json'), 'utf8');
        db = JSON.parse(db);
        for (let i = 0; i < db.length; i++){
            if (db[i].id == req.params.id){
                db.splice(i,1);
                break;
            }
        }
        fs.writeFileSync(path.join(__dirname, '../../db/db.json'),JSON.stringify(db));
        res.sendFile(path.join(__dirname, '../../db/db.json'));
    }
    else{
        res.status(400);
        res.end();
    }
})

function generateID(){
    let found = false;
    let rand;
    while(!found){
        rand = Math.floor(Math.random() * 10000);
        found = (!idList.includes(rand));
    }
    return rand;
}

module.exports = router;