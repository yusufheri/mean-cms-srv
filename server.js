let express = require('express');
let cors = require('cors');
let router = require('./api/v1/index');

let app = express();
app.set('port',( process.env.PORT || 4000));

//  Middleware
app.use(cors());
app.use((req, res, next) => {
	console.log(`req is handked at ${new Date()}`);
	next();
});
app.use('/api/v1', router);

app.listen(app.get('port'), () => {
	const port = app.get('port');
	console.log('Express is listen on port' + (port) + ' !!');
});
