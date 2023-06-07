const {Pool} = require("pg");

class DashboardService{
    constructor() {
        this._pool = new Pool()
    }

    async getDashboardInfo(){
        const query = {
            text: 'select (select count(*) from challenges) as challenges_total, (select (select count(*) from courses) as courses_total)'
        }
        const result = await this._pool.query(query)
        return result.rows[0]
    }
}

module.exports = DashboardService