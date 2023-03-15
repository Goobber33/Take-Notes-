  const express = require('express');
  const fs = require('fs');
  const path = require('path');
  const { v4: uuidv4 } = require('uuid');

  const app = express();
  const PORT = process.env.PORT || 3001;

  // Middleware for parsing JSON and urlencoded form data
  app.use(express.static('miniature-eureka/develop/public'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // GET /notes should return the notes.html file
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'miniature-eureka/develop/public/notes.html'));
  });

  // GET / should return the index.html file
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'miniature-eureka/develop/public/index.html'));
  });

  // GET /api/notes should read the db.json file and return all saved notes as JSON
  app.get("/api/notes", (req, res) => {
      fs.readFile(path.join(__dirname, "miniature-eureka/develop/db/db.json"), "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to read notes from file." });
        }
    
        res.json(JSON.parse(data));
      });
    });
    

 