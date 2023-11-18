import { pool } from '../config/database.js'

const createTutor = async (req, res) => {
    try {
        const tutor_id = parseInt(req.params.id)
        const { tutor_name } = req.body

        const results = await pool.query(
            `INSERT INTO tutors (tutor_name, tutor_id)
      VALUES($1, $2) 
      RETURNING *`,
            [tutor_name, tutor_id]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getTutors = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM tutors ORDER BY tutor_id ASC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getTutor = async (req, res) => {
    try {
        const tutor_id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM tutors WHERE tutor_id = $1', [tutor_id])
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateNumStudents = async (req, res) => {
    try {
        const tutor_id = parseInt(req.params.id)
        const { num_students } = req.body
        const results = await pool.query(
            `UPDATE tutors
      SET num_students = $1
      WHERE tutor_id = $2`,
            [parseInt(num_students), tutor_id]
        )
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteTutor = async (req, res) => {
    try {
        const tutor_id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM tutors WHERE tutor_id = $1', [tutor_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getTutors,
    getTutor,
    createTutor,
    deleteTutor,
    updateNumStudents
}