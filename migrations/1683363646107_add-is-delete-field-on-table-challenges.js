/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
	pgm.addColumns('challenges', {
		is_deleted: {
			type: 'boolean',
			notNull: true
		}
	})
}

exports.down = pgm => {
	pgm.dropColumns('challenges', 'is_delete')
}
