// we create 'users' collection in newdb database
var url = "mongodb://smokers:Smokers%40moshi@197.248.87.61:27017/lunna_db?authSource=admin&readPreference=primary&directConnection=true&ssl=false";
 
// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;
 
// make client connect to mongo service
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // db pointing to newdb
    console.log("Switched to "+db.databaseName+" database");
 
    // documents to be inserted
    var docs = [{ name: "Udat", age: "21" },
                { name: "Karthik", age: "24" },
                { name: "Anil", age: "23" }];
     
    // insert multiple documents to 'users' collection using insertOne
    db.collection("mm_users").insertMany(docs, function(err, res) {
        if (err) throw err;
        console.log(res.insertedCount+" documents inserted");
        // close the connection to db when you are done with it
        db.close();
    });
});