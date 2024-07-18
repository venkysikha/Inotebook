const connectToMongo = require('./db');
const express = require('express');
connectToMongo();

const app = express();
const port = 3000;

app.use(express.json());
// Connect to MongoDB
app.get('/',(req,res)=>
{
  res.send('hello venky');
}),

// available routes 
app.use('/api/auth',require('./routes/auth'));
app.use('/api/note',require('./routes/note'));

app.listen(port,()=>
{
  console.log(`example app listening at http://localhost:${port}`);
})

app.use(express.json());
