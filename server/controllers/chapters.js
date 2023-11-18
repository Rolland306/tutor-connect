import { pool } from '../config/database.js'

const createChapter = async (req, res) => {
    try {
        const { chapter_name, content } = req.body

        const results = await pool.query(
            `INSERT INTO chapters (chapter_name, content)
      VALUES($1, $2) 
      RETURNING *`,
            [chapter_name, content]
        )
        res.status(201).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getChapters = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM chapters ORDER BY chapter_id ASC')
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getChapter = async (req, res) => {
    try {
        const chapter_id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM chapters WHERE chapter_id = $1', [chapter_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateChapter = async (req, res) => {
    try {
        const chapter_id = parseInt(req.params.id)
        const { chapter_name, content } = req.body
        const results = await pool.query(
            `UPDATE chapters
      SET chapter_name = $1, content = $2
      WHERE chapter_id = $3`,
            [chapter_name, content, chapter_id]
        )
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteChapter = async (req, res) => {
    try {
        const chapter_id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM chapters WHERE chapter_id = $1', [chapter_id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    createChapter,
    getChapters,
    getChapter,
    updateChapter,
    deleteChapter
}