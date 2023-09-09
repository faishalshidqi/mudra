/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
	pgm.createTable('users', {
		id: {
			type: 'text',
			primaryKey: true,
		},
		fullname: {
			type: 'text',
			notNull: true,
		},
		username: {
			type: 'varchar(25)',
			notNull: true,
		},
		password: {
			type: 'text',
			notNull: true,
		},
		isAdmin: {
			type: 'boolean',
		}
	})
}

exports.down = pgm => {
	pgm.dropTable('users')
}
