const Contest = require("../../models/contest.model");

// GET ALL UPCOMING CONTESTS (Automatically filtered by date)
exports.getContests = async (req, res) => {
  try {
    // Bring contests that happen in the future, or happened very recently (allow up to 2 hours past)
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const contests = await Contest.find({ startTime: { $gte: twoHoursAgo } })
      .populate("addedBy", "name")
      .sort({ startTime: 1 }); // Ascending order (soonest first)
      
    res.status(200).json({ success: true, data: contests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD A NEW CONTEST (SENIOR ONLY)
exports.addContest = async (req, res) => {
  try {
    const { title, platform, link, startTime } = req.body;

    if (req.placementRole !== "senior") {
        return res.status(403).json({ message: "Only seniors can post upcoming contests." });
    }

    const contest = new Contest({
      title,
      platform,
      link,
      startTime,
      addedBy: req.user.id
    });

    await contest.save();
    res.status(201).json({ success: true, data: contest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
