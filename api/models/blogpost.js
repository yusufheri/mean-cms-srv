const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
	title: String,
	subTitle: String,
	image: String,
	smallImage: String,
	content: String,
	like: {type: Number, default: 0},
	disLike: {type: Number, default: 0},
	slug: String,
	createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('BlogPost', blogPostSchema);