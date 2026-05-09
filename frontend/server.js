const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5173;

// Serve the static files from the Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// Redirect all requests to index.html (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
