const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const passport = require('passport');

require('dotenv').config();

const usePassport = require('./common/passport');
const useAdminRoutes = require('./routes/index');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}))
app.use(express.static('../build'));

// Passport
usePassport(passport);
app.use(passport.initialize());

// Routes
useAdminRoutes(app)

// Connect to mongodb
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    if (err) throw err;
    console.log("Connected to mongoDB!");
})

app.get('/', (req, res, next) => {
    res.json({msg: "Welcome to API Grade Admin!"});
});


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});








