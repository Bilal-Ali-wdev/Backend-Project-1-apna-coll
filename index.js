const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Listing = require("./models/listing.js")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")

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
                // Show all Listings
app.get("/listing",async(req,res)=>{
   const AllListings = await Listing.find()
   res.render("Listings/index.ejs",{AllListings})
})
                // Add new Listing
app.get("/listing/new",(req,res)=>{
    res.render("Listings/new.ejs")
})
                // Show selected Listing
app.get("/listing/:id",async(req,res)=>{
    let {id} = req.params
    const list = await Listing.findById(id)
    res.render("Listings/show.ejs",{list})
})
                // Add new Listings
app.post("/listing",async(req,res)=>{
    // let{title,description,image,prize,location,country} = req.body
    // let newPlace = new Listing({
    //     title:title,
    //     description:description,
    //     image:image,
    //     prize:prize,
    //     location:location,
    //     country:country
    // })
    let newlisting = req.body.listing
    const newLIST = new Listing(newlisting)
    await newLIST.save()
    res.redirect("/listing")
})
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

app.listen(port,()=>{
    console.log("Server started in port ",port)
})

