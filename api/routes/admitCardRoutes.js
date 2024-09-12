const express = require('express');
const router = express.Router();
const db = require('../db.js');
const authenticateUser = require('../middleware/authMiddleWare.js'); // Import the middleware

// POST Admit Cards - Protected
router.post('/post-admit-cards', authenticateUser, (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: 'Title and description required'
        });
    }

    const query = 'INSERT INTO admit_cards (title, description) VALUES (?, ?)';

    db.query(query, [title, description], (err, results) => {
        if (err) {
            console.error('Error inserting admit card:', err);
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

// GET all Admit Cards - Public
router.get('/get-admit-cards', (req, res) => {
    const query = 'SELECT * FROM admit_cards';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching admit cards:', err);
            return res.status(500).json({
                message: 'Server error'
            });
        }
        res.json(results);
    });
});

// GET single Admit Card - Public
router.get('/get-admit-card/:id', (req, res) => {
    const admitCardId = req.params.id;

    const query = 'SELECT * FROM admit_cards WHERE id = ?';

    db.query(query, [admitCardId], (err, results) => {
        if (err) {
            console.error('Error fetching admit card:', err);
            return res.status(500).json({
                message: 'Server error'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Admit card not found'
            });
        }
        res.json(results[0]);
    });
});

// DELETE Admit Card - Protected
router.delete('/delete-admit-card/:id', authenticateUser, (req, res) => {
    const admitCardId = req.params.id;

    const query = 'DELETE FROM admit_cards WHERE id = ?';

    db.query(query, [admitCardId], (err, results) => {
        if (err) {
            console.error('Error deleting admit card:', err);
            return res.status(500).json({
                message: 'Server error'
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: 'Admit card not found'
            });
        }

        res.json({
            message: `Admit card with ID ${admitCardId} deleted successfully`
        });
    });
});

// UPDATE Admit Card - Protected
router.put('/update-admit-card/:id', authenticateUser, (req, res) => {
    const admitCardId = req.params.id;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const query = 'UPDATE admit_cards SET title = ?, description = ? WHERE id = ?';
    db.query(query, [title, description, admitCardId], (err, results) => {
        if (err) {
            console.error('Error updating admit card:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Admit card not found' });
        }

        res.json({
            message: `Admit card with ID ${admitCardId} updated successfully`,
            title,
            description
        });
    });
});

module.exports = router;
