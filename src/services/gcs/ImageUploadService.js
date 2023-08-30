const {Storage} = require('@google-cloud/storage')
const path = require('path')
const Path = require('path')
const Url = require('url')

const pathKey = path.resolve(`keys/${process.env.KEY_NAME}`)

class StorageService {
	constructor() {
		this._gcs = new Storage({
			projectId: process.env.PROJECT_ID,
			keyFilename: pathKey
		})
	}

	async uploadFile(file, folder, name) {
		const bucket = this._gcs.bucket(process.env.BUCKET_NAME)
		const extension = Path.extname(Url.parse(file.hapi.filename).pathname)
		const filename = `${folder}/${name}${extension}`
		const fileUploadStream = bucket.file(filename).createWriteStream()

		await new Promise((resolve, reject) => {
			fileUploadStream.on('error', (error) => reject(error))
			fileUploadStream.on('finish', () => resolve())
			file.pipe(fileUploadStream)
		})

		return `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${filename}`
	}
}

module.exports = StorageService
