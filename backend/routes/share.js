const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Simple in-memory storage for prototype
const sessions = new Map();

// Generate a random string for the session ID
const generateSessionId = () => crypto.randomBytes(4).toString('hex');

// POST /api/share - Create a new shared session
router.post('/', (req, res) => {
  try {
    const { profile, history = [] } = req.body;

    if (!profile) {
      return res.status(400).json({ success: false, error: 'Profile is required to share session' });
    }

    const sessionId = generateSessionId();
    
    sessions.set(sessionId, {
      profile,
      history,
      createdAt: new Date().toISOString()
    });

    res.json({
      success: true,
      sessionId
    });
  } catch (error) {
    console.error("Share route error:", error.message);
    res.status(500).json({
      success: false,
      error: 'Unable to create share session'
    });
  }
});

// GET /api/share/:sessionId - Retrieve a shared session
router.get('/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    
    if (!sessions.has(sessionId)) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    const sessionData = sessions.get(sessionId);
    
    res.json({
      success: true,
      data: sessionData
    });
  } catch (error) {
    console.error("Share retrieval error:", error.message);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve share session'
    });
  }
});

module.exports = router;
