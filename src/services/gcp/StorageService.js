const {Storage} = require('@google-cloud/storage')
const path = require('path')

const pathKey = path.resolve(`./${process.env.KEY_NAME}`)

class StorageService {
	constructor() {
		this._gcs = new Storage({
			projectId: process.env.PROJECT_ID,
			keyFilename: pathKey
		})
	}

	async uploadFile(data) {
		const bucket = this._gcs.bucket(process.env.BUCKET_NAME)
		const options = {
			destination: `${new Date()}${data.hapi.filename}`
		}

		await bucket.upload(`src/services/gcp/img/${data.hapi.filename}`, options)
		return `https://storage/googleapis.com/${process.env.BUCKET_NAME}/${data.hapi.filename}`
	}
}

module.exports = StorageService
