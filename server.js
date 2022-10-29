const express = require('express');
const cors = require('cors');

const languageRoutes = require('./routes/languages');
const app = express();
app.use(cors());
app.use(express.json());
app.use('./languages',languageRoutes);

require('dotenv').config();
const port = process.env.port ?? 8080;

app.get('/',(req,res) => {
    res.send('Welcome to the Pronunciation Assessment Data File')
})







app.listen(port,() => {
    console.log(`server stated on http://localhost:${port}`);
    console.log('Press CTRL + C to stop server');
})


