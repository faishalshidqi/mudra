/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {}

module.exports = {
    env: {
        API_URL: `http://${process.env.HOST}:${process.env.PORT}`
    }
}
