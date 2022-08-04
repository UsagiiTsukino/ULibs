const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes');
const mongoose = require('mongoose');
const db = require ('./config/db/mongodb')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const { doesNotMatch } = require('assert');
const { profile } = require('console');
const https = require('https');
const fs = require('fs');
const MemoryStore = require('memorystore')(session)
const enforce = require('express-sslify');
const req = require('express/lib/request');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
// Connect DB
db.connect();
// HTTP Logger
app.use(morgan('combined'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'))
// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers : {
            sum: (a,b) => a + b
        }
    }),
);
app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    cookie: { secure: true, maxAge: 86400000 }
  }))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(passport.initialize());
app.use(passport.session())
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
passport.use(new FacebookStrategy({
    clientID: '378641464423407',
    clientSecret: '81259984488044e2aeb14dee8f5a4015',
    callbackURL: "https://ulibs.herokuapp.com/auth/facbook/callback",
    profileFields: ['id', 'displayName','photos','email'],
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    return cb(null, profile);
  }
));
route(app);
app.use(enforce.HTTPS({ trustProtoHeader: true }))
// https.createServer(options,app).listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
//Route init


