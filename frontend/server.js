import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5173;

console.log('--- Frontend Server Startup ---');
console.log(`Working Directory: ${process.cwd()}`);
console.log(`__dirname: ${__dirname}`);
console.log(`Target PORT: ${PORT}`);

// Serve the static files from the Vite build
const distPath = path.join(__dirname, 'dist');
console.log(`Serving static files from: ${distPath}`);

app.use(express.static(distPath));

// Redirect all requests to index.html (for React Router)
app.get('*splat', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Frontend Web Service is listening on 0.0.0.0:${PORT}`);
});
