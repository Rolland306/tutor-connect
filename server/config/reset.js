import { pool } from './database.js'
import './dotenv.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import fs from 'fs'

const currentPath = fileURLToPath(import.meta.url)
const usersFile = fs.readFileSync(path.join(dirname(currentPath), '../config/data/users.json'))
const usersData = JSON.parse(usersFile)

const classesFile = fs.readFileSync(path.join(dirname(currentPath), '../config/data/classes.json'))
const classesData = JSON.parse(classesFile)

const chaptersFile = fs.readFileSync(path.join(dirname(currentPath), '../config/data/chapters.json'));
const chaptersData = JSON.parse(chaptersFile);

const createUsersTable = async () => {
  const createUsersTableQuery = `
    DROP TABLE IF EXISTS users CASCADE;

    CREATE TABLE IF NOT EXISTS users (
      user_id serial PRIMARY KEY,
      username varchar(100) NOT NULL,
      password varchar(100) NOT NULL,
      email varchar(100) NOT NULL,
      role varchar(20) NOT NULL,
      created_at timestamp DEFAULT NOW()
    );
  `;

  try {
    const res = await pool.query(createUsersTableQuery);
    console.log('🎉 users table created successfully');
  } catch (error) {
    console.error('⚠️ error creating users table', error);
  }
};


const createChaptersTable = async () => {
  const createChaptersTableQuery = `
    DROP TABLE IF EXISTS chapters CASCADE;

    CREATE TABLE IF NOT EXISTS chapters (
      chapter_id serial PRIMARY KEY,
      chapter_name varchar(100) NOT NULL,
      content text,
      class_id int NOT NULL,
      FOREIGN KEY (class_id) REFERENCES classes(class_id) ON UPDATE CASCADE
    );
  `;

  try {
    const res = await pool.query(createChaptersTableQuery);
    console.log('🎉 chapters table created successfully');
  } catch (error) {
    console.error('⚠️ error creating chapters table', error);
  }
};

const createCommentsTable = async () => {
  const createCommentsTableQuery = `
    CREATE TABLE IF NOT EXISTS comments (
      comment_id serial PRIMARY KEY,
      text text NOT NULL,
      timestamp timestamp DEFAULT NOW(),
      user_id integer NOT NULL,
      chapter_id integer NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE,
      FOREIGN KEY (chapter_id) REFERENCES chapters(chapter_id) ON UPDATE CASCADE
    );
  `;

  try {
    const res = await pool.query(createCommentsTableQuery);
    console.log('🎉 comments table created successfully');
  } catch (error) {
    console.error('⚠️ error creating comments table', error);
  }
};


const createStudentsTable = async () => {
  const createStudentsTableQuery = `
    DROP TABLE IF EXISTS students CASCADE;

    CREATE TABLE IF NOT EXISTS students (
      student_id serial PRIMARY KEY,
      student_name varchar(100) NOT NULL,
      FOREIGN KEY (student_id) REFERENCES users(user_id) ON UPDATE CASCADE
    );
  `;

  try {
    const res = await pool.query(createStudentsTableQuery);
    console.log('🎉 students table created successfully');
  } catch (error) {
    console.error('⚠️ error creating students table', error);
  }
};

const createTutorsTable = async () => {
  const createTutorsTableQuery = `
    DROP TABLE IF EXISTS tutors CASCADE;

    CREATE TABLE IF NOT EXISTS tutors (
      tutor_id serial PRIMARY KEY,
      tutor_name varchar(100) NOT NULL,
      num_students integer,
      FOREIGN KEY (tutor_id) REFERENCES users(user_id) ON UPDATE CASCADE
    );
  `;

  try {
    const res = await pool.query(createTutorsTableQuery);
    console.log('🎉 tutors table created successfully');
  } catch (error) {
    console.error('⚠️ error creating tutors table', error);
  }
};

