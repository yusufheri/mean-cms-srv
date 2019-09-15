const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.post('/signup', (req, res) => {
	console.log('user from req.body >>> ', req.body);
	const newUser = new User(req.body);
	newUser.save((error, user) => {
		if (error) { return res.status(500).json(error); }
		
		req.logIn(req.body, (err) => {
			if (err) { console.log('err in registre', err);}
			res.status(201).json(user);
		});
	});
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/auth/success',
	failureRedirect: '/auth/failure'
}));

router.get('/success', (req, res) => {
	res.status(200).json({ msg: 'logged in', user: req.user });
});

router.get('/failure', (req, res) => {
	res.status(401).json({ msg: 'Not logged in' });
});

router.get('/registre/all', (req, res) => {
	res.status(200).json({msg: 'Success'});
});

router.get('/logout', (req, res) => {
	req.logOut();
	res.status(200).json({msg: 'Logged out successfully'});
});

module.exports = router;