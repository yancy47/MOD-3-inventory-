const express = require('express')

const router = express.Router()

const commentControl = require('../controllers/commentController')

const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')

// EXTRA ROUTES (for comments)

router.post('/:id/comments', itemControl.createComment)

router.delete('/:id/comments/:cid', itemControl.deleteComment)

router.get('/:id/comments', itemControl.indexComment)

router.get('/:id/comments/:cid', itemControl.showComment)

router.put('/:id/comments/:cid', itemControl.updateComment)
