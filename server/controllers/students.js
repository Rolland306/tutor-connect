import { pool } from '../config/database.js'

const createStudent = async (req, res) => {
    try {
        const student_id = parseInt(req.params.id)
        const { student_name } = req.body

        const results = await pool.query(
            `INSERT INTO students (student_name, student_id)
      VALUES($1, $2) 
      RETURNING *`,
            [student_name, student_id]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getStudents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM students ORDER BY student_id ASC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getStudent = async (req, res) => {
    try {
        const student_id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM students WHERE student_id = $1', [student_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateStudent = async (req, res) => {
    try {
        const student_id = parseInt(req.params.id)
        const { student_name } = req.body
        const results = await pool.query(
            `UPDATE students
      SET student_name = $1,
      WHERE student_id = $2`,
            [student_name, student_id]
        )
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteStudent = async (req, res) => {
    try {
        const student_id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM students WHERE student_id = $1', [student_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent
}