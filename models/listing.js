const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { string } = require("joi");

const listingSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description: String,
    image:{
        url:String,
        filename:String
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
});

// listingSchema.pre('save', function(next) {
//     // Check if the image URL is an empty string and replace it with the default URL
//     if (this.image && this.image.url === "") {
//         this.image.url = "https://images.unsplash.com/photo-1740905546458-2b0199785aa3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8";
//     }
//     next();
// });


listingSchema.post("findOneAndDelete",async(listing) =>{
    if(listing){
        await Review.deleteMany({reviews:{$in: listing.reviews}});
    }
});

const listing = mongoose.model("listing",listingSchema);
module.exports = listing; 