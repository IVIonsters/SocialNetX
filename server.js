//Import Dependencies
const express = require('express');
require('dotenv').config();
const db = require('./config/connection');
const routes = require('./routes');

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Start the server on the port
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});