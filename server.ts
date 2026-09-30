import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findAudioFile(): string | null {
  const candidateDirs = [
    path.join(__dirname, 'public', 'audio'),
    path.join(__dirname, 'public'),
    path.join(__dirname, 'src', 'assets', 'audio'),
    path.join(__dirname, 'src', 'assets'),
    path.join(__dirname, 'src', 'audio'),
    __dirname,
  ];

  const audioExtensions = ['.mp3', '.m4a', '.wav', '.ogg', '.aac'];

  for (const dir of candidateDirs) {
    if (fs.existsSync(dir)) {
      try {
        const files = fs.readdirSync(dir);
        // Prioritize love-story.mp3
        for (const file of files) {
          if (file.toLowerCase().includes('love') && audioExtensions.some((ext) => file.toLowerCase().endsWith(ext))) {
            return path.join(dir, file);
          }
        }
        // Next any audio file
        for (const file of files) {
          if (audioExtensions.some((ext) => file.toLowerCase().endsWith(ext))) {
            return path.join(dir, file);
          }
        }
      } catch {
        // Continue
      }
    }
  }

  return null;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Serve static files in public directory
  app.use(express.static(path.join(__dirname, 'public')));

  // Direct MP3 upload endpoint
  app.post('/api/upload-audio', express.raw({ type: '*/*', limit: '50mb' }), (req, res) => {
    try {
      const audioDir = path.join(__dirname, 'public', 'audio');
      if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir, { recursive: true });
      }
      const targetPath = path.join(audioDir, 'love-story.mp3');
      fs.writeFileSync(targetPath, req.body);
      console.log('Successfully saved attached audio to:', targetPath);
      res.json({ success: true, url: '/api/audio' });
    } catch (err: any) {
      console.error('Failed to save audio file:', err);
      res.status(500).json({ error: err?.message || 'Failed to save' });
    }
  });

  // Dynamic Audio Stream endpoint: serves audio file wherever it was placed
  app.get('/api/audio', (req, res) => {
    const audioPath = findAudioFile();
    if (!audioPath) {
      res.status(404).send('Audio file not found yet');
      return;
    }
    const ext = path.extname(audioPath).toLowerCase();
    const mimeMap: Record<string, string> = {
      '.mp3': 'audio/mpeg',
      '.m4a': 'audio/mp4',
      '.wav': 'audio/wav',
      '.ogg': 'audio/ogg',
      '.aac': 'audio/aac',
    };
    res.setHeader('Content-Type', mimeMap[ext] || 'audio/mpeg');
    res.setHeader('Accept-Ranges', 'bytes');
    res.sendFile(audioPath);
  });

  // Audio status check endpoint
  app.get('/api/audio-status', (req, res) => {
    const audioPath = findAudioFile();
    res.json({
      exists: !!audioPath,
      url: audioPath ? '/api/audio' : null,
      fileName: audioPath ? path.basename(audioPath) : null,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
