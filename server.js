
let express = require('express');


let cors = require('cors');
let router = require('./api/v1/index');
const mongoose = require('mongoose');

const connection = mongoose.connection;
let app = express();
app.set('port',( process.env.PORT || 4000));
app.use('/api/v1', router);

//  Middleware
app.use(cors());
app.use((req, res, next) => {
	console.log(`req is handked at ${new Date()}`);
	next();
});

mongoose.connect('mongodb://localhost/meancms', {useNewUrlParser: true});
connection.on('error', (err) => {
	console.error(`Connection to MongoDB error : ${err.message}`);
});

connection.once('open', () => {
	console.error('Connection to MongoD');
    
	app.listen(app.get('port'), () => {
		const port = app.get('port');
		console.log('Express is listen on port' + (port) + ' !!');
	});
});
