/** @type {import('next').NextConfig} */
require("dotenv").config()
// const nextConfig = {}

module.exports = {
	env: {
		API_URL: process.env.API_URL,
		UPLOAD_URL: process.env.UPLOAD_URL,
		UPLOAD_URL_DEPLOYED: process.env.UPLOAD_URL_DEPLOYED,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				"hostname": "storage.googleapis.com"
			}
		]
	}
}
