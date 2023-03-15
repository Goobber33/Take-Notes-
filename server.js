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

  