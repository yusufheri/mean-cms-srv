let express = require('express');


const router = require('./api/v1/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const connection = mongoose.connection;
let app = express();
app.set('port',( process.env.PORT || 4000));


//  Middleware
app.use(cors()); // Il doit être definie avant bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/api/v1', router);
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
