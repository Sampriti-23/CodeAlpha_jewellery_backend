const express = require("express");

const router = express.Router();

const {
  getRecommendations
} = require("../controller/recommendationcontroller");

router.get("/:userId", getRecommendations);

module.exports = router;