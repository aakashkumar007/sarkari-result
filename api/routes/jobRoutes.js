const express = require("express");
const router = express.Router();
const db = require("../db"); // Assuming you have a db.js file for database connection
const authenticateUser = require('../middleware/authMiddleWare.js');

// Create a new job listing
router.post("/post-jobs",authenticateUser, (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Job title and description are required" });
  }

  const query = "INSERT INTO job_listings (title, description) VALUES (?, ?)";
  
  db.query(query, [title, description], (err, results) => {
    if (err) {
      console.error("Error inserting job listing:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.status(201).json({ id: results.insertId, title, description });
  });
});

// Get all job listings
router.get("/get-jobs", (req, res) => {
  
  const query = "SELECT * FROM job_listings";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching job listings:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
});


// Get a single job listing by ID
router.get("/get-job/:id", (req, res) => {
  const jobId = req.params.id;

  const query = "SELECT * FROM job_listings WHERE id = ?";
  db.query(query, [jobId], (err, results) => {
    if (err) {
      console.error("Error fetching job listing:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(results[0]); // Return the first (and only) result
  });
});

// Delete a job listing by ID
router.delete("/delete-job/:id",authenticateUser, (req, res) => {
  const jobId = req.params.id;
  console.log(jobId);

  const query = "DELETE FROM job_listings WHERE id = ?";
  db.query(query, [jobId], (err, results) => {
    if (err) {
      console.error("Error deleting job listing:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: `Job with ID ${jobId} deleted successfully` });
  });
});

// Update a job listing by ID
router.put("/update-job/:id",authenticateUser, (req, res) => {
  const jobId = req.params.id;
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Job title and description are required" });
  }

  const query =
    "UPDATE job_listings SET title = ?, description = ? WHERE id = ?";
  db.query(query, [title, description, jobId], (err, results) => {
    if (err) {
      console.error("Error updating job listing:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      message: `Job with ID ${jobId} updated successfully`,
      title,
      description,
    });
  });
});


module.exports = router;
