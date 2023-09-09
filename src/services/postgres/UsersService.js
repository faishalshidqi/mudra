const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const bcrypt = require('bcrypt')
const InvariantError = require('../../exceptions/InvariantError')
const AuthenticationError = require('../../exceptions/AuthenticationError')
const AuthorizationError = require('../../exceptions/AuthorizationError')

class UsersService {
	constructor() {
		this._pool = new Pool()
	}

	async addUser({ username, password, fullname, authorized: isAdmin }) {
		await this.verifyUsername(username)
		const id = `user-${nanoid(16)}`
		const hashedPassword = await bcrypt.hash(password, 10)
		if (!isAdmin) {
			isAdmin = false
		}
		const query = {
			text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5) RETURNING id',
			values: [id, fullname, username, hashedPassword, isAdmin],
		}
		const result = await this._pool.query(query)
		if (!result.rowCount) {
			throw new InvariantError('User gagal ditambahkan')
		}

		return result.rows[0].id
	}

	async verifyUsername(username) {
		const query = {
			text: 'SELECT * FROM users WHERE username = $1',
			values: [username],
		}

		const result = await this._pool.query(query)
		if (result.rows.length > 0) {
			throw new InvariantError('Gagal menambahkan user. Username sudah digunakan')
		}
	}

	async verifyAdminRole(id) {
		const query = {
			text: 'select * from users where "isAdmin" = true and id = $1',
			values: [id]
		}
		const result = await this._pool.query(query)
		if (!result.rowCount) {
			throw new AuthorizationError('Invalid user')
		}
	}

	async verifyUserCredential(username, password) {
		const query = {
			text: 'SELECT id, password FROM users WHERE username = $1',
			values: [username],
		}
		const result = await this._pool.query(query)
		if (!result.rows.length) {
			throw new AuthenticationError('Kredensial (user) tidak valid')
		}

		const { id, password: hashedPassword } = result.rows[0]

		const match = await bcrypt.compare(password, hashedPassword)
		if (!match) {
			throw new AuthenticationError('Kredensial (password) tidak valid')
		}
		return id
	}
}

module.exports = UsersService
