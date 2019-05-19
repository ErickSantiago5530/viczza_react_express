const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');


const app = express();
const port = process.env.PORT || 5000;

const selectAll = 'SELECT * FROM news';
const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'viczzajs'
});

connection.connect(err=>{
  if(err){
    return err;
  }
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hola desde home');
});

app.get('/news', (req, res) => {
  if (connection) {
    connection.query(selectAll,(err,results)=>{
      if(err){
        return res.send(err)
      }else{
        return res.json({
          data:results
        })
      }
    })
  }
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
