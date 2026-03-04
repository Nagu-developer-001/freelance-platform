const express = require("express");
//const router = express.Router();
const Bid = require("../models/Bid");
const authMiddleware = require("../middleware/authMiddleware.js");   // ✅ ADD THIS

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
// ✅ Create Bid
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { jobId, amount, proposal } = req.body;

    const bid = new Bid({
      job: jobId,
      freelancer: req.user.id,
      amount,
      proposal,
    });

    await bid.save();
    res.json(bid);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get Bids for a Job (Client View)
router.get("/job/:jobId", authMiddleware, async (req, res) => {
  try {
    const bids = await Bid.find({ job: req.params.jobId })
      .populate("freelancer", "name email");

    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;