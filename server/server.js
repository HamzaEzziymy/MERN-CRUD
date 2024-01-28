// importation express modull
const express = require("express");

// port
const port = 8080;

// importation mongoose modull
const mongoose = require("mongoose");

// importation UsersModul from Users.js
const UserModel = require("./models/Users");

// importation cors
const cors = require("cors");

// app express
const app = express();

// use express.js
app.use(express.json())

// use cros
app.use(cors());

//connet white mongoose 
mongoose.connect("mongodb://127.0.0.1:27017/crudMERN")

// get data from mongodb
app.get("/users", async (req, res)=>{
    const users = await UserModel.find();
    res.json(users)
})

// post data on mongodb
app.post("/createUser", async (req, res)=>{
    const newUser = new UserModel(req.body);
    await newUser.save();
})

// update data on mongodb
app.put("/updateUser", async (req, res)=>{
    const userID = req.body._id;
    const newUserValue = req.body.user;
    await UserModel.updateOne({_id:userID}, {$set: newUserValue},);
})

// delte data from mongodb
app.delete("/deleteUser", async (req, res)=>{
    const userID = req.body._id;
    await UserModel.deleteOne({_id:userID});
    res.json(userID);
})


// listening in port 8080
app.listen(port, () => {
    console.log("listen in port 8080...")
})