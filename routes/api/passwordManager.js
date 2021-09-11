const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const PasswordManager = require('../../models/Password');
const User = require('../../models/User');

router.post(
    '/',
    auth,
    async (req, res) => {
        // Check if email was provided
        if (!req.body.username) {
            res.json({ success: false, message: 'You must provide  username' }); // Return error
        } else {
            // Check if username was provided
            if (!req.body.password) {
                res.json({ success: false, message: 'You must provide a password' }); // Return error
            } else {
                // Check if password was provided
                if (!req.body.website) {
                    res.json({ success: false, message: 'You must provide a website' }); // Return error
                } else {
                    const newPassword = new PasswordManager({
                        username: req.body.username,
                        password: req.body.password,
                        website: req.body.website,
                        comments : req.body.comments,
                        createdBy : req.body.createdBy
                      });
                      newPassword.save((err,pms) => {
                        // Check if error occured
                        if (err) {
                            console.log(req.body)
                            // console.log(err)
                            if (err.code === 11000) {
                                res.json({ success: false, message: 'Creds already exists' }); // Return error
                            } else {
                                res.json({ success: false, message: 'Could not Update Creds. Error: ', err });
                            }
                        } else {
                            res.json(pms); // Return success
                        }
                    });

                }
        }
    }

    });

router.put(
    '/:id',
    auth,
    async (req, res) => {
        // Check if email was provided
        if (!req.body.username) {
            res.json({ success: false, message: 'You must provide  username' }); // Return error
        } else {
            // Check if username was provided
            if (!req.body.password) {
                res.json({ success: false, message: 'You must provide a password' }); // Return error
            } else {
                // Check if password was provided
                if (!req.body.website) {
                    res.json({ success: false, message: 'You must provide a website' }); // Return error
                } else {

                    PasswordManager.findOne({ _id: req.params.id }, (err, passwordManager) => {
                        if (err) {
                            res.json({ success: false, message: 'Not a valid blog id' }); // Return error message
                        } else {
                            passwordManager.username =  req.body.username,
                            passwordManager.password = req.body.password,
                            passwordManager.website = req.body.website,
                            passwordManager.comments  = req.body.comments,
                            passwordManager.createdBy  = req.body.createdBy
                            passwordManager.save((err) => {
                                // Check if error occured
                                if (err) {
                                    console.log(req.body)
                                    // console.log(err)
                                    if (err.code === 11000) {
                                        res.json({ success: false, message: 'cred already exists' }); // Return error
                                    } else {
                                        res.json({ success: false, message: 'Could not Update Cred. Error: ', err });
                                    }
                                } else {
                                    res.json({ success: true, message: 'Cred Updated registered!' }); // Return success
                                }
                            });
                        }

                    });

                }
        }
    }

    });


router.get('/', auth, (req, res) => {
    try {
        User.findOne({ _id: req.user.id }, (err, user) => {
            if (err) {
                res.json({ success: false, message: 'Could not save user. Error: ', err });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'No User  Found' });
                } else {
                    PasswordManager.find({ createdBy: user.email }, (err, cards) => {
                        // Check if error was found or not
                        if (err) {
                            res.json({ success: false, message: err }); // Return error message
                        } else {
                            // Check if cards were found in database
                            if (!cards) {
                                res.json({ success: false, message: 'No blogs found.' }); // Return error of no blogs found
                            } else {
                                console.log(cards)
                                res.json(cards ); // Return success and blogs array
                            }
                        }
                    }).sort({ '_id': -1 });
                }
            }
            // Return success and blogs array
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

router.get('/:id', auth, (req, res) => {
    // Search database for all blog posts
    PasswordManager.findOne({ _id: req.params.id }, (err, cards) => {
        // Check if error was found or not
        if (err) {
            res.json({ success: false, message: err }); // Return error message
        } else {
            // Check if cards were found in database
            if (!cards) {
                res.json({ success: false, message: 'No Creds found.' }); // Return error of no blogs found
            } else {
                res.json( cards ); // Return success and blogs array
            }
        }
    }).sort({ '_id': -1 }); // Sort blogs from newest to oldest
});


router.delete('/:id', (req, res) => {
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {
        PasswordManager.findOne({ _id: req.params.id }, (err, card) => {
            if (err) {
                res.json({ success: false, message: 'Invalid id' }); // Return error message
            } else {
                card.remove((err) => {
                    if (err) {
                        res.json({ success: false, message: err }); // Return error message
                    } else {
                        res.json({ success: true, message: 'Creds deleted!' }); // Return success message
                    }
                });
            }
        })
    }
});

module.exports = router;