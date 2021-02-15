const router = require('express').Router();
const {
    getAllThought,
    addThought,
    getThoughtById,
    addReaction,
    removeReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);


router.route('/').get(getAllThought);
// /api/thoughts/<userId>/<thoughtId>
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(addReaction)


// /api/thoughts/<userId>/<thoughtId><reactionId>
router.route('/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
