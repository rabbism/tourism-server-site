const express = require('express')
const app = express()
var cors = require('cors')
const { MongoClient } = require('mongodb');
// import { MongoClient } from "mongodb";
const port = process.env.PORT || 3000 ;
app.use(cors())
app.use(express.json())
// tourServices
// Zg2pWkjHS6Nnnamu
const uri = "mongodb+srv://tourServices:Zg2pWkjHS6Nnnamu@cluster0.t8s5g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("Travel_Services");
      const serviceCollection = database.collection("serives");
    //   Get Api
      app.get('/services',async (req,res) =>{
          const cursor = serviceCollection.find({});
          const services = await cursor.toArray();
          res.send(services);
      })
    //   Post API
     app.post('/services', async(req,res) =>{
         const netUser =req.body;
         const result =await serviceCollection.insertOne(netUser);
         console.log('getnew user', res.body)
         console.log('add user',result)
         res.json(result)
     })
   
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})