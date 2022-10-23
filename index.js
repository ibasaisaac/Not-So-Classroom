// import installed packages
const express = require('express')
const session = require('express-session');
const cookieParser = require("cookie-parser");
var connection = require('./database');
var login = require('./login');
var register = require('./register');
const bodyparser = require('body-parser')
const nodemailer = require('nodemailer')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express();

//View Engine
app.engine('handlebars', exphbs.engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ " }));
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //.001s
}));
app.use(cookieParser());
// app.use('/static',express.static(path.join(__dirname, 'static')));
// http://localhost:3001/
app.get('/', function (request, response) {
    if (request.session.userid) {
        response.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }
    else {
        // Render login template
        //response.render('spash');
        response.sendFile(path.join(__dirname + '/spash.html'));
    }
});

// http://localhost:3001/auth
app.post('/auth', login.loginverify);
app.post('/auth2', register.registerverify1);
app.post('/verify', register.registerverify2);
app.post('/resend', register.registerverify3);

// http://localhost:3000/home
app.get('/home', function (request, response) {
    // If the user is loggedin
    if (request.session.loggedin) {
        // Output username
        usern = request.session.username;
        response.sendFile(path.resolve(__dirname, 'home.html'));
        // // response.sendFile(path.join(__dirname + '/home.html'));


    } else {
        // Not logged in
        response.send('Please login to view this page!');
    }

});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});











module.exports = app;