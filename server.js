let express = require('express');
let app = express();


const api = require('./api/v1/index');
const auth = require('./auth/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// to allow request from my Angular test client that use another port
const cors = require('cors');

// Passport
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Strategy = require('passport-local').Strategy;
// to retrieve users from the MongoDB users collection
const User = require('./auth/models/user');

app.use(cookieParser());
app.use(session({
	resave: true, // Empêcher l'affichage des erreurs sur la console
	secret: 'My secret',	
	saveUninitialized: true,
	name: 'meancms-cookie',
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((user, cb) => {
	cb(null, user);
});


passport.use(new Strategy({
	usernameField: 'username',
	passwordField: 'password',
}, (name, psw, cb) => {
	User.findOne({username: name}, (err, user) => {
		if (err) {
			console.error(`Could not found ${name} is MongoDB`, err);			
		} else {
			if (user.password !== psw ) {
				console.log(`wrong password for ${name}`);
				cb(null, false);
			} else {
				console.log(`${name} found is Mongodb and authentificated`);
				cb(null, user);
			}
		}		
	});
}));

const connection = mongoose.connection;

app.set('port',( process.env.PORT || 4000));

//  Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors({credentials: true, origin: 'http://localhost:4200'})); // Il doit être definie avant bodyParser

const uploader = require('path').join(__dirname, '/uploads');
console.log('uploader', uploader);
app.use(express.static(uploader));


app.use('/api/v1', api);
app.use('/auth', auth);

app.use((req, res, next) => {
	console.log(`req is handled at ${new Date()}`);
	next();
});


mongoose.connect('mongodb://localhost:27017/meancms', {useNewUrlParser: true});
connection.on('error', (err) => {
	console.error(`Connection to MongoDB error : ${err.message}`);
});

connection.once('open', () => {
	console.error('Connection to MongoD');
    
	app.listen(app.get('port'), () => {
		const port = app.get('port');
		console.log('Express is listen on port ' + (port) + ' !!');
	});
});
