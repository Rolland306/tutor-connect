import express from 'express'
import classesController from '../controllers/classes.js'

const router = express.Router()

router.get('/', classesController.getClasses)
router.get('/:id', classesController.getClass)
router.post('/', classesController.createClass)
router.delete('/:id', classesController.deleteClass)
router.patch('/:id', classesController.updateClass)


export default router