// dependencies
const express = require("express");
const mongoose = require("mongoose");
// instance of express
const app = express();
// server port
const PORT = process.env.PORT || 3001;


const path=require("path")

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// last bit to get working
app.use(express.static("client/build"));


app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

// if route doesn't match server up react
// send path to html
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

// db connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/mern-starter", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected to db");
  })
  .catch((err) => {
    console.log("unable to connect to db");
    console.log(err);
  });

// event listener for port
app.listen(PORT, () => {
  console.log(`Express server on http://localhost:${PORT}`);
});
