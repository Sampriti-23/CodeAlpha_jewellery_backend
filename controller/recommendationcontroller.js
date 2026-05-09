const Order = require("../model/Order");
const Product = require("../model/Product");
const Cart = require("../model/Cart"); // Ensure you import your Cart model

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId;

    // 1. Fetch BOTH Cart and Past Orders in parallel for speed
    const [cart, orders] = await Promise.all([
      Cart.findOne({ user: userId }).populate("cartItems.product"),
      Order.find({ user: userId }).populate("orderItems.product")
    ]);

    const categoryWeights = {};
    const excludedIds = new Set();

    // 2. Analyze Current Cart (High Priority: Weight = 5 per item)
    if (cart && cart.cartItems) {
      cart.cartItems.forEach(item => {
        if (item.product) {
          const cat = item.product.category;
          categoryWeights[cat] = (categoryWeights[cat] || 0) + 5; 
          excludedIds.add(item.product._id.toString());
        }
      });
    }

    // 3. Analyze Past Orders (Medium Priority: Weight = 1 per item)
    if (orders) {
      orders.forEach(order => {
        order.orderItems.forEach(item => {
          if (item.product) {
            const cat = item.product.category;
            categoryWeights[cat] = (categoryWeights[cat] || 0) + 1;
            excludedIds.add(item.product._id.toString());
          }
        });
      });
    }

    // 4. Handle New Users / Empty History
    const hasHistory = Object.keys(categoryWeights).length > 0;
    if (!hasHistory) {
      const generic = await Product.find().limit(6).sort({ ratings: -1 });
      return res.status(200).json({ success: true, recommendations: generic });
    }

    // 5. Fetch Candidates (Exclude items already in cart or already bought)
    let candidates = await Product.find({
      category: { $in: Object.keys(categoryWeights) },
      _id: { $nin: Array.from(excludedIds) }
    }).lean();

    // 6. Scoring Analysis (Weight x 10 + Rating)
    candidates = candidates.map(product => {
      const weight = categoryWeights[product.category] || 0;
      const popularity = product.ratings || 0;
      return {
        ...product,
        relevanceScore: (weight * 10) + popularity
      };
    });

    // 7. Sort by High Possibility & Limit to 6
    const topSix = candidates
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 6);

    res.status(200).json({
      success: true,
      count: topSix.length,
      recommendations: topSix
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};