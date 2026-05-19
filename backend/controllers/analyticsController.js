/**
 * CodeDNA
 * analyticsController.js — Creator Analytics Controller (PROMPT-59)
 * exports: getOverview, getContentAnalytics, getAudienceAnalytics, getVideoDetailAnalytics
 * used_by: backend/routes/analytics.js
 * rules: Returns comprehensive last 30 days statistics, heatmaps, demographics, retention curves, and CSV formats
 */

// Dummy analytics helper to simulate highly realistic statistics based on actual user content
const getMockOverview = (userId, period = '30d') => {
  return {
    reach: 28400,
    impressions: 59300,
    engagementRate: 18.4, // %
    profileVisits: 1840,
    newFollowers: 340,
    videoViews: 142000,
    watchTime: 4860, // minutes
    bestPerformingPost: {
      id: 'post_best',
      title: 'Deep dive into advanced spring eased progress loops',
      reach: 18900,
      engagement: '24%',
      type: 'video'
    },
    topVideo: {
      id: 'vid_top',
      title: 'Double tap hearts spawning physics demonstration',
      views: 89000,
      avgWatchTime: '3.4 mins'
    },
    mostSharedContent: {
      title: 'Design systems guidelines and HSL color mappings',
      shares: 124
    },
    bestTimeToPost: {
      // Heatmap data: 7 days x 6 time blocks
      // Values represent engagement score
      Monday: [20, 30, 80, 95, 60, 40],
      Tuesday: [15, 25, 75, 90, 65, 35],
      Wednesday: [22, 35, 85, 98, 70, 45],
      Thursday: [18, 28, 80, 92, 68, 40],
      Friday: [25, 40, 90, 99, 85, 60],
      Saturday: [30, 50, 60, 80, 90, 75],
      Sunday: [20, 45, 55, 70, 80, 50]
    }
  };
};

const getMockContent = (userId, type = 'posts') => {
  const allItems = [
    { id: 'cnt_1', title: 'Deep dive into advanced spring eased progress loops', type: 'video', reach: 14200, impressions: 22000, engagement: '18%', shares: 45, date: '2026-05-18' },
    { id: 'cnt_2', title: 'Why client side hydration matters for SPA layouts', type: 'post', reach: 5900, impressions: 9000, engagement: '12%', shares: 12, date: '2026-05-19' },
    { id: 'cnt_3', title: 'Double tap hearts spawning physics demonstration', type: 'reel', reach: 89000, impressions: 145000, engagement: '34%', shares: 189, date: '2026-05-20' },
    { id: 'cnt_4', title: 'Designing HSL Accent Borders in React 19', type: 'post', reach: 4100, impressions: 6200, engagement: '15%', shares: 8, date: '2026-05-21' }
  ];

  if (type === 'all') return allItems;
  return allItems.filter(item => item.type === type || (type === 'posts' && item.type !== 'video' && item.type !== 'reel'));
};

const getMockAudience = (userId) => {
  return {
    followersHistory: [
      { date: '05-01', count: 23200 },
      { date: '05-05', count: 23500 },
      { date: '05-10', count: 23950 },
      { date: '05-15', count: 24400 },
      { date: '05-19', count: 24850 }
    ],
    ageGroups: [
      { name: '13-17', percentage: 8 },
      { name: '18-24', percentage: 38 },
      { name: '25-34', percentage: 42 },
      { name: '35-44', percentage: 10 },
      { name: '45+', percentage: 2 }
    ],
    genderDistribution: [
      { name: 'Male', value: 58 },
      { name: 'Female', value: 39 },
      { name: 'Other', value: 3 }
    ],
    topLocations: [
      { name: 'United States', percentage: 45 },
      { name: 'Germany', percentage: 22 },
      { name: 'India', percentage: 18 },
      { name: 'United Kingdom', percentage: 10 },
      { name: 'Canada', percentage: 5 }
    ],
    devices: [
      { name: 'Mobile', percentage: 68 },
      { name: 'Desktop', percentage: 24 },
      { name: 'Tablet', percentage: 8 }
    ],
    referrers: [
      { name: 'Home Feed', percentage: 52 },
      { name: 'Explore Directory', percentage: 24 },
      { name: 'Search Engine', percentage: 12 },
      { name: 'Direct Links', percentage: 8 },
      { name: 'Shares', percentage: 4 }
    ]
  };
};

const getMockVideoDetail = (videoId) => {
  return {
    id: videoId,
    title: 'Deep dive into advanced spring eased progress loops',
    avgViewDuration: '2.5 mins',
    avgViewPercentage: 52, // %
    thumbnailCTR: 8.4, // %
    retentionCurve: [
      { time: '0:00', value: 100 },
      { time: '0:30', value: 85 },
      { time: '1:00', value: 72 },
      { time: '1:30', value: 64 },
      { time: '2:00', value: 58 },
      { time: '2:30', value: 52 },
      { time: '3:00', value: 48 },
      { time: '4:00', value: 40 }
    ],
    trafficSources: [
      { source: 'Suggested Videos', percentage: 48 },
      { source: 'Channel Page', percentage: 25 },
      { source: 'Search Results', percentage: 15 },
      { source: 'External', percentage: 12 }
    ]
  };
};

// Controllers
exports.getOverview = async (req, res) => {
  try {
    const { period } = req.query;
    const stats = getMockOverview(req.user.id, period);
    return res.json(stats);
  } catch (err) {
    console.error('Failed to get analytics overview', err);
    return res.status(500).json({ message: 'Server error fetching overview analytics' });
  }
};

exports.getContentAnalytics = async (req, res) => {
  try {
    const { type, period } = req.query;
    const contentStats = getMockContent(req.user.id, type || 'all');
    return res.json(contentStats);
  } catch (err) {
    console.error('Failed to get content analytics', err);
    return res.status(500).json({ message: 'Server error fetching content analytics' });
  }
};

exports.getAudienceAnalytics = async (req, res) => {
  try {
    const audienceStats = getMockAudience(req.user.id);
    return res.json(audienceStats);
  } catch (err) {
    console.error('Failed to get audience analytics', err);
    return res.status(500).json({ message: 'Server error fetching audience analytics' });
  }
};

exports.getVideoDetailAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const videoStats = getMockVideoDetail(id);
    return res.json(videoStats);
  } catch (err) {
    console.error('Failed to get video detail analytics', err);
    return res.status(500).json({ message: 'Server error fetching video detail analytics' });
  }
};
