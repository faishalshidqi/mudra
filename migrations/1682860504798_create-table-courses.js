/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createTable('courses', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'text',
      notNull: true,
    },
    image_url: {
      type: 'text',
      notNull: true,
    },
    description: {
      type: 'text',
      notNull: true,
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('courses')
}
