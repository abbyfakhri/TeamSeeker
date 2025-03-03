require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT;
const BASE_PATH = process.env.BASE_PATH || '/api';
app.use(express.json());
app.use(cors());
app.use(BASE_PATH, routes)

function serverConn(){
     app.listen(PORT, () =>{
          console.log(`Server is running on port: ${PORT}`)
          console.log(`Server running on http://localhost:${PORT}`)
     })
}

module.exports = serverConn;