import express from 'express'
import studentsController from '../controllers/students.js'

const router = express.Router()

router.get('/', studentsController.getStudents)
router.get('/:id', studentsController.getStudent)
router.post('/', studentsController.createStudent)
router.delete('/:id', studentsController.deleteStudent)
router.patch('/:id', studentsController.updateStudent)


export default router