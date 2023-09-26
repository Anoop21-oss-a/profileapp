const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbname="company_db"
const cliname="employees"
//const { response } = require('express');
app.use(bodyparser.json())
app.use('/',express.static(__dirname + '/dist'))

app.get("/get-profile", async function(req,res){
    //connet to database
    await client.connect()
    console.log("connected successfully")
    //initiate the database
    const db=client.db(dbname)
    const collection =db.collection(cliname)
    //get data from database
    const result=await collection.findOne({id:1})
    response={}
    if(result!=null){
     response={
        name:result.name,
        email:result.email,
        interest:result.interest
    }}
    res.send(response)
})
app.post("/update-profile",async function(req,res){
    const payload=req.body
    console.log(payload)
    if(Object.keys(payload).length===0)
    {
        res.send({error:"empty payload"})
    }
    else{
        //updating user profile
        //connet to database
         await client.connect()
         console.log("connected successfully")
        //initiate the database
         const db=client.db(dbname)
         const collection =db.collection(cliname)
        //save data in database
        payload['id']=1
        const updateVlaue={$set:payload}
        await collection.updateOne({id:1},updateVlaue,{upsert:true})
    res.send({info:"user profile update successfully"})
    }
})

app.listen(3000,function(){
    console.log("app listening on port 3000")
})