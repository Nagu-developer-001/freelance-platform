const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());



mongoose.connect("mongodb://127.0.0.1:27017/freelanceDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});