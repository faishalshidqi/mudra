/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {}

module.exports = {
    env: {
        API_URL: 'http://localhost:5000'
    }
}
