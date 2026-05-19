/**
 * CodeDNA
 * dataExportController.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 */

const DataExportRequest = require('../models/DataExportRequest');
const User = require('../models/User');
const Post = require('../models/Post');

const requestExport = async (req, res) => {
  try {
    const existingRequest = await DataExportRequest.findOne({ 
      user: req.user.id, 
      status: { $in: ['Pending', 'Processing'] } 
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have a pending export request' });
    }

    const exportRequest = await DataExportRequest.create({
      user: req.user.id,
      dataTypes: req.body.dataTypes || ['Posts', 'Comments', 'Messages', 'Profile']
    });

    // In a real app, this would trigger a background job to generate the ZIP
    // For now, we'll simulate completion after a delay
    setTimeout(async () => {
      exportRequest.status = 'Completed';
      exportRequest.downloadUrl = `/api/data-export/download/${exportRequest._id}`;
      exportRequest.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      await exportRequest.save();
    }, 5000);

    res.status(201).json(exportRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getExportStatus = async (req, res) => {
  try {
    const requests = await DataExportRequest.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const downloadExport = async (req, res) => {
  try {
    const request = await DataExportRequest.findOne({ _id: req.params.id, user: req.user.id });
    if (!request) return res.status(404).json({ message: 'Export not found' });
    if (request.status !== 'Completed') return res.status(400).json({ message: 'Export is not ready' });
    if (new Date() > request.expiresAt) return res.status(400).json({ message: 'Export has expired' });

    // Mock data generation
    const user = await User.findById(req.user.id).select('-password');
    const posts = await Post.find({ user: req.user.id });
    
    const exportData = {
      profile: user,
      posts: posts,
      exportedAt: new Date()
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=mindbook_data_${req.user.id}.json`);
    res.send(JSON.stringify(exportData, null, 2));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { requestExport, getExportStatus, downloadExport };
