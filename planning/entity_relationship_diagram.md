# Entity Relationship Diagram

Reference the Creating an Entity Relationship Diagram final project guide in the course portal for more information about how to complete this deliverable.

## Create the List of Tables

Users, Tutors, Students, Chapters, Comments, Notes

## Add the Entity Relationship Diagram

![ERDiagram](https://github.com/Rolland306/tutor-connect/assets/76987595/f674d6ab-03d5-4c87-83c0-0c89692cc56c)


### Table users {
  id integer [primary key];
  username varchar;
  password varchar;
  email varchar;
  role varchar [note: 'Student or Tutor'];
  created_at timestamp;
### }

### Table students {
  student_id integer [primary key];
  student_name varchar;
### }

### Table tutors {
  tutor_id integer [primary key];
  tutor_name varchar;
  max_students integer;
### }

### Table classes {
  class_id integer [primary key];
  class_name varchar;
### }

### Table chapters {
  chapter_id integer [primary key];
  chapter_name varchar;
  content text [note: 'notes and comments for the chapter'];
### }

### Table notes {
  note_id integer [primary key];
  text text;
  timestamp timestamp;
  tutor_id integer [note: 'ID of the tutor who posted the note'];
  chapter_id integer [note: 'ID of the chapter the note is related to'];
### }

### Table comments {
  comment_id integer [primary key];
  text text;
  timestamp timestamp;
  user_id integer [note: 'ID of the user (student) who posted the comment'];
  chapter_id integer [note: 'ID of the chapter the comment is related to'];
### }


Ref:users.id - students.student_id;
Ref:users.id - tutors.tutor_id;
Ref: students.student_id <> classes.class_id;
Ref: tutors.tutor_id <> classes.class_id;
Ref: students.student_id <> tutors.tutor_id;
Ref: tutors.tutor_name < chapters.chapter_id;
Ref: chapters.chapter_name < notes.note_id;
Ref: chapters.chapter_name < comments.comment_id;
Ref: students.student_name < comments.comment_id;
