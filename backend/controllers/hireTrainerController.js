const HireRequest = require("../models/HireRequestModel");

exports.hireTrainer = async (req, res) => {
  try {
    const { userId, trainerId } = req.body;

    if (!userId || !trainerId) {
      return res
        .status(400)
        .json({ message: "User ID and Trainer ID are required" });
    }

    // Check if a request already exists
    const existingRequest = await HireRequest.findOne({ userId, trainerId });
    if (existingRequest) {
      return res.status(400).json({ message: "Hire request already sent" });
    }

    const newRequest = new HireRequest({
      userId,
      trainerId,
    });

    await newRequest.save();
    res.json({ message: "success", data: newRequest });
  } catch (error) {
    console.error("Error hiring trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get hire requests by trainerId and populate the user data
exports.getByTrainerId = async (req, res) => {
  try {
    const { trainerId } = req.params; // Getting trainerId from URL parameters
    const hireRequests = await HireRequest.find({ trainerId }).populate(
      "userId",
      "fullname username email age gender"
    ); // Populating user data

    res.json({ message: "success", data: hireRequests });
  } catch (error) {
    console.error("Error fetching hire requests by trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Express route to update the hire request status
exports.updateStatus = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;

  try {
    const updatedRequest = await HireRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Request status updated", data: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error });
  }
};
