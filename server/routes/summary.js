const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Get daily summary
router.get('/', async (req, res) => {
    try {
        const connection = await db.getConnection();
        const [summaries] = await connection.execute(
            'SELECT * FROM daily_summary ORDER BY summary_date DESC'
        );
        connection.release();

        res.json({ success: true, data: summaries });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
