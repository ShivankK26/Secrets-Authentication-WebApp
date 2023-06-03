<!-- ABOUT THE PROJECT -->
# About The Project
![secrets web auth](https://github.com/ShivankK26/Secrets-Authentication-WebApp/assets/115289871/2b001b52-6636-40ed-ac86-34bed7e0dd2f)






In this Project, I've built a WebApp namely Secrets-Authenticaton-WebApp using which you can secure your secrets. This WebApp is extremely secure because we're passport.js, cookies, and sessions in it. So, just use it and have fun!!!



Use the `README.md` to get started.




# Built With

The Tech Stacks use are:

<div align="center">
<a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=mongodb,expressjs,nodejs,js,ejs,css" />
</a>
</div>




<!-- GETTING STARTED -->
# Getting Started

To get started, create a file called app.js and import all the required modules in it. After that create a folder called views and place the home.ejs, login.ejs, register.ejs, secrets.ejs, and submit.ejs files in it. Also, inside views folder create a sub-folder called partials in which include header.ejs and footer.ejs filed. After that, create another folder called public in which add another folder called css in which you'll need to add a file called styles.css.


* modules

  ```sh
  require('dotenv').config();
  const express = require('express');
  const bodyParser = require('body-parser');
  const ejs = require('ejs');
  const mongoose = require('mongoose');
  const session = require('express-session');
  const passport = require('passport');
  const passportLocalMongoose = require('passport-local-mongoose');
  ```

* ejs connectivity

  ```sh
  app.set("view engine","ejs")
  ```
  
* Using Body Parser

  ```sh
  app.use(bodyParser.urlencoded({extended: true}));
  ```

## Prerequisites

To begin with our Project, we'll need to install some npm packages like express, mongoose, body-parser, ejs, session, passport, and passportLocalMongoose using the command given below. 


* npm

  ```sh
  npm install express mongoose ejs passport express-session passport-local-mongoose body-parser
  ```
  
  
* To ease the process of development, we'll install nodemon (Make sure you already have nodemon installed in your system, if not then [visit here](https://nodemon.io/)).

  ```sh
  npm i nodemon
  ```


<!-- CONTACT -->
# Contact

Your Name - Shivank Kapur - shivankkapur2004@gmail.com

Project Link: 
