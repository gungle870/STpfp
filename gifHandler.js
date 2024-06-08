// gifHandler.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { UPLOADS_PATH } = require('../constants'); // Adjust the path as necessary

// Set up multer for file uploading
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOADS_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware to handle GIF uploads
function gifHandler(req, res, next) {
    upload.single('avatar')(req, res, function(err) {
        if (err) return res.status(500).send("Error uploading file.");

        if (req.file && path.extname(req.file.originalname).toLowerCase() === '.gif') {
            // Handle GIF file - for example, moving it to a specific directory
            const targetPath = path.join(req.user.directories.avatars, req.file.filename);
            fs.renameSync(req.file.path, targetPath);
            res.send({ message: 'GIF uploaded successfully', path: targetPath });
        } else {
            // Not a GIF, let other middleware handle it
            next();
        }
    });
}

module.exports = gifHandler;
