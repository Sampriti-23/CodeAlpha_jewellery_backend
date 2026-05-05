const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/wishlistcontroller');

router.get('/getwishlist/:userId', wishlistController.getWishlist);
router.post('/toggle', wishlistController.toggleWishlist);

module.exports = router;