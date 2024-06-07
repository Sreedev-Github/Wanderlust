const express = require("express");
const router = express.Router({mergeParams: true}); // So that we can get the id from the params
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middlewares/authentication.middleware.js");
const { addReview, deleteReview } = require("../controllers/review.controller.js");

// Post Reviews
router.post("/",isLoggedIn, validateReview, wrapAsync(addReview));

// Delete Review Route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(deleteReview));

module.exports = router;