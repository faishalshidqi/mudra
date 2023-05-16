/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
	pgm.createTable('challenges', {
		challenge_id: {
			type: 'varchar(50)',
			primaryKey: true,
		},
		title: {
			type: 'text',
			notNull: true,
		},
		description: {
			type: 'text',
			notNull: true,
		},
		course_id: {
			type: 'varchar(50)',
			notNull: true,
		},
		answer: {
			type: 'varchar(1)',
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
	})
}

exports.down = pgm => {
	pgm.dropTable('challenges')
}
