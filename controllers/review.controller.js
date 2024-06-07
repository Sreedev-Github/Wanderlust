const Listing = require("../models/listing.models.js");
const Review = require("../models/review.model.js");

module.exports.addReview = async(req, res) => {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review({...req.body.review, author: req.user._id});
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "Your review has been posted successfully");
    res.redirect(`/listings/${listing._id}`)
};

module.exports.deleteReview = async(req, res)=>{
    const {id, reviewId} = req.params;
    console.log(id, reviewId);
    const deleteReviewIdFromListing = await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "You review has been deleted successfully");
    res.redirect(`/listings/${id}`)
};