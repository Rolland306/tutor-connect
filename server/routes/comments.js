import express from 'express'
import commentsController from '../controllers/comments.js'

const router = express.Router()

router.get('/', commentsController.getComments)
router.get('/:id', commentsController.getComment)
router.post('/', commentsController.createComment)
router.delete('/:id', commentsController.deleteComment)
router.patch('/:id', commentsController.updateComment)


export default router