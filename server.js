
// mongodb://heroku_4fq4bdzw:uqnauelbvlc8g2nt1njaqjqe6j@ds043027.mlab.com:43027/heroku_4fq4bdzw 
//Importing Modules
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");
//const MONGODB_URI = `mongodb://mccollins:Passion007!@first-cluster-shard-00-00.xpqes.mongodb.net:27017/mern-example`;
var whitelist = ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:8000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// importing files
const routes = require('./routes/birthday-wishes');

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 8080; // Step 1


// Step 2
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/birthday';
mongoose.connect( uri, {
    useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Configuration
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const wishRouter = require('./routes/birthday-wishes')
app.use('/birthday-wishes', wishRouter);

// Step 3
//if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });


app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});