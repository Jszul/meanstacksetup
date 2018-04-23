const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://admin:pass@ds153198.mlab.com:53198/node_db', (err, client) => {
        if (err) return console.log(err);
        
        let db = client.db('node_db');
        console.log('Mongo DB Connected.')
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/quotes', (req, res) => {
    connection((db) => {
        db.collection('quotes')
            .find()
            .toArray()
            .then((quotes) => {
                response.data = quotes;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;