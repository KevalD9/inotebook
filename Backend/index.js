const express = require('express');
const connectToMongo = require("./db");

const app = express()

//Connect to mongodb databse from db.js file
connectToMongo();

const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening on port ${port}!`))