
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:competicao', async (req, res) => {
    const competicao = req.params.competicao; 
    const apiKey = process.env.FOOTBALL_DATA_API_KEY;
    const url = `https://api.football-data.org/v2/competitions/${competicao}/standings`;

    try {
        const response = await axios.get(url, {
            headers: { 'X-Auth-Token': apiKey }
        });
        console.log('API Response:', response.data); 
        res.json(response.data);
    } catch (err) {
        console.error('API Error:', err.message); 
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
