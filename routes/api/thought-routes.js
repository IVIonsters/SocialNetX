const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    cThought,
    uThought,
    dThought,
    aReaction,
    dReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(cThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getOneThought)
    .put(uThought)
    .delete(dThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(aReaction);

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(dReaction);

module.exports = router;