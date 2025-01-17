const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Story = require('../models/Story');

// @desc    Show add page
// @route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add');
});


// @desc    Process add form
// @route   POST /stories/add
router.post('/add', ensureAuth, async(req, res) => {
    try {
        // Add id to the `req.body` and then create story via `req.body`
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard');

    } catch (err) {
        console.error(err);
        res.render('errors/500')
    }
});



// @desc    Show all stories
// @route   GET /stories
router.get('/', ensureAuth, async(req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user') // Replace the user id in a document with the data of that user
            .sort({ createdAt: 'desc' })
            .lean()

        res.render('stories/index', {
            stories
        })

    } catch (err) {
        console.log(err);
        res.render('/errors/500');
    }
});

// @desc    Show single story
// @route   GET /stories/:id
router.get('/:id', ensureAuth, async(req, res) => {
    try {
        let story = await Story.findById(req.params.id)
            .populate('user')
            .lean()

        if (!story) {
            res.render('errors/404');
        }

        res.render('stories/show', {
            story
        });

    } catch (err) {
        console.error(err);
        res.render('errors/404');
    }
});




// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async(req, res) => {
    try {
        const story = await Story.findOne({
            _id: req.params.id
        }).lean()

        if (!story) {
            return res.render('errors/404');
        }
        if (story.user.toString() != req.user._id.toString()) {
            res.redirect('/stories')
        } else {
            res.render('stories/edit', {
                story,
            });
        }
    } catch (err) {
        return res.render('errors/500')
    }

});


// @desc    Update story
// @route   PUT /stories/:id
router.put('/:id', ensureAuth, async(req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()

        if (!story) {
            return res.render('errors/404');
        }
        if (story.user.toString() != req.user._id.toString()) {
            res.redirect('/stories')
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            });

            res.redirect('/dashboard');
        }
    } catch (err) {
        return res.render('errors/500')
    }
});


// @desc    Delete story
// @route   DELETE /stories/:id
router.delete('/:id', ensureAuth, async(req, res) => {
    try {
        await Story.remove({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (err) {
        return res.render('errors/500')
    }

});





// @desc    User stories
// @route   GET /stories/users/:userId
router.get('/user/:userId', ensureAuth, async(req, res) => {
    try {
        const stories = await Story.find({
                user: req.params.userId,
                status: 'public'
            })
            .populate('user')
            .lean()

        res.render('stories/index', {
            stories
        })
    } catch (error) {
        console.error(error);
        res.render('errors/500');
    }
});


module.exports = router;