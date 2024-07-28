const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Listing = require("./models/listing.js")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const ExpressError = require("./ExpressError.js")
// const {ListingSchmeavalidation} = require("./Schema.js")

const app = express()
const port = 8000

app.set("views engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
// app.use(express.static(path.join(__dirname,"public")))
app.use(express.static(path.join(__dirname, 'public')));
app.engine("ejs",ejsMate)

async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust")
}
main().then(()=>{
    console.log("Data base connect successfully...");
}).catch((err)=>{
    console.log(err);
})

function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{
            next(err)
        })
    }
}

                // Show all Listings
app.get("/listing",asyncWrap( async(req,res,next)=>{
   const AllListings = await Listing.find()
   res.render("Listings/index.ejs",{AllListings})
})
)
                // Add new Listing
app.get("/listing/new",(req,res)=>{
    res.render("Listings/new.ejs")
})
                // Show selected Listing
app.get("/listing/:id",asyncWrap( async(req,res,next)=>{
    let {id} = req.params
    const list = await Listing.findById(id)
    if(!list){
       return next(new ExpressError(404,"This PAGE not found!"))
    }
    res.render("Listings/show.ejs",{list});
})
)
                // Add new Listings
app.post("/listing",asyncWrap( async(req,res,next)=>{
    // let{title,description,image,prize,location,country} = req.body
    // let newPlace = new Listing({
    //     title:title,
    //     description:description,
    //     image:image,
    //     prize:prize,
    //     location:location,
    //     country:country
    // })
    if(!req.body.listing){
        next(new ExpressError(400,"Wrong data input!"))
    }
//    let result =  ListingSchmeavalidation.validate(req.body)
//    console.log(result);
    let newlisting = req.body.listing
    const newLIST = new Listing(newlisting)
    await newLIST.save()
    res.redirect("/listing")
})
)
app.get("/listing/:id/edit",async(req,res)=>{
    let{id}=req.params
    let list = await Listing.findById(id)
    res.render("Listings/edit.ejs",{list})
})
app.put("/listing/:id",async(req,res)=>{
    let {id} = req.params
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listing/${id}`)
})
app.delete("/listing/:id",async(req,res)=>{
    let{id}=req.params
    let deletelist = await Listing.findByIdAndDelete(id)
    res.redirect("/listing")
})

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.get("*",(req,res,next)=>{
     next(new ExpressError(404,"Page not found!"))
    res.render("Listings/edit.ejs")
})

app.use((err,req,res,next)=>{
   let{status=500,message="Some thing went wrong"} = err
   res.status(status).render("Listings/Error.ejs");
})

app.listen(port,()=>{
    console.log("Server started in port ",port)
})
// Listing.findByIdAndDelete
