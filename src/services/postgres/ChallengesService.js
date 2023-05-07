const { Pool } = require('pg')
const NotFoundError = require('../../exceptions/NotFoundError')

class ChallengesService {
  constructor() {
    this._pool = new Pool()
  }

  async getChallenges() {
    const query = 'SELECT * FROM challenges WHERE is_delete = false'

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('Challenges tidak ditemukan')
    }
    
    return result.rows
  }

  async getChallengeById(id) {
    const query = {
      text: 'SELECT * FROM challenges WHERE id=$1',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('Challenge tidak ditemukan')
    }

    return result.rows[0]
  }
}

module.exports = ChallengesService