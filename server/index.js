const express = require('express');
const cors= require('cors');
const app= express();
var admin = require("firebase-admin");
var serviceAccount = require("./serviceaccountkey.json");
app.use(express.json())
app.use(cors())

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://contentautomation-b3e19-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const db= admin.firestore();

app.post("/send",async(req,res)=>{
  console.log(req.body);
  let docname= Date.now().toString();
  const MessageData = {
    Username: req.body.Username,
    Message: req.body.Message,
  };
  return db.collection(req.body.ID).doc(docname).set(MessageData).then(()=>{
    console.log("Message sent");
    res.send({msg: "Message added successfully"})
  })
})


app.get("/get/:id",async(req,res)=>{
  const group = db.collection(req.params.id);
  const snapshot= await group.get();
  dataarray=[]
  snapshot.forEach(doc => {
    // console.log(doc.id, '=>', doc.data()["Username"],"=>",doc.data());
    console.log(doc.id,"=>",doc.data());
    let databody={
      Username:doc.data()["Username"],
      Message:doc.data()["Message"],
      Timestamp :doc.id,
    };
    dataarray.push(databody);
  });
  // console.log(dataarray)
  res.send(dataarray);
})

app.listen(5000,function(){ console.log("Listening on Port 5000")});


