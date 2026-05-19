const Report = require('../models/Report');
const User = require('../models/User');

// @route   POST /api/reports
// @desc    Submit a new report
// @access  Private
exports.createReport = async (req, res) => {
  try {
    const { targetType, targetId, reason, details } = req.body;

    // Check if report already exists
    const existingReport = await Report.findOne({
      reporter: req.user.id,
      targetType,
      targetId,
    });

    if (existingReport) {
      return res.status(400).json({ message: 'You have already reported this content.' });
    }

    // Determine priority based on reason (Simple rule engine)
    let priority = 'Medium';
    if (['Violence', 'Self-harm', 'Underage user'].includes(reason)) {
      priority = 'High';
    } else if (['Spam', 'Copyright'].includes(reason)) {
      priority = 'Low';
    }

    const newReport = await Report.create({
      reporter: req.user.id,
      targetType,
      targetId,
      reason,
      details,
      priority,
    });

    // Optionally: Update user's reportCount if target is User
    if (targetType === 'User') {
      await User.findByIdAndUpdate(targetId, { $inc: { reportCount: 1 } });
    }

    res.status(201).json({ message: 'Report submitted successfully.', report: newReport });
  } catch (error) {
    console.error('Create report error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already reported this content.' });
    }
    res.status(500).json({ message: 'Server error creating report' });
  }
};

// @route   GET /api/reports/my-reports
// @desc    Get current user's submitted reports
// @access  Private
exports.getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ reporter: req.user.id })
      .populate('targetId', 'name content title') // Adjust fields based on target model
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    console.error('Get my reports error:', error);
    res.status(500).json({ message: 'Server error fetching reports' });
  }
};

// ==========================================
// ADMIN ROUTES
// ==========================================

// @route   GET /api/admin/reports
// @desc    Get all reports (Admin)
// @access  Private/Admin
exports.getAllReports = async (req, res) => {
  try {
    const { status, priority, limit = 50, page = 1 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const reports = await Report.find(query)
      .populate('reporter', 'name email profilePicture')
      .populate('targetId')
      .sort({ priority: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Report.countDocuments(query);

    res.json({
      reports,
      total,
      pages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Get all reports error:', error);
    res.status(500).json({ message: 'Server error fetching reports' });
  }
};

// @route   PUT /api/admin/reports/:id/resolve
// @desc    Update report status and action taken
// @access  Private/Admin
exports.resolveReport = async (req, res) => {
  try {
    const { status, actionTaken } = req.body;
    
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    report.status = status;
    report.actionTaken = actionTaken;
    report.actionTakenBy = req.adminUser._id;
    report.actionTakenAt = new Date();

    await report.save();
    res.json({ message: 'Report updated successfully', report });
  } catch (error) {
    console.error('Resolve report error:', error);
    res.status(500).json({ message: 'Server error resolving report' });
  }
};
