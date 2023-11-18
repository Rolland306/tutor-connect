import { pool } from '../config/database.js'

const createNote = async (req, res) => {
    try {
        const { text, timestamp, tutor_id, chapter_id } = req.body

        const results = await pool.query(
            `INSERT INTO notes (text, timestamp, tutor_id, chapter_id)
      VALUES($1, $2, $3, $4) 
      RETURNING *`,
            [text, timestamp, tutor_id, chapter_id]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getNotes = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM notes ORDER BY note_id ASC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getNote = async (req, res) => {
    try {
        const note_id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM notes WHERE note_id = $1', [note_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateNote = async (req, res) => {
    try {
        const note_id = parseInt(req.params.id)
        const { text, timestamp, tutor_id, chapter_id } = req.body
        const results = await pool.query(
            `UPDATE notes
      SET text = $1, timestamp = $2, tutor_id = $3, chapter_id = $4,
      WHERE note_id = $5`,
            [text, timestamp, tutor_id, chapter_id, note_id]
        )
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteNote = async (req, res) => {
    try {
        const note_id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM notes WHERE note_id = $1', [note_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
}