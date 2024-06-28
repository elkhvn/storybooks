const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');



// Load config (environment)
dotenv.config({ path: './config/config.env' });




// Passport config
require('./config/passport')(passport);



const app = express();


// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Method override
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}));





// Connect to database
connectDB();


// Use request logger in development mode
if (process.env.NODE_ENV === 'development') { // check whether it is development mode or not
    app.use(morgan('dev'));
}



// Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon } = require('./helpers/hbs');



// Setup handlebars 
app.engine('.hbs', exphbs({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon
    },
    defaultLayout: 'main',
    extname: '.hbs'
})); // to make template extesions `.hbs`
app.set('view engine', '.hbs');



// Session middleware
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))



// Passport middleware
app.use(passport.initialize());
app.use(passport.session()); // Used to persist login sessions 



// Set global variable
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})


// Static folder
app.use(express.static(path.join(__dirname, 'public')))



// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));



// Configure our port and start to listen
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});