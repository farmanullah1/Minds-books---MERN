/**
 * CodeDNA
 * seed.js — Dynamic high-fidelity seeded database populator (PROMPT-60)
 * exports: none
 * used_by: terminal execution (npm run seed)
 * rules: Wipes existing data and seeds admin, 5 users, 50 posts, comments, stories, events, jobs, and groups.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Post = require('../models/Post');
const Group = require('../models/Group');
const Event = require('../models/Event');
const Story = require('../models/Story');
const Article = require('../models/Article');
const JobPosting = require('../models/JobPosting');
const Challenge = require('../models/Challenge');
const Reel = require('../models/Reel');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mindbook';

const seedDatabase = async () => {
  try {
    console.log('⏳ Connecting to MongoDB database for seeding...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected successfully!');

    // Wiping current tables safely
    console.log('🧹 Purging existing collections...');
    await User.deleteMany({});
    await Post.deleteMany({});
    await Group.deleteMany({});
    await Event.deleteMany({});
    await Story.deleteMany({});
    await Article.deleteMany({});
    await JobPosting.deleteMany({});
    await Challenge.deleteMany({});
    await Reel.deleteMany({});
    console.log('🧹 Purge complete.');

    // 1. Password Hashing
    const salt = await bcrypt.genSalt(10);
    const standardHashedPassword = await bcrypt.hash('Password123', salt);
    const adminHashedPassword = await bcrypt.hash('Admin@123456', salt);

    // 2. Create Users
    console.log('👥 Seeding User profiles (1 Admin + 5 Regular Creators)...');
    
    const adminUser = await User.create({
      name: 'Global Administrator',
      email: 'admin@mindbook.com',
      password: adminHashedPassword,
      role: 'admin',
      bio: 'MindBook Master System Admin & Platform Developer.',
      location: { city: 'San Francisco', country: 'United States' },
      isOnline: true,
      coins: 1000,
      portfolio: { isOpenToWork: false, isVerified: true }
    });

    const user1 = await User.create({
      name: 'Farmanullah Ansari',
      email: 'farman@mindbook.com',
      password: standardHashedPassword,
      role: 'user',
      bio: 'TypeScript developer specializing in full stack responsive React architectures.',
      location: { city: 'Munich', country: 'Germany' },
      coins: 340,
      portfolio: { isOpenToWork: true, isVerified: true }
    });

    const user2 = await User.create({
      name: 'Sarah Connor',
      email: 'sarah@mindbook.com',
      password: standardHashedPassword,
      role: 'user',
      bio: 'Content strategist building elegant micro animations.',
      location: { city: 'Austin', country: 'United States' },
      coins: 180,
      portfolio: { isOpenToWork: false, isVerified: true }
    });

    const user3 = await User.create({
      name: 'David Beckham',
      email: 'david@mindbook.com',
      password: standardHashedPassword,
      role: 'user',
      bio: 'Visual designer focusing on vibrant glassmorphic HSL styling.',
      location: { city: 'London', country: 'United Kingdom' },
      coins: 90,
      portfolio: { isOpenToWork: true, isVerified: false }
    });

    const user4 = await User.create({
      name: 'Rohan Gupta',
      email: 'rohan@mindbook.com',
      password: standardHashedPassword,
      role: 'user',
      bio: 'Fullstack node architect integrating AI frameworks.',
      location: { city: 'New Delhi', country: 'India' },
      coins: 520,
      portfolio: { isOpenToWork: true, isVerified: true }
    });

    const user5 = await User.create({
      name: 'Elena Rostova',
      email: 'elena@mindbook.com',
      password: standardHashedPassword,
      role: 'user',
      bio: 'UX researcher mapping interactive drag gesture metrics.',
      location: { city: 'Prague', country: 'Czech Republic' },
      coins: 60,
      portfolio: { isOpenToWork: false, isVerified: false }
    });

    const creators = [user1, user2, user3, user4, user5];
    const allUsers = [adminUser, ...creators];

    // Establish friend relationships
    console.log('🤝 Linking User Friend networks...');
    user1.friends.push(user2._id, user3._id, user4._id);
    user2.friends.push(user1._id, user3._id, user5._id);
    user3.friends.push(user1._id, user2._id, user4._id);
    user4.friends.push(user1._id, user3._id, user5._id);
    user5.friends.push(user2._id, user4._id);
    
    await user1.save();
    await user2.save();
    await user3.save();
    await user4.save();
    await user5.save();

    // 3. Create Groups
    console.log('🏢 Seeding Community Groups (10 items)...');
    const groupTitles = [
      'React 19 Next Pioneers',
      'Vibrant HSL CSS Design Systems',
      'Advanced Spring Animations Spec',
      'Socratic Coding Agent Devs',
      'WebRTC Video Streaming Lab Group',
      'Node Scale PM2 Clustering Hub',
      'TypeScript Strict Mode Advocates',
      'Glassmorphic UI Showcase Lounge',
      'AI Spec Contracts Developers Club',
      'MindBook Premium Creators Circle Star'
    ];

    const groups = [];
    for (let i = 0; i < groupTitles.length; i++) {
      const creator = creators[i % creators.length];
      const name = groupTitles[i];
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const grp = await Group.create({
        name,
        slug,
        description: `Dedicated collaborative space for discussing all aspects of ${name} development.`,
        creator: creator._id,
        members: [creator._id, creators[(i + 1) % creators.length]._id, creators[(i + 2) % creators.length]._id],
        privacy: 'public'
      });
      groups.push(grp);
    }

    // 4. Create Posts (50 posts with comments and reactions)
    console.log('📝 Seeding Feed Posts & User micro-logs (50 items)...');
    const postTopics = [
      'Just upgraded my personal workspace with gorgeous full glassmorphism panels. HSL matches the brand yellow `#F7B928` perfectly!',
      'Working with advanced spring eased loops in Framer Motion today. The acceleration physics feel incredibly premium!',
      'Why client side hydration matters more than you think for real-time multiplayer layout layers.',
      'Check out this interactive double tap heart spawning animation I created! It makes feed scrolling so lively.',
      'Strict TypeScript typings have saved my codebase over 20+ runtime mismatches this week.',
      'Just launched the new Creator Studio Analytics suite. Those Recharts line views look spectacular!',
      'Has anyone integrated the new React 19 compiler yet? Tell me your thoughts on automatic memoization.',
      'Socratic coding strategies really change the way we pair program with advanced developer agents.',
      'How to build robust global swipe-to-go-back boundary touch controllers in React.',
      'Optimizing Node controller endpoints with lightweight cached memory buffers.'
    ];

    for (let i = 1; i <= 50; i++) {
      const author = allUsers[i % allUsers.length];
      const topic = postTopics[i % postTopics.length];
      
      const reactions = [];
      const commentCount = i % 3 + 1; // 1-3 comments
      const comments = [];

      // Populate mock reactions
      const reactionTypes = ['like', 'love', 'haha', 'wow', 'sad', 'angry', 'thinking'];
      const reactantCount = i % 5 + 2;
      for (let r = 0; r < reactantCount; r++) {
        reactions.push({
          user: allUsers[(i + r) % allUsers.length]._id,
          type: reactionTypes[(i + r) % reactionTypes.length]
        });
      }

      // Populate mock comments
      const commentTexts = [
        'Absolutely spot on! This changes my daily workflow completely.',
        'Can you share the source code or HSL parameters for this overlay?',
        'This micro interaction is highly satisfying. Great work!',
        'Agree! Looking forward to testing this on mobile devices.',
        'Incredibly neat layout logic. Simple yet beautiful!'
      ];

      for (let c = 0; c < commentCount; c++) {
        comments.push({
          user: allUsers[(i + c + 1) % allUsers.length]._id,
          text: commentTexts[(i + c) % commentTexts.length],
          likes: [allUsers[(i + c + 2) % allUsers.length]._id]
        });
      }

      await Post.create({
        user: author._id,
        content: `[Post #${i}] ${topic} Enforcing MindBook premium branding standards.`,
        reactions,
        comments,
        group: i % 5 === 0 ? groups[i % groups.length]._id : undefined,
        privacy: { type: 'public', allowList: [], blockList: [] }
      });
    }

    // 5. Create Stories
    console.log('🎬 Seeding Stories (10 items)...');
    for (let i = 1; i <= 10; i++) {
      const author = creators[i % creators.length];
      await Story.create({
        user: author._id,
        image: `https://picsum.photos/seed/story${i}/1080/1920`,
        caption: `Live updates from Munich DevCon! Day #${i}!`,
      });
    }

    // 6. Create Events
    console.log('📅 Seeding Developer Events (5 items)...');
    const eventNames = [
      'Global HSL Design Systems Hackathon',
      'Next.js 19 Strict Mode Workshop',
      'React Native Swipe Gestures Masterclass',
      'PM2 Production Hardening BootCamp',
      'Creator Studio Analytics Launch Showcase'
    ];

    for (let i = 0; i < eventNames.length; i++) {
      const organizer = creators[i % creators.length];
      await Event.create({
        title: eventNames[i],
        description: `Join us online as we dive deep into advanced structural optimization strategies for ${eventNames[i]}.`,
        date: new Date(Date.now() + (i + 2) * 24 * 60 * 60 * 1000), // future date
        location: 'Virtual Zoom Endpoint & Discord Channels',
        creator: organizer._id,
        attendees: [organizer._id, creators[(i + 1) % creators.length]._id, creators[(i + 2) % creators.length]._id]
      });
    }

    // 7. Create Job Postings
    console.log('💼 Seeding Job Opportunities (5 items)...');
    const jobTitles = [
      'Lead React 19 Frontend Developer',
      'Senior CSS HSL Theme Architect',
      'Node.js Real-time Socket Architect',
      'UX Micro-interactions Designer',
      'Socratic Agent integration specialist'
    ];

    for (let i = 0; i < jobTitles.length; i++) {
      const poster = creators[i % creators.length];
      await JobPosting.create({
        title: jobTitles[i],
        employer: poster._id,
        description: `We are searching for a high-performance specialist to join our team to build next-generation applications centered on ${jobTitles[i]}.`,
        location: 'Remote (Global)',
        salaryRange: { min: 120000, max: 160000, currency: 'USD' },
        type: 'Full-time',
        requirements: ['React', 'TypeScript', 'Tailwind', 'Node']
      });
    }

    // 8. Create Challenges
    console.log('🏆 Seeding Coding Challenges (5 items)...');
    const challengePrompts = [
      'Submit your best glassmorphism card designs with a subtle 3D hover tilt using HSL highlights.',
      'Build a robust global swipe-to-go-back gesture boundary controller with resistance logic.',
      'Optimize a TypeScript compiler target output and fix all implicit any declarations.',
      'Design a beautiful interactive pull-to-refresh spinner with real phone haptic buzz trigger.',
      'Configure a comprehensive jsPDF layout helper compiling reports beautifully.'
    ];

    for (let i = 0; i < challengePrompts.length; i++) {
      await Challenge.create({
        prompt: challengePrompts[i],
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
        participants: []
      });
    }

    // 9. Create Reels
    console.log('🎬 Seeding Reels (5 premium short videos)...');
    const reelVideos = [
      {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        caption: '🔥 Blazing hot Framer Motion springs layout. Custom HSL theme integration is key! #CSS #React #DesignSystem',
        musicName: 'Ambient Chill Beats Vol. 1'
      },
      {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        caption: '🎨 Escaping the defaults: 3D parallax tilt effects look incredibly premium. #UX #FramerMotion #WebDesign',
        musicName: 'Synthwave Odyssey'
      },
      {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        caption: '🚀 Building real-time interactive dashboards with full CSV and PDF downloader bridges! #MERN #CreatorStudio',
        musicName: 'Lofi Coding Study Music'
      },
      {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        caption: '🧠 AI Agent autonomy tests - 100% correct TypeScript checks achieved. Pairing up with AI! #TypeScript #Coding',
        musicName: 'Neo-Jazz Lounge'
      },
      {
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        caption: '💛 Golden hearts double-tap physics triggers! Smooth +1 floating animations. #Interactions #CSS #Animation',
        musicName: 'Hyperpop Energy Mix'
      }
    ];

    for (let i = 0; i < reelVideos.length; i++) {
      const creator = creators[i % creators.length];
      const video = reelVideos[i];
      
      const likes = [
        creators[(i + 1) % creators.length]._id,
        creators[(i + 2) % creators.length]._id
      ];

      const comments = [
        {
          user: creators[(i + 1) % creators.length]._id,
          text: 'This is super premium! The aesthetics are wild! 🔥',
          createdAt: new Date()
        },
        {
          user: creators[(i + 2) % creators.length]._id,
          text: 'Love the yellow color highlight styling!',
          createdAt: new Date()
        }
      ];

      await Reel.create({
        user: creator._id,
        videoUrl: video.videoUrl,
        caption: video.caption,
        musicName: video.musicName,
        likes,
        comments,
        sharesCount: i * 3 + 2
      });
    }

    console.log('\n🌟 SUCCESS: Dynamic MindBook Database Bootstrapped Successfully!');
    console.log('📊 Stats summary:');
    console.log(` - Users: ${await User.countDocuments()}`);
    console.log(` - Posts: ${await Post.countDocuments()}`);
    console.log(` - Groups: ${await Group.countDocuments()}`);
    console.log(` - Stories: ${await Story.countDocuments()}`);
    console.log(` - Events: ${await Event.countDocuments()}`);
    console.log(` - Jobs: ${await JobPosting.countDocuments()}`);
    console.log(` - Challenges: ${await Challenge.countDocuments()}`);
    console.log(` - Reels: ${await Reel.countDocuments()}`);
    console.log('\n🔌 Closing MongoDB connection...');
    await mongoose.disconnect();
    console.log('👋 Seeding session terminated.');
    process.exit(0);

  } catch (error) {
    console.error('❌ SEEDING FATAL ERROR:', error);
    process.exit(1);
  }
};

seedDatabase();
