import { pool } from '../config/database.js'

const createClass = async (req, res) => {
    try {
        const class_id = parseInt(req.params.id)
        const { class_name } = req.body

        const results = await pool.query(
            `INSERT INTO classes (class_name, class_id)
      VALUES($1, $2) 
      RETURNING *`,
            [class_name, class_id]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getClasses = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM classes ORDER BY class_id ASC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getClass = async (req, res) => {
    try {
        const class_id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM classes WHERE class_id = $1', [class_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteClass = async (req, res) => {
    try {
        const class_id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM classes WHERE class_id = $1', [class_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateClass = async (req, res) => {
    try {
        const class_id = parseInt(req.params.id)
        const { class_name } = req.body
        const results = await pool.query(
            `UPDATE classes
      SET class_name = $1,
      WHERE note_id = $2`,
            [class_name, class_id]
        )
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    createClass,
    getClasses,
    getClass,
    deleteClass,
    updateClass
}