const createNotesTable = async () => {
  const createNotesTableQuery = `
    DROP TABLE IF EXISTS notes;

    CREATE TABLE IF NOT EXISTS notes (
      note_id serial PRIMARY KEY,
      text text NOT NULL,
      timestamp timestamp DEFAULT NOW(),
      tutor_id integer NOT NULL,
      chapter_id integer NOT NULL,
      FOREIGN KEY (tutor_id) REFERENCES users(user_id) ON UPDATE CASCADE,
      FOREIGN KEY (chapter_id) REFERENCES chapters(chapter_id) ON UPDATE CASCADE
    );
  `;

  try {
    const res = await pool.query(createNotesTableQuery);
    console.log('🎉 notes table created successfully');
  } catch (error) {
    console.error('⚠️ error creating notes table', error);
  }
};

const createClassesTable = async () => {
  const createClassesTableQuery = `
    DROP TABLE IF EXISTS classes CASCADE;
    
    CREATE TABLE IF NOT EXISTS classes (
      class_id serial PRIMARY KEY,
      class_name varchar(100) NOT NULL
    );
  `;

  try {
    const res = await pool.query(createClassesTableQuery);
    console.log('🎉 classes table created successfully');
  } catch (error) {
    console.error('⚠️ error creating classes table', error);
  }
};

const seedUsersTable = async () => {
  await createUsersTable()

  usersData
    .forEach((user) => {
      const insertQuery = {
        text: 'INSERT INTO users (username, password, email, role, created_at) VALUES ($1, $2, $3, $4, $5)'
      }

      const values = [
        user.username,
        user.password,
        user.email,
        user.role,
        user.created_at
      ]

      try {
        pool.query(insertQuery, values)
        console.log(`✅ ${user.user_id} added successfully`)
      }
      catch (err) {
        console.error('⚠️ error inserting user', err)
      }

    })
}

const seedClassesTable = async () => {
  await createClassesTable()

  classesData.forEach((classItem) => {
    const insertQuery = {
      text: 'INSERT INTO classes (class_name) VALUES ($1)'
    }

    const values = [
      classItem.class_name
    ]

    try {
      pool.query(insertQuery, values)
      console.log(`✅ ${classItem.class_id} added successfully`)
    }
    catch (err) {
      console.error('⚠️ error inserting user', err)
    }

  })
}

const seedTutorsTable = async () => {
  await createTutorsTable()

  const getUsersWithTutorRoleQuery = 'SELECT * FROM users WHERE role = $1';
  const insertTutorQuery = `
    INSERT INTO tutors (tutor_name, num_students) VALUES ($1, $2)
  `;

  try {
    // Fetch users with the tutor role
    const tutorUsers = await pool.query(getUsersWithTutorRoleQuery, ['tutor']);
    console.log("tutorUsers: ", tutorUsers)

    // Insert tutors into the tutors table using forEach
    tutorUsers.rows.forEach(async (tutorUser) => {
      const values = [tutorUser.username, 10]; // Set the default value for num_students

      try {
        await pool.query(insertTutorQuery, values);
        console.log(`✅ Tutor ${tutorUser.username} added successfully`);
      } catch (error) {
        console.error(`⚠️ Error adding tutor ${tutorUser.username}`, error);
      }
    });

    console.log('🎉 Tutors table seeded successfully');
  } catch (error) {
    console.error('⚠️ Error seeding tutors table', error);
  }
};

const seedChaptersTable = async () => {
  await createChaptersTable();

  chaptersData.forEach(async (chapter) => {
    const insertQuery = {
      text: 'INSERT INTO chapters (chapter_name, content, class_id) VALUES ($1, $2, $3)',
    };

    const values = [
      chapter.chapter_name,
      chapter.content,
      chapter.class_id,
    ];

    try {
      await pool.query(insertQuery, values);
      console.log(`✅ Chapter ${chapter.chapter_name} added successfully`);
    } catch (err) {
      console.error('⚠️ Error inserting chapter', err);
    }
  });

  console.log('🎉 Chapters table seeded successfully');
};


seedUsersTable()
seedClassesTable()
seedTutorsTable()
seedChaptersTable()
createCommentsTable()
createStudentsTable()
createNotesTable()

