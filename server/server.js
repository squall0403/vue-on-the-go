const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const dbo = require("./db/db.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
 res.send('/')
})

app.post("/expense", (req, res) => {
 var sql = 'INSERT INTO expense (date, expense,amount,note) VALUES (?,?,?,?)'
 const curDate=new Date 
 var data = {
  date: curDate.toLocaleString("vn-vi").split(',')[0] ,
  expense: req.body.expense,
  amount: req.body.amount,
  note: req.body.note,
 }
 var params = [data.date,data.expense,data.amount,data.note]
 dbo.new_expense(sql, params).then((results) => {
  res.json({
   "data": data
})
 });
})

app.get("/expense", (req, res, next) => {
 var sql = "SELECT * FROM expense"
 dbo.get_all(sql).then((results) => {
  res.json(results)
 });
});

app.get("/expense/view/:id", (req, res, next) => {
 var sql = "SELECT * FROM expense WHERE expense_id = ?"
 var params = [req.params.id]
 dbo.get_single(sql, params).then((results) => {
  res.json(results)
 });
});

app.delete("/expense/delete/:id", (req, res, next) => {
 var sql = "DELETE FROM expense WHERE expense_id = ?"
 var params = [req.params.id]
 dbo.delete_single(sql, params).then((results) => {
  res.json('The expense has been deleted')
 });
});

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
})