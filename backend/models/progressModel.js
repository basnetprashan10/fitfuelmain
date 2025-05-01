const weightProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  progress: { type: Array, required: true },
});

const WeightProgress = mongoose.model("WeightProgress", weightProgressSchema);
