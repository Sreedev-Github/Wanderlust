const Listing = require("../models/listing.models.js");
const Review = require("../models/review.model.js");
const ApiError = require("../utils/ApiError.js");
const {listingSchema, reviewSchema} = require("../schema.js")

module.exports.validateListing = (req, res, next)=>{
    let result = listingSchema.validate(req.body);
    if(result.error){
        result.error.message = result.error.message.replace("listing.", "");
        throw new ApiError(400, result.error);
    };
    next();
};

module.exports.validateReview = (req, res, next)=>{
    let result = reviewSchema.validate(req.body);
    if(result.error){
        result.error.message = result.error.message.replace("review.", "");
        throw new ApiError(400, result.error);
    };
    next();
};

module.exports.isLoggedIn = (req, res, next)=> {
    if(!req.isAuthenticated()){
        // save the last url user visited
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You muse be logged in to access this");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)){
        req.flash("error", "You don't have the permission to edit, as you are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req, res, next) => {
    let { id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error", "You don't have the permission to delete, as you are not the owner of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}