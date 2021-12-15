const express = require("express");
const app = express();
const port = 3000;
const projects = require("./routes/projects")
const cors = require("cors")

app.use(express.json());
app.use(cors());

app.use("/", projects)

app.listen(port, ()=>{
    console.log(`Your server is working on http://localhost:${port}`)
})