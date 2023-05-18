/* istanbul ignore file */
require('dotenv').config()
const { Pool } = require('pg')
const format = require('pg-format')

const pool = new Pool()
const GenearateDummyData = async () => {

    console.log('generate data...')
    await generateCourseData()
    await generateChallengesData()

    console.log('semua dummy data berhasil dibuat')
    return 'menghentikkan process'
}

const generateCourseData = async () => {
    const values = []
    for (let i = 0; i < 5; i++) {
        const v = [`co-${i}`, `dummy`, `dummy`, `dummy`, `dummy`, new Date().toISOString(),new Date().toISOString(), false]
        values.push(v)
    }
    await pool.query(format('INSERT INTO courses VALUES %L', values), [])
    console.log('dummy data course berhasil dibuat')
}

const generateChallengesData = async () => {
    const values = []
    for (let i = 0; i < 5; i++) {
        const v = [`chg-${i}`, `dummy`, `dummy`, `co-${i}`, `d`, new Date().toISOString(), new Date().toISOString(), false, `dummy`]
        values.push(v)
    }
    await pool.query(format('INSERT INTO challenges VALUES %L', values), [])
    console.log('dummy data challenges berhasil dibuat')
}

GenearateDummyData();