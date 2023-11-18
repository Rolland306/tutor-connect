import express from 'express'
import tutorsController from '../controllers/tutors.js'

const router = express.Router()

router.get('/', tutorsController.getTutors)
router.get('/:id', tutorsController.getTutor)
router.post('/', tutorsController.createTutor)
router.delete('/:id', tutorsController.deleteTutor)
router.patch('/:id', tutorsController.updateNumStudents)


export default router