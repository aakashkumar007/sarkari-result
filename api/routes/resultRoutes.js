const express = require('express');
const router = express.Router();
const db = require('../db.js');
const authenticateUser = require('../middleware/authMiddleWare.js'); // Import the middleware

// POST Results - Protected
router.post('/post-results', authenticateUser, (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: 'Job title and description required'
        });
    }

    const query = 'INSERT INTO result_listings (title, description) VALUES (?, ?)';

    db.query(query, [title, description], (err, results) => {
        if (err) {
            console.error('Error inserting result listing:', err);
            return res.status(500).json({
                message: 'Server error'
            });
        }
        res.status(201).json({
            id: results.insertId,
            title,
            description
        });
    });
});

// GET all Results - Public
router.get('/get-results', (req, res) => {
    const query = 'SELECT * FROM result_listings';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching result listings:', err);
            return res.status(500).json({
                message: 'Server error'
            });
        }
        res.json(results);
    });
});

// GET single Result - Public
router.get('/get-result/:id', (req, res) => {
    const resultId = req.params.id;

    const query = 'SELECT * FROM result_listings WHERE id = ?';

    db.query(query, [resultId], (err, results) => {
        if (err) {
            console.error('Error fetching result listing:', err);
            return res.status(500).json({
                message: 'Server error'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Result not found'
            });
        }
        res.json(results[0]);
    });
});

// DELETE Result - Protected
router.delete('/delete-result/:id', authenticateUser, (req, res) => {
    const resultId = req.params.id;

    const query = 'DELETE FROM result_listings WHERE id = ?';

    db.query(query, [resultId], (err, results) => {
        if (err) {
            console.error('Error deleting result listing:', err);
            return res.status(500).json({
                message: 'Server error'
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: 'Result not found'
            });
        }

        res.json({
            message: `Result with ID ${resultId} deleted successfully`
        });
    });
});

// UPDATE Result - Protected
router.put('/update-result/:id', authenticateUser, (req, res) => {
    const resultId = req.params.id;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Job title and description are required' });
    }

    const query = 'UPDATE result_listings SET title = ?, description = ? WHERE id = ?';
    db.query(query, [title, description, resultId], (err, results) => {
        if (err) {
            console.error('Error updating result listing:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Result not found' });
        }

        res.json({
            message: `Result with ID ${resultId} updated successfully`,
            title,
            description
        });
    });
});

module.exports = router;
