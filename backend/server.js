const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
const chatRouter = require('./routes/chat');
const shareRouter = require('./routes/share');

app.use('/api/chat', chatRouter);
app.use('/api/share', shareRouter);

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
