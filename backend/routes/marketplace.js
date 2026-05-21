const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Listing = require('../models/Listing');
const User = require('../models/User');
const { createNotification } = require('../controllers/notificationController');

// @route   GET /api/marketplace
// @desc    Get all active listings with filters
router.get('/', auth, async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = { status: 'Active' };

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Search query filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOption = { createdAt: -1 }; // Default: Newest first
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };

    const listings = await Listing.find(query)
      .populate('seller', 'name profilePicture')
      .sort(sortOption);

    res.json(listings);
  } catch (error) {
    console.error('Fetch listings error:', error);
    res.status(500).json({ message: 'Server error fetching listings' });
  }
});

// @route   GET /api/marketplace/mine
// @desc    Get listings created by the logged-in user
router.get('/mine', auth, async (req, res) => {
  try {
    const listings = await Listing.find({ seller: req.user.id })
      .populate('seller', 'name profilePicture')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    console.error('Fetch user listings error:', error);
    res.status(500).json({ message: 'Server error fetching your listings' });
  }
});

// @route   GET /api/marketplace/saved
// @desc    Get listings bookmarked/saved by the logged-in user
router.get('/saved', auth, async (req, res) => {
  try {
    const listings = await Listing.find({ saves: req.user.id })
      .populate('seller', 'name profilePicture')
      .sort({ createdAt: -1 });

    res.json(listings);
  } catch (error) {
    console.error('Fetch saved listings error:', error);
    res.status(500).json({ message: 'Server error fetching saved listings' });
  }
});

// @route   GET /api/marketplace/:id
// @desc    Get listing details
router.get('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.id || req.params.id)
      .populate('seller', 'name profilePicture')
      .populate('offers.buyer', 'name profilePicture');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(listing);
  } catch (error) {
    console.error('Get listing details error:', error);
    res.status(500).json({ message: 'Server error fetching listing details' });
  }
});

// @route   POST /api/marketplace
// @desc    Create a new listing
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, price, category, imageUrl, condition } = req.body;

    if (!title || !description || price === undefined || !category || !imageUrl || !condition) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newListing = await Listing.create({
      seller: req.user.id,
      title,
      description,
      price: Number(price),
      category,
      imageUrl,
      condition
    });

    const populatedListing = await newListing.populate('seller', 'name profilePicture');

    res.status(201).json(populatedListing);
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ message: 'Server error creating listing' });
  }
});

// @route   POST /api/marketplace/:id/save
// @desc    Bookmark or unsave a listing
router.post('/:id/save', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const saveIndex = listing.saves.indexOf(req.user.id);
    let isSaved = false;

    if (saveIndex === -1) {
      listing.saves.push(req.user.id);
      isSaved = true;
    } else {
      listing.saves.splice(saveIndex, 1);
    }

    await listing.save();
    res.json({ listingId: listing._id, isSaved, savesCount: listing.saves.length });
  } catch (error) {
    console.error('Toggle save listing error:', error);
    res.status(500).json({ message: 'Server error saving/unsaving listing' });
  }
});

// @route   POST /api/marketplace/:id/offer
// @desc    Submit an offer on a listing
router.post('/:id/offer', auth, async (req, res) => {
  try {
    const { amount, message } = req.body;
    const listingId = req.params.id;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Invalid offer amount' });
    }

    const listing = await Listing.findById(listingId).populate('seller');
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.seller._id.toString() === req.user.id.toString()) {
      return res.status(400).json({ message: 'You cannot submit an offer on your own listing' });
    }

    // Verify buyer's coin balance
    const buyer = await User.findById(req.user.id);
    if (!buyer || (buyer.coins || 0) < Number(amount)) {
      return res.status(400).json({ message: 'Insufficient coins to make this offer' });
    }

    // Add offer
    const newOffer = {
      buyer: req.user.id,
      amount: Number(amount),
      message: message || '',
      status: 'Pending'
    };

    listing.offers.push(newOffer);
    await listing.save();

    // Send real-time socket and DB notification to seller
    const io = req.app.get('io');
    const notificationText = `offered ${amount} Coins on your listing "${listing.title}"`;
    await createNotification(
      io,
      listing.seller._id,
      req.user.id,
      'marketplace',
      null,
      notificationText
    );

    // Fetch the updated listing with populated fields
    const updatedListing = await Listing.findById(listingId)
      .populate('seller', 'name profilePicture')
      .populate('offers.buyer', 'name profilePicture');

    res.json(updatedListing);
  } catch (error) {
    console.error('Submit offer error:', error);
    res.status(500).json({ message: 'Server error submitting offer' });
  }
});

// @route   POST /api/marketplace/:id/offers/:offerId/status
// @desc    Accept or decline an offer
router.post('/:id/offers/:offerId/status', auth, async (req, res) => {
  try {
    const { status } = req.body; // 'Accepted' or 'Declined'
    const { id: listingId, offerId } = req.params;

    if (!['Accepted', 'Declined'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.seller.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Only the seller can update offer status' });
    }

    const offer = listing.offers.id(offerId);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    if (offer.status !== 'Pending') {
      return res.status(400).json({ message: 'Offer has already been processed' });
    }

    const buyerId = offer.buyer;
    const amount = offer.amount;

    if (status === 'Accepted') {
      // Perform coin transfer: subtract from buyer, add to seller
      const buyer = await User.findById(buyerId);
      const seller = await User.findById(req.user.id);

      if (!buyer || (buyer.coins || 0) < amount) {
        return res.status(400).json({ message: 'Buyer no longer has enough coins' });
      }

      buyer.coins = (buyer.coins || 0) - amount;
      seller.coins = (seller.coins || 0) + amount;

      await buyer.save();
      await seller.save();

      // Update offer status
      offer.status = 'Accepted';
      // Mark listing as Sold
      listing.status = 'Sold';

      // Decline all other pending offers on this listing
      listing.offers.forEach(o => {
        if (o._id.toString() !== offerId.toString() && o.status === 'Pending') {
          o.status = 'Declined';
        }
      });

      await listing.save();

      // Notify the buyer
      const io = req.app.get('io');
      const notificationText = `accepted your offer of ${amount} Coins for "${listing.title}"!`;
      await createNotification(
        io,
        buyerId,
        req.user.id,
        'marketplace',
        null,
        notificationText
      );
    } else {
      // Decline the offer
      offer.status = 'Declined';
      await listing.save();

      // Notify the buyer
      const io = req.app.get('io');
      const notificationText = `declined your offer of ${amount} Coins for "${listing.title}"`;
      await createNotification(
        io,
        buyerId,
        req.user.id,
        'marketplace',
        null,
        notificationText
      );
    }

    const updatedListing = await Listing.findById(listingId)
      .populate('seller', 'name profilePicture')
      .populate('offers.buyer', 'name profilePicture');

    res.json(updatedListing);
  } catch (error) {
    console.error('Update offer status error:', error);
    res.status(500).json({ message: 'Server error updating offer status' });
  }
});

module.exports = router;
