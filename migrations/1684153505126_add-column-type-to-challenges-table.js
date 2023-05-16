/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
	pgm.addColumn('challenges', {
		type: {
			type: 'text',
			notNull: true
		}
	})
}

exports.down = pgm => {
	pgm.dropColumn('challenges', 'type')
}
