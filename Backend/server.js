const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const { convertWordToPdf } = require('./converter');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .doc and .docx files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// File conversion endpoint
app.post('/convertFile', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const inputPath = req.file.path;
  const outputPath = path.join(uploadsDir, path.parse(req.file.filename).name + '.pdf');

  try {
    await convertWordToPdf(inputPath, outputPath);
    
    // Send the converted file
    res.download(outputPath, 'converted.pdf', async (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
      
      // Clean up files after sending
      try {
        await fs.unlink(inputPath);
        await fs.unlink(outputPath);
      } catch (cleanupError) {
        console.error('Error cleaning up files:', cleanupError);
      }
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'File conversion failed' });
    
    // Clean up input file on error
    try {
      await fs.unlink(inputPath);
    } catch (cleanupError) {
      console.error('Error cleaning up input file:', cleanupError);
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum size is 10MB.' });
    }
    return res.status(400).json({ error: err.message });
  }
  
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 