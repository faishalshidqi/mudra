/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {}

module.exports = {
    env: {
        API_URL: process.env.API_URL,
        UPLOAD_URL: process.env.UPLOAD_URL
    }
}
