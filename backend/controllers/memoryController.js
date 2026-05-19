/**
 * CodeDNA
 * memoryController.js — AI Video Compilation
 */

const Post = require('../models/Post');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const generateRemix = async (req, res) => {
  try {
    const userId = req.user.id;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // 1. Get top posts with images from the last week
    const posts = await Post.find({
      user: userId,
      image: { $exists: true, $ne: '' },
      createdAt: { $gte: sevenDaysAgo }
    })
    .sort({ 'likes.length': -1, 'comments.length': -1 })
    .limit(5);

    if (posts.length < 2) {
      return res.status(400).json({ 
        message: 'You need at least 2 photo posts from this week to generate a remix.' 
      });
    }

    const outputDir = path.join(__dirname, '../public/uploads/memories');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const videoName = `remix-${userId}-${Date.now()}.mp4`;
    const outputPath = path.join(outputDir, videoName);
    const tempImagesDir = path.join(outputDir, `temp-${userId}`);
    
    if (!fs.existsSync(tempImagesDir)) {
      fs.mkdirSync(tempImagesDir);
    }

    // 2. Download images locally for ffmpeg
    const imagePaths = [];
    for (let i = 0; i < posts.length; i++) {
      const imageUrl = posts[i].image;
      const localPath = path.join(tempImagesDir, `img-${i}.jpg`);
      
      try {
        const response = await axios({
          url: imageUrl,
          responseType: 'stream',
        });
        
        await new Promise((resolve, reject) => {
          const writer = fs.createWriteStream(localPath);
          response.data.pipe(writer);
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
        
        imagePaths.push(localPath);
      } catch (err) {
        console.error(`Failed to download image ${i}`, err);
      }
    }

    if (imagePaths.length < 2) {
      return res.status(400).json({ message: 'Failed to process post images.' });
    }

    // 3. Create Video using ffmpeg
    // Slideshow: 2 seconds per image
    const videoCreator = ffmpeg();
    
    imagePaths.forEach(img => {
      videoCreator.input(img).loop(2);
    });

    videoCreator
      .on('error', (err) => {
        console.error('FFmpeg error:', err);
        res.status(500).json({ message: 'FFmpeg processing failed' });
        // Cleanup
        imagePaths.forEach(p => fs.unlinkSync(p));
        fs.rmdirSync(tempImagesDir);
      })
      .on('end', () => {
        console.log('FFmpeg finished');
        res.json({ 
          message: 'Remix generated!', 
          videoUrl: `/uploads/memories/${videoName}` 
        });
        // Cleanup temp images
        imagePaths.forEach(p => fs.unlinkSync(p));
        fs.rmdirSync(tempImagesDir);
      })
      .mergeToFile(outputPath, outputDir);

  } catch (error) {
    console.error('Memory Remix error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { generateRemix };
