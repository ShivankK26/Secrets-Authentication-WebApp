// We're finally using Passport.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');



const app = express();



app.use(express.static("public"));
app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({extended: true}));


// Setting up the session
app.use(session({
    secret: "Our little secret.", // We'll later save it to our .env file
    resave: false,
    saveUninitialized: false
}));


// Initializing the passport and session
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});


const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    secret: String
});


// Incorporating passport-local-mongoose package. It helps in salting and hashing part. 
userSchema.plugin(passportLocalMongoose);


const User = new mongoose.model("User", userSchema);


passport.use(User.createStrategy()); // Used for authenticating users using their username and password.
passport.serializeUser(User.serializeUser()); // Used for serializing the message and storing it inside a cookie.
passport.deserializeUser(User.deserializeUser()); // Used for deserializing the message and allowing the message to be discovered.



app.get("/", (req,res) =>{
    res.render("home")
});


app.get("/login", (req,res) =>{
    res.render("login");
});


app.get("/register", (req,res) =>{
    res.render("register");
});


app.get("/secrets", (req, res) => {
    User.find({ "secret": { $ne: null } })
      .then(foundUsers => {
        if (foundUsers) {
          res.render("secrets", { usersWithSecrets: foundUsers });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("An error occurred while finding users with secrets.");
      });
  });
  


app.get("/submit", (req,res) =>{
    if(req.isAuthenticated()){
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});


app.get("/logout", (req,res) =>{
    req.logout((err) =>{
        if(err){
            console.log(err);
        }
    });
    res.redirect("/");
});


app.post("/submit", (req, res) => {
    const submittedSecret = req.body.secret;
  
    console.log(req.user.id);
  
    User.findById(req.user.id)
      .then(foundUser => {
        foundUser.secret = submittedSecret;
        return foundUser.save(); // Return a Promise here
      })
      .then(() => {
        res.redirect("/secrets");
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("An error occurred while saving the secret.");
      });
  });
  


app.post("/register", (req,res) =>{

   User.register({username: req.body.username}, req.body.password, function(err, user){
    if(err){
        console.log(err);
        res.redirect("/register");
    } else {
        passport.authenticate("local")(req,res, () =>{
            res.redirect("/secrets");
        });
    }
   });
    
});


app.post("/login", (req,res) =>{
   
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    // Now we'll use passport.js to authenticate the user.
    req.login(user, (err) =>{
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req,res, function(){
                res.redirect("/secrets");
            });
        }
    });
});





port = process.env.PORT || 3000;

app.listen(port, (res,req)=>{
    console.log(`Server started at ${port}!`);
});