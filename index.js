// app.js or server.js
const express = require('express');
const app = express();
const gifHandler = require('./path/to/gifHandler'); // Ensure the path is correct
const existingUploadHandler = require('./path/to/existingUploadHandler'); // This should be your existing handler for uploads

// Set up a route that uses the gifHandler middleware
app.post('/upload', gifHandler, existingUploadHandler);

// Other Express setup, like listening on a port
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
