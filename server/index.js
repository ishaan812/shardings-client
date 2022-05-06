const express = require('express');
const cors= require('cors');
const app= express();
var admin = require("firebase-admin");
var serviceAccount = require("../../serviceaccountkey.json");
app.use(express.json())
app.use(cors())

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://contentautomation-b3e19-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db= admin.firestore();

app.post("/group",async(req,res)=>{
    console.log(req.body);
    const UserData = {
      Username: req.body.Username,
    };
    return db.collection("Users").doc(req.body.ID).set(UserData).then(()=>{
      console.log("Username added");
      res.send({msg: "Username added successfully"})
    })
})

app.post("/send",async(req,res)=>{
  console.log(req.body);
  let docname= Date.now().toString();
  const MessageData = {
    Username: req.body.Username,
    Message: req.body.Message
  };
  return db.collection("ABCD").doc(docname).set(MessageData).then(()=>{
    console.log("Message sent");
    res.send({msg: "Message added successfully"})
  })
})

app.get("/users",(req,res)=>{
  db.collection("Users").doc("ABCD").get().then(doc=>{
    res.send(doc["_fieldsProto"]["Username"]["stringValue"]); 
    console.log(doc["_fieldsProto"]["Username"]["stringValue"]);
  })
})

app.get("/get",async(req,res)=>{
  const group = db.collection("ABCD");
  const snapshot= await group.get();
  dataarray=[]
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data()["Username"]);
    let databody={
      Username:doc.data()["Username"],
      Message:doc.data()["Message"],
    };
    dataarray.push(databody);
  });
  console.log(dataarray)
  res.send(dataarray);
})

app.listen(5000,function(){ console.log("Listening on Port 5000")});


