const express = require("express");
const Job = require("../models/job.js");

const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/all", async (req, res) => {
    const jobs = await Job.find().populate("createdBy");
    res.json(jobs);
});

module.exports = router;