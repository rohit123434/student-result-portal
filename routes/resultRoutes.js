import express from "express";
import Result from "../models/Result.js";
const router = express.Router();

// Admin – Add new result
router.post("/", async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Admin – Update existing result by Mongo _id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Result.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Result not found" });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Admin – Delete result by Mongo _id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Result.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Result not found" });
    res.json({ message: "Result deleted successfully" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Student – Get result by shortId
router.get("/short/:shortId", async (req, res) => {
  try {
    const result = await Result.findOne({ shortId: req.params.shortId });
    if (!result) return res.status(404).json({ error: "Result not found" });

    const data = result.toObject();
    data.total = result.total();
    data.percentage = result.percentage();
    data.grade = result.grade();

    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
