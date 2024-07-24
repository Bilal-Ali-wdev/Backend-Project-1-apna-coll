const mongoose = require('mongoose')

const ListingSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        default:"https://unsplash.com/photos/blue-and-white-star-illustration-JpTY4gUviJM",
        set:(v)=>v===""?"https://unsplash.com/photos/blue-and-white-star-illustration-JpTY4gUviJM":v
    },
    prize:{
        type:Number,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    }
})

const Listing = mongoose.model("Listing",ListingSchema)

module.exports = Listing