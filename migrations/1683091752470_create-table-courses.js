/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
    pgm.createTable('courses', {
        course_id: {
            type: 'varchar(50)',
            primaryKey: true
        },
        title: {
            type: 'text',
            notNull: true
        },
        sign_pict_link: {
            type: 'text',
            notNull: true
        },
        description: {
            type: 'text',
            notNull: true
        },
        type: {
            type: 'text',
            notNull: true
        },
        created_at: {
            type: 'text',
            notNull: true
        },
        updated_at: {
            type: 'text',
            notNull: true
        },
        is_deleted: {
            type: 'boolean'
        }
    })
};

exports.down = pgm => {
  pgm.dropTable('courses')
}
