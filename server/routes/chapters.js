import express from 'express'
import chaptersController from '../controllers/chapters.js'

const router = express.Router()

router.get('/', chaptersController.getChapters)
router.get('/:id', chaptersController.getChapter)
router.post('/', chaptersController.createChapter)
router.delete('/:id', chaptersController.deleteChapter)
router.patch('/:id', chaptersController.updateChapter)


export default router