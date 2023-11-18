import express from 'express'
import cors from 'cors'
import userRoutes from './routes/users.js'
import tutorRoutes from './routes/tutors.js'
import studentRoutes from './routes/students.js'
import notesRoutes from './routes/notes.js'
import commentsRoutes from './routes/comments.js'
import classesRoutes from './routes/classes.js'
import chaptersRoutes from './routes/chapters.js'


const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ Tutor-Connect API</h1>')
})

app.use('/api/users', userRoutes)
app.use('/api/tutors', tutorRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/notes', notesRoutes)
app.use('/api/comments', commentsRoutes)
app.use('/api/classes', classesRoutes)
app.use('/api/chapters', chaptersRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
})