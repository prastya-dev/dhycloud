const express = require("express");
const dotenv = require("dotenv") ;
const routes = require("./routes/main");
dotenv.config();
const app = express();
const port = process.env.PORT

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log("Server Running di port " + port)
})