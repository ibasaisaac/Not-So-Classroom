import {express, session, path, cookieparser, app} from './bundles.js';
import * as login from './login.js';
import * as register from './register.js';

const PORT = process.env.PORT || 3001;
app.use(express.static('./static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie and session
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
app.post('/validate_register_form', register.validate_register_form);
app.post('/send_email_otp', register.send_email_otp);
app.post('/verify_email_otp', register.verify_email_otp);
app.post('/send_forget_otp', login.send_forget_otp);
app.post('/resend_forget_otp', login.resend_forget_otp);
app.post('/verify_forget_otp', login.verify_forget_otp);

// http://localhost:3000/home
// app.get('/home', function (request, response) {
//     // If the user is loggedin
//     if (request.session.loggedin) {
//         // Output username
//         usern = request.session.username;
//         response.sendFile(path.resolve(__dirname, 'home.html'));
//         // // response.sendFile( path.join(__dirname + '/home.html'));


//     } else {
//         // Not logged in
//         response.send('Please login to view this page!');
//     }

// });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


