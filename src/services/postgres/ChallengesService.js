const { Pool } = require('pg')

class ChallengesService {
  constructor() {
    this._pool = new Pool()
  }

  async getChallenges() {
    const query = 'SELECT * FROM challenges'

    const result = await this._pool.query(query)
    
    return result.rows
  }

  async getChallengeById(id) {
    const query = {
      text: 'SELECT * FROM challenges WHERE id=$1',
      values: [id]
    }

    const result = await this._pool.query(query)

    return result.rows[0]
  }
}

module.exports = ChallengesService