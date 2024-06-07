const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Review = require("./review.model.js");
const { required } = require("joi");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        filename: String,
    },

    price: {
        type: Number,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

    // Add category model later
})

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        if(listing.reviews.length !== 0){
            await Review.deleteMany({_id: {$in: listing.reviews}})
        }
    }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;