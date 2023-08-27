const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const { originalname, mimetype, size } = req.file;

  const metadata = {
    filename: originalname,
    filetype: mimetype,
    filesize: size
  };

  res.json(metadata);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});