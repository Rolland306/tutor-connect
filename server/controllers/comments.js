import { pool } from '../config/database.js'

const createComment = async (req, res) => {
    try {
        const { text, timestamp, user_id, chapter_id } = req.body

        const results = await pool.query(
            `INSERT INTO comments (text, timestamp, user_id, chapter_id)
      VALUES($1, $2, $3, $4) 
      RETURNING *`,
            [text, timestamp, user_id, chapter_id]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getComments = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM comments ORDER BY comment_id ASC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getComment = async (req, res) => {
    try {
        const comment_id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM comments WHERE comment_id = $1', [comment_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateComment = async (req, res) => {
    try {
        const comment_id = parseInt(req.params.id)
        const { text, timestamp, user_id, chapter_id } = req.body
        const results = await pool.query(
            `UPDATE comments
      SET text = $1, timestamp = $2, user_id = $3, chapter_id = $4
      WHERE comment_id = $5`,
            [text, timestamp, user_id, chapter_id, comment_id]
        )
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment_id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM comments WHERE comment_id = $1', [comment_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    createComment,
    getComments,
    getComment,
    updateComment,
    deleteComment
}