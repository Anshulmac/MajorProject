const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressErrors.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");


// post route
router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.post));

//delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.delete));

module.exports = router;