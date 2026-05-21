/**
 * CodeDNA
 * userPhotoController.js — user profile & cover photos uploads/urls handling controller
 * exports: uploadProfilePic, uploadCoverPhoto, updatePhotoFromUrl
 * used_by: routes/users.js
 * developer: Farmanullah Ansari
 */

const path = require('path');
const fs = require('fs');
const axios = require('axios');
const User = require('../models/User');
const upload = require('../middleware/upload'); // Contains custom processors

// ── UPLOAD PROFILE PICTURE (from file) ───────────────────────
exports.uploadProfilePic = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const inputPath = req.file.path;
    const outputFilename = `processed-${req.file.filename.replace(path.extname(req.file.filename), '.webp')}`;
    const outputPath = path.join('uploads/profile-pics', outputFilename);

    // Process with sharp
    await upload.processProfilePic(inputPath, outputPath);

    // Delete original (keep processed)
    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }

    const picUrl = `/uploads/profile-pics/${outputFilename}`;

    // Update user in DB
    await User.findByIdAndUpdate(req.user.id, { profilePicture: picUrl });

    res.json({ success: true, profilePicture: picUrl });
  } catch (err) {
    next(err);
  }
};

// ── UPLOAD COVER PHOTO (from file) ───────────────────────────
exports.uploadCoverPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const inputPath = req.file.path;
    const outputFilename = `processed-${req.file.filename.replace(path.extname(req.file.filename), '.webp')}`;
    const outputPath = path.join('uploads/cover-photos', outputFilename);

    await upload.processCoverPhoto(inputPath, outputPath);
    
    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }

    const coverUrl = `/uploads/cover-photos/${outputFilename}`;
    await User.findByIdAndUpdate(req.user.id, { coverPicture: coverUrl });

    res.json({ success: true, coverPhoto: coverUrl, coverPicture: coverUrl });
  } catch (err) {
    next(err);
  }
};

// ── UPDATE PHOTO FROM URL ─────────────────────────────────────
// Users can paste a URL to instantly set their photo
exports.updatePhotoFromUrl = async (req, res, next) => {
  try {
    const { type, url } = req.body; // type: 'profile' | 'cover'
    if (!['profile', 'cover'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid type.' });
    }
    if (!url || !url.startsWith('http')) {
      return res.status(400).json({ success: false, message: 'Valid URL required.' });
    }

    // Fetch image via backend proxy to avoid CORS issues
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 10000,
      headers: { 'Accept': 'image/*' }
    });

    const contentType = response.headers['content-type'];
    if (!contentType?.startsWith('image/')) {
      return res.status(400).json({ success: false, message: 'URL must point to an image.' });
    }

    // Save to disk
    const ext = '.webp';
    const filename = `url-${req.user.id}-${Date.now()}${ext}`;
    const folder = type === 'profile' ? 'profile-pics' : 'cover-photos';
    const outputPath = path.join(`uploads/${folder}`, filename);

    const buffer = Buffer.from(response.data);
    if (type === 'profile') {
      await require('sharp')(buffer).resize(400, 400, { fit: 'cover' }).webp({ quality: 85 }).toFile(outputPath);
    } else {
      await require('sharp')(buffer).resize(1640, 624, { fit: 'cover' }).webp({ quality: 85 }).toFile(outputPath);
    }

    const savedUrl = `/uploads/${folder}/${filename}`;
    const updateField = type === 'profile' ? { profilePicture: savedUrl } : { coverPicture: savedUrl };
    await User.findByIdAndUpdate(req.user.id, updateField);

    res.json({ success: true, [type === 'profile' ? 'profilePicture' : 'coverPhoto']: savedUrl, coverPicture: savedUrl });
  } catch (err) {
    if (err.response || err.code === 'ECONNREFUSED') {
      return res.status(400).json({ success: false, message: 'Could not load image from that URL.' });
    }
    next(err);
  }
};
