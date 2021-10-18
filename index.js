const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'conFusion';

const crudOperations = require('./crudOperations');

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log("Connected to Server.");
    const db = client.db(dbName);
    crudOperations.insertDocument(db, { name: "Vadonut", description: "Test"},
    "dishes", (result) => {
        console.log("Insert Document:\n", result.ops);
        crudOperations.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);
            crudOperations.updateDocument(db, { name: "Vadonut" },
            { description: "Updated Test" }, "dishes",
            (result) => {
                console.log("Updated Document:\n", result.result);
                crudOperations.findDocuments(db, "dishes", (docs) => {
                    console.log("Found Updated Documents:\n", docs);
                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result);
                        client.close();
                    });
                });
            });
        });
    });
});