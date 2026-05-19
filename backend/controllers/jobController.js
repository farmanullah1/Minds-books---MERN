/**
 * CodeDNA
 * jobController.js — core functionality
 * exports: none
 * used_by: internal
 * rules: Follow project conventions
 */

const JobPosting = require('../models/JobPosting');
const User = require('../models/User');

const getJobs = async (req, res) => {
  try {
    const { category, location, isRemote, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (location) query.location = new RegExp(location, 'i');
    if (isRemote) query.isRemote = isRemote === 'true';
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const jobs = await JobPosting.find(query)
      .populate('employer', 'name profilePicture')
      .sort({ isPromoted: -1, createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error('GetJobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createJob = async (req, res) => {
  try {
    const job = await JobPosting.create({
      ...req.body,
      employer: req.user.id
    });
    res.status(201).json(job);
  } catch (error) {
    console.error('CreateJob error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getJob = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id)
      .populate('employer', 'name profilePicture')
      .populate('applicants.user', 'name profilePicture');
    
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const applyToJob = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const alreadyApplied = job.applicants.some(a => a.user.toString() === req.user.id);
    if (alreadyApplied) return res.status(400).json({ message: 'Already applied' });

    job.applicants.push({ user: req.user.id });
    await job.save();

    res.json({ message: 'Applied successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePortfolio = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.portfolio = { ...user.portfolio, ...req.body };
    await user.save();

    res.json(user.portfolio);
  } catch (error) {
    console.error('UpdatePortfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPortfolio = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('portfolio.recommendations.from', 'name profilePicture')
      .select('portfolio name profilePicture');
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const endorseSkill = async (req, res) => {
  try {
    const { userId, skillName } = req.body;
    const targetUser = await User.findById(userId);
    if (!targetUser) return res.status(404).json({ message: 'User not found' });

    const skill = targetUser.portfolio.skills.find(s => s.name === skillName);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });

    if (skill.endorsements.includes(req.user.id)) {
      skill.endorsements.pull(req.user.id);
    } else {
      skill.endorsements.push(req.user.id);
    }

    await targetUser.save();
    res.json({ message: 'Endorsement updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getJobs,
  createJob,
  getJob,
  applyToJob,
  updatePortfolio,
  getPortfolio,
  endorseSkill
};
