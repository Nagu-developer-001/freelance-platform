const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    proposal: String,
    status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Bid", bidSchema);