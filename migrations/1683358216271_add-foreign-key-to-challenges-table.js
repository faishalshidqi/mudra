/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.addConstraint('challenges', 'challenges.course.id', 'FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE')
}

exports.down = pgm => {
  pgm.dropConstraint('challenges', 'challenges.course.id')
}
