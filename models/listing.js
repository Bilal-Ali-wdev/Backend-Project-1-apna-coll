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
        default:"https://images.unsplash.com/photo-1633078654544-61b3455b9161?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         set:(v)=>v===""?"https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=1429&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v
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