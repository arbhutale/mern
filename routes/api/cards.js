const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Card = require('../../models/Card');
const User = require('../../models/User');

router.post(
    '/',
    auth,
    async (req, res) => {
        // Check if email was provided
        if (!req.body.nickname) {
            res.json({ success: false, message: 'You must provide card holder nickname' }); // Return error
        } else {
            // Check if username was provided
            if (!req.body.name) {
                res.json({ success: false, message: 'You must provide a card holder name' }); // Return error
            } else {
                // Check if password was provided
                if (!req.body.card_no) {
                    res.json({ success: false, message: 'You must provide a card number' }); // Return error
                } else {
                    if (!req.body.cvv) {
                        res.json({ success: false, message: 'You must provide a card type' });
                    } else {
                        if (!req.body.expiry) {
                            res.json({ success: false, message: 'You must provide a card expiry' });
                        } else {
                            if (!req.body.card_bank) {
                                res.json({ success: false, message: 'You must provide a  card_bank' }); // Return error
                            } else {
                                if (!req.body.card_type) {
                                    res.json({ success: false, message: 'You must provide a card type ' }); // Return error
                                } else {
                                    if (req.body.card_type != "Credit" && "Debit" && "Others") {
                                        console.log(req.body.card_type)
                                        res.json({ success: false, message: 'You must provide a Credit, Debit or Other Card Value' });
                                    } else {
                                        if (!req.body.card_pin) {
                                            res.json({ success: false, message: 'You must provide a card pin ' }); // Return error
                                        } else {
                                            if (!req.body.createdBy) {
                                                res.json({ success: false, message: 'You must provide a Created By ' }); // Return error
                                            } else {
                                                // Create new user object and apply user input
                                                let card = new Card({
                                                    name: req.body.name,
                                                    nickname: req.body.nickname,
                                                    card_no: req.body.card_no,
                                                    expiry: req.body.expiry,
                                                    cvv: req.body.cvv,
                                                    card_bank: req.body.card_bank,
                                                    card_type: req.body.card_type,
                                                    card_pin: req.body.card_pin,
                                                    createdBy: req.body.createdBy
                                                });
                                                // Save user to database
                                                card.save((err) => {
                                                    // Check if error occured
                                                    if (err) {
                                                        console.log(req.body)
                                                        // console.log(err)
                                                        if (err.code === 11000) {
                                                            res.json({ success: false, message: 'card already exists' }); // Return error
                                                        } else {
                                                            res.json({ success: false, message: 'Could not save user. Error: ', err });
                                                        }
                                                    } else {
                                                        res.json({ success: true, message: 'Card registered!' }); // Return success
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    });

router.put(
    '/:id',
    auth,
    async (req, res) => {
        // Check if email was provided
        if (!req.body.nickname) {
            res.json({ success: false, message: 'You must provide card holder nickname' }); // Return error
        } else {
            // Check if username was provided
            if (!req.body.name) {
                res.json({ success: false, message: 'You must provide a card holder name' }); // Return error
            } else {
                // Check if password was provided
                if (!req.body.card_no) {
                    res.json({ success: false, message: 'You must provide a card number' }); // Return error
                } else {
                    if (!req.body.cvv) {
                        res.json({ success: false, message: 'You must provide a card type' });
                    } else {
                        if (!req.body.expiry) {
                            res.json({ success: false, message: 'You must provide a card expiry' });
                        } else {
                            if (!req.body.card_bank) {
                                res.json({ success: false, message: 'You must provide a  card_bank' }); // Return error
                            } else {
                                if (!req.body.card_type) {
                                    res.json({ success: false, message: 'You must provide a card type ' }); // Return error
                                } else {
                                    if (req.body.card_type != "Credit" && "Debit" && "Others") {
                                        console.log(req.body.card_type)
                                        res.json({ success: false, message: 'You must provide a Credit, Debit or Other Card Value' });
                                    } else {
                                        if (!req.body.card_pin) {
                                            res.json({ success: false, message: 'You must provide a card pin ' }); // Return error
                                        } else {
                                            if (!req.body.createdBy) {
                                                res.json({ success: false, message: 'You must provide a Created By ' }); // Return error
                                            } else {
                                                // Create new user object and apply user input
                                                Card.findOne({ _id: req.params.id }, (err, card) => {
                                                    if (err) {
                                                        res.json({ success: false, message: 'Not a valid blog id' }); // Return error message
                                                    } else {
                                                        card.name = req.body.name;
                                                        card.nickname = req.body.nickname;
                                                        card.card_no = req.body.card_no;
                                                        card.expiry = req.body.expiry;
                                                        card.cvv = req.body.cvv;
                                                        card.card_bank = req.body.card_bank;
                                                        card.card_type = req.body.card_type
                                                        card.card_pin = req.body.card_pin
                                                        card.createdBy = req.body.createdBy
                                                        card.save((err) => {
                                                            // Check if error occured
                                                            if (err) {
                                                                console.log(req.body)
                                                                // console.log(err)
                                                                if (err.code === 11000) {
                                                                    res.json({ success: false, message: 'card already exists' }); // Return error
                                                                } else {
                                                                    res.json({ success: false, message: 'Could not Update Card. Error: ', err });
                                                                }
                                                            } else {
                                                                res.json({ success: true, message: 'Card Updated registered!' }); // Return success
                                                            }
                                                        });
                                                    }

                                                });
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
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
                    Card.find({ createdBy: user.email }, (err, cards) => {
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
    Card.findOne({ _id: req.params.id }, (err, cards) => {
        // Check if error was found or not
        if (err) {
            res.json({ success: false, message: err }); // Return error message
        } else {
            // Check if cards were found in database
            if (!cards) {
                res.json({ success: false, message: 'No Cards found.' }); // Return error of no blogs found
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
        Card.findOne({ _id: req.params.id }, (err, card) => {
            if (err) {
                res.json({ success: false, message: 'Invalid id' }); // Return error message
            } else {
                card.remove((err) => {
                    if (err) {
                        res.json({ success: false, message: err }); // Return error message
                    } else {
                        res.json({ success: true, message: 'Card deleted!' }); // Return success message
                    }
                });
            }
        })
    }
});

module.exports = router;