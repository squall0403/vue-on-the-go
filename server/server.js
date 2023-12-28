const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser')
// fire store
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const serviceAccount = require('./wemis-dxa-54bd202bef42.json');

initializeApp({
   credential: cert(serviceAccount)
});

const db = getFirestore();
let expenseRef;
//

const app = express()
const port = 8080

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
   res.send('')
})

app.post("/expense", async (req, res) => {
   expenseRef = db.collection('expense');
   const maxQuery = await expenseRef.where('expense_id', '>', 0).orderBy('expense_id', 'desc').limit(1).get();
   let maxId
   maxQuery.forEach(n => {
      maxId = n.data().expense_id + 1
   })
   let today = new Date
   // let date = today.getDate()
   // let month = today.getMonth() + 1
   // let year = today.getFullYear()
   // const curDate = `${date}/${month}/${year}`
   var data = {
      expense_id: maxId,
      date: today,
      expense: req.body.expense,
      amount: req.body.amount,
      note: req.body.note,
   }
   db.collection('expense').doc(maxId.toString()).set(data).then(result=>{
      res.send(result.id);
   });
})

app.get("/expense", async (req, res, next) => {
   expenseRef = db.collection('expense');
   const doc = await expenseRef.get();
   if (doc.empty) {
      console.log('No matching documents.');
      return;
   }
   let data = []
   doc.forEach(doc => {
      data.push(doc.data())
   });
   res.json(
      { "data": data }
   )
});

app.get("/expense/view/:id", async (req, res, next) => {
   const docid = [req.params.id].toString();
   expenseRef = db.collection('expense').doc(docid);
   const doc = await expenseRef.get();
   if (doc.empty) {
      console.log('No matching documents.');
      return;
   }
   const results = doc.data()
   const date = new Date(results.date._seconds*1000)
   results.date = date
   res.json(
      results
   )
});

app.patch("/expense/edit/:id", async(req, res, ) => {
   const docid = [req.params.id].toString();
   var data = {
      expense: req.body.expense,
      amount: req.body.amount,
      note: req.body.note,
   }
   expenseRef = db.collection('expense').doc(docid);
   await expenseRef.update(data).then(result=>{
      res.send(result.id)
   });
   
});

app.delete("/expense/delete/:id", async(req, res) => {
   const docid = [req.params.id].toString();
   await db.collection('expense').doc(docid).delete().then(result=>{
      res.send(result.id)
   });
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})