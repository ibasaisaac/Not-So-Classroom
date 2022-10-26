// var login = require('./login');
// var register = require('./register');
import {express, session, path, cookieparser, app} from './bundles.js';

const PORT = process.env.PORT || 3001;
app.use(express.static('./static'));

//cookie and session
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 } //.001s
// }));
// app.use(cookieparser());


//http://localhost:3001/
app.get('/', function (request, response) {
    // if (request.session.userid) { //if keep me logged in was checked
    //     response.send("Welcome User <a href=\'/logout'>click to logout</a>");
    // }
    // else {
        response.sendFile('./static/splash.html', {root: '.'}); //wont change url to /plash.html
   // }
});

// http://localhost:3001/auth
app.post('/auth', login.loginverify);
app.post('/send-email-otp', register.registerverify1);
app.post('/verify-email-otp', register.registerverify2);
app.post('/resend-email-otp', register.registerverify3);

// http://localhost:3000/home
app.get('/home', function (request, response) {
    // If the user is loggedin
    if (request.session.loggedin) {
        // Output username
        usern = request.session.username;
        response.sendFile(path.resolve(__dirname, 'home.html'));
        // // response.sendFile( path.join(__dirname + '/home.html'));


    } else {
        // Not logged in
        response.send('Please login to view this page!');
    }

});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


