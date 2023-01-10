const {MongoClient}=require("mongodb");

let dbConnection;

module.exports={connectToDb: (cb)=>{
    MongoClient.connect("mongodb+srv://sapo:sapo@cluster0.h7uuyll.mongodb.net/Cluster0?retryWrites=true&w=majority")
    .then((client)=>{
        dbConnection=client.db()
        return cb();
    }).catch(err=>{
        console.log(err)
        return cb(err);
    })
    
},
//this function returns a dbcnnection so we can perform CRUD operations on DB
getDb:()=>dbConnection}
