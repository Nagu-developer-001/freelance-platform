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
const jobRoutes = require("./routes/job");
const authRoutes = require("./routes/auth");
const bidRoutes = require("./routes/bid");
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/bid", bidRoutes);
app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});