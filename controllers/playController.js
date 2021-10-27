const { isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('play/create');
});

router.post('/create', isUser(), async (req, res) => {
    // console.log(req.body); CHECK WHAT U GET IN CONSOLE (if smth is worng mostly likely it is view related)
    try {
        const playData = {
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            public: Boolean(req.body.public),
            author: req.user._id
        }

        await req.storage.createPlay(playData);

        res.redirect('/');
    } catch (err) {
        console.log(Object.values(err.errors).map(e => e.properties.message));
        const ctx = {
            errors: [err.message],
            playData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                public: Boolean(req.body.public),
            }

        };
        res.render('play/create', ctx);
    }
});

module.exports = router;