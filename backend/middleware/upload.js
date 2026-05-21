/**
 * CodeDNA
 * upload.js — core functionality with sharp resizing and WebP compression
 * exports: upload (compatible as function) + custom named properties
 * used_by: internal
 * rules: Follow project conventions, WebP resizing
 * developer: Farmanullah Ansari
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '..', 'uploads');
const dirs = [
  uploadDir,
  path.join(uploadDir, 'profile-pics'),
  path.join(uploadDir, 'cover-photos'),
  path.join(uploadDir, 'posts'),
  path.join(uploadDir, 'stories'),
  path.join(uploadDir, 'messages'),
  path.join(uploadDir, 'videos'),
  path.join(uploadDir, 'thumbnails'),
  path.join(uploadDir, 'audio'),
  path.join(uploadDir, 'documents'),
  path.join(uploadDir, 'defaults')
];
dirs.forEach(dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); });

// Default storage & filters for backward compatibility
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm',
    'audio/mpeg', 'audio/mp4', 'audio/ogg', 'audio/webm', 'audio/wav',
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain', 'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  fileFilter,
});

// ── CUSTOM COMPARTMENTALIZED STORAGE ──────────────────────────
const createStorage = (subfolder) => multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(uploadDir, subfolder)),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const userId = req.user ? req.user.id : 'anon';
    const name = `${userId}-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    cb(null, name);
  }
});

const imageFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only image files are allowed (JPG, PNG, GIF, WEBP)'), false);
};

const videoFilter = (req, file, cb) => {
  const allowed = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only video files are allowed (MP4, MOV, AVI, WEBM)'), false);
};

const mediaFilter = (req, file, cb) => {
  const allowed = [
    'image/jpeg','image/png','image/gif','image/webp',
    'video/mp4','video/quicktime','video/webm',
    'audio/mpeg','audio/mp4','audio/ogg','audio/webm','audio/wav',
    'application/pdf','application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('File type not supported for messages'), false);
};

// ── ATTACH CUSTOM PROPERTIES TO COMPATIBLE OBJECT ───────────────────
upload.uploadProfilePic = multer({
  storage: createStorage('profile-pics'),
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }  // 5MB
}).single('profilePicture');

upload.uploadCoverPhoto = multer({
  storage: createStorage('cover-photos'),
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
}).single('coverPhoto');

upload.uploadPostMedia = multer({
  storage: createStorage('posts'),
  fileFilter: (req, file, cb) => {
    imageFilter(req, file, (err, ok) => {
      if (ok) cb(null, true);
      else videoFilter(req, file, cb);
    });
  },
  limits: { fileSize: 50 * 1024 * 1024, files: 4 } // 50MB, max 4 files
}).array('media', 4);

upload.uploadMessageMedia = multer({
  storage: createStorage('messages'),
  fileFilter: mediaFilter,
  limits: { fileSize: 50 * 1024 * 1024 }
}).single('file');

upload.uploadStoryMedia = multer({
  storage: createStorage('stories'),
  fileFilter: (req, file, cb) => {
    imageFilter(req, file, (err, ok) => {
      if (ok) cb(null, true);
      else videoFilter(req, file, cb);
    });
  },
  limits: { fileSize: 50 * 1024 * 1024 }
}).single('media');

upload.uploadVideo = multer({
  storage: createStorage('videos'),
  fileFilter: videoFilter,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB
}).single('video');

// ── SHARP PROCESSORS ─────────────────────────────────────────
upload.processProfilePic = async (filePath, outputPath) => {
  await sharp(filePath)
    .resize(400, 400, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile(outputPath);
};

upload.processCoverPhoto = async (filePath, outputPath) => {
  await sharp(filePath)
    .resize(1640, 624, { fit: 'cover', position: 'center' })
    .webp({ quality: 85 })
    .toFile(outputPath);
};

upload.generateThumbnail = async (filePath, outputPath, size = 300) => {
  await sharp(filePath)
    .resize(size, size, { fit: 'cover', position: 'center' })
    .webp({ quality: 80 })
    .toFile(outputPath);
};

module.exports = upload;

