// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for serving static files, parsing JSON, and parsing urlencoded form data
app.use(express.static(path.join(__dirname, 'Develop/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to serve notes.html when '/notes' is requested
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

// Route to serve index.html when the root path '/' is requested
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

// Route to get all saved notes from db.json and return them as JSON
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "Develop/db/db.json"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to read notes from file." });
    }

    res.json(JSON.parse(data)); 
  });
});

// Route to create a new note and save it to db.json
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  fs.readFile(path.join(__dirname, 'Develop/db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile(path.join(__dirname, 'Develop/db/db.json'), JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }
      res.json(newNote);
    });
  });
});
