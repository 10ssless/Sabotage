const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const api = require('./routes/api');
const Pusher = require('pusher');
const routes = require("./routes");
const app = express();
const passport = require("passport");
const session = require("express-session");

const PORT = process.env.PORT || 9000;
const URI = process.env.MONGODB_URI || 'mongodb://localhost/saboDB?replicaSet=rs'


// Pusher module used to set up live mongoDB listen
const pusher = new Pusher({
  appId: '855391',
  key: 'b2809c73fbc28accc074',
  secret: '65ea3c21e522a4fc45a7',
  cluster: 'us2',
  encrypted: true,
});
const channel = 'users';


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pointless", { useNewUrlParser: true });
mongoose.connect(URI, { useNewUrlParser: true });


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log('Node server running on port ' + PORT);
  });

  const userCollection = db.collection('users');
  const changeStream = userCollection.watch();

  // userCollection.find({}, (err,data) => {
  //   console.log(data)
  // })

  // changeStream.on("load")

  changeStream.on('change', (change) => {
    console.log(change);

    if (change.operationType === 'insert') {
      const user = change.fullDocument;
      console.log('inserted');
      pusher.trigger(
        channel,
        'inserted', {
          id: user._id,
          username: user.username,
          score: user.score
        }
      );
    } else if (change.operationType === 'delete') {
      pusher.trigger(
        channel,
        'deleted',
        change.documentKey._id
      );
    }
    else if (change.operationType === 'update') {
      const user = change;
      console.log('updated');
      pusher.trigger(
        channel,
        'updated', {
          id: user.documentKey._id,
          score: user.updateDescription.updatedFields.score
        }
      );
    }
  });
});
