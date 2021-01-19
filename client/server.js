const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.static(__dirname))
app.listen(3000, ()=>console.log('App running on port 3000'))