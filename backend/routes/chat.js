const express = require('express');
const router = express.Router();
const { generateTwinResponse } = require('../services/gemini');

router.post('/', async (req, res) => {
  try {
    const { message, personality, history = [] } = req.body;

    if (!message || !personality) {
      return res.status(400).json({ success: false, error: 'Message and personality are required' });
    }

    const reply = await generateTwinResponse(message, personality, history);
    
    res.json({
      success: true,
      reply
    });
  } catch (error) {
    // Explicitly not exposing the error details which might contain the API key or raw errors
    console.error("Chat route error:", error.message);
    res.status(500).json({
      success: false,
      error: 'Unable to generate response'
    });
  }
});

module.exports = router;
