const express = require("express");
const Bid = require("../models/Bid");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "freelancer") {
            return res.status(403).json({ message: "Only freelancers can bid" });
        }

        const bid = new Bid({
            ...req.body,
            freelancerId: req.user._id
        });

        await bid.save();
        res.json(bid);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/job/:jobId", async (req, res) => {
    const bids = await Bid.find({ jobId: req.params.jobId })
        .populate("freelancerId", "name email");
    res.json(bids);
});

router.put("/accept/:bidId", authMiddleware, async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.bidId).populate("jobId");

        if (bid.jobId.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        bid.status = "accepted";
        await bid.save();

        res.json({ message: "Bid accepted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;