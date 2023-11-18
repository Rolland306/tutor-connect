import express from 'express'
import notesController from '../controllers/notes.js'

const router = express.Router()

router.get('/', notesController.getNotes)
router.get('/:id', notesController.getNote)
router.post('/', notesController.createNote)
router.delete('/:id', notesController.deleteNote)
router.patch('/:id', notesController.updateNote)


export default router