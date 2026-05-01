const express = require("express");
const dotenv = require("dotenv") ;
const routes = require("./routes/main");
dotenv.config();
const app = express();
const port = process.env.PORT


const cors = require('cors')

app.use(cors({
  origin: [
    'https://testerr.dhycloud.online',
    'https://dhycloud.online',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log("Server Running di port " + port)
})