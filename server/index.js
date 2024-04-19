require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const sqlite3 = require('sqlite3')
const fs = require('fs');
const router = require('./router/index')

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

function createDb(ready) {
    app.db = new sqlite3.Database('database/sqlite3.db');
    // Make sure tables and initial data exist in the database
    let stmts = fs.readFileSync('database/schema.sql').toString().split(/;\s*\n/);
    function next(err) {
        if (err) console.warn(err);
        let stmt = stmts.shift();
        if (stmt) app.db.run(stmt, next);
        else if (ready) ready();
    }
    next();
}
createDb();
app.use(function(req,rsp,next){
    req.db = app.db;
    next();
});

app.use('/api', router);

const start = async () => {
    try {
        app.listen(PORT, () => console.log("Listening on ", PORT))
    } catch {
        console.log(e)
    }
}

start();