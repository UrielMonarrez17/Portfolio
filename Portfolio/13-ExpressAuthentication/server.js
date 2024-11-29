require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(cookieParser());

const mongoUrl = "mongodb://127.0.0.1:27017/LOTR";
mongoose.connect(mongoUrl, { 
  useNewUrlParser: true,
   useUnifiedTopology: true 
  });

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
  })
);

// Definition of a schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});
userSchema.set("strictQuery", true);

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/secrets',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });
      if (user) return done(null, user);

      const newUser = await User.create({
        username: profile.displayName,
        googleId: profile.id,
      });
      done(null, newUser);
    }
  )
);

app.get('/register', (req, res) => res.render('register'));
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.register({ username, email }, password);
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/secrets');
    });
  } catch (err) {
    console.error(err);
    res.redirect('/register');
  }
});

// Login
app.get('/login', (req, res) => res.render('login'));
app.post('/login', passport.authenticate('local', {
  successRedirect: '/secrets',
  failureRedirect: '/login',
}));

// Secrets
app.get('/secrets', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('secrets');
  } else {
    res.redirect('/login');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.error(err);
    res.redirect('/');
  });
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/auth/google/secrets',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/secrets');
  }
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
