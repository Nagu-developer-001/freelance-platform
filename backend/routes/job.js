const express = require("express");
const Job = require("../models/job.js");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "client") {
            return res.status(403).json({ message: "Only clients can post jobs" });
        }

        const job = new Job({
            ...req.body,
            createdBy: req.user._id
        });

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