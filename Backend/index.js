const express = require('express');
const connectToMongo = require("./db");

const app = express()

//Connect to mongodb databse from db.js file
connectToMongo();

const port = 5000;

//Use request body to parse data as middleware
app.use(express.json());

//Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening on port http://localhost:${port}`))