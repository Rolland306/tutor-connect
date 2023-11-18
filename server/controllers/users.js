import { pool } from '../config/database.js'
const createUser = async (req, res) => {
    try {
        const { username, password, email, role, created_at } = req.body
        const results = await pool.query(
            `INSERT INTO users (username, password, email, role, created_at)
             VALUES($1, $2, $3, $4, $5)
             RETURNING * `,
            [username, password, email, role, created_at]
        )

        res.status(201).json(results.rows[0])
    }

    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getUsers = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM users ORDER BY user_id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const results = await pool.query('SELECT * FROM users WHERE user_id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
        console.log('Unable to get user')
        console.log('Error:', error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const { username, password, email, role, created_at } = req.body
        const id = parseInt(req.params.id)

        const results = await pool.query(
            `UPDATE users
             SET username = $1, password = $2, email = $3, role = $4, created_at = $5
             WHERE user_id = $8`,
            [username, password, email, role, created_at, id]
        )

        res.status(200).json(results.rows[0]);
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const comment_deletion = await pool.query(
            `DELETE FROM comments
      WHERE user_id = $1`,
            [id]
        )
        const student_deletion = await pool.query(
            `DELETE FROM students
             WHERE student_id = $1`,
            [id]
        )
        const notes_deletion = await pool.query(
            `DELETE FROM notes
            WHERE tutor_id = $1`,
            [id]
        )
        const tutor_deletion = await pool.query(
            `DELETE FROM tutors
            WHERE tutor_id = $1`,
            [id]
        )
        const results = await pool.query('DELETE FROM users WHERE user_id = $1', [id])
        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(409).json({ error: error.message })
    }

}



export default {
    createUser,
    getUsers
    ,
    getUser,
    updateUser,
    deleteUser
}
