const ClientError = require('../../exceptions/ClientError')

class UploadsHandler {
	constructor(service) {
		this._service = service
	}

	async postUploadImageHandler(request, h) {
		try {
			const {file} = request.payload
			console.log(file)

			const fileLocation = await this._service.uploadFile(file)
			console.log(fileLocation)
			const response = h.response({
				status: 'success',
				data: {
					fileLocation
				}
			})
			response.code(201)
			return response
		} catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'failed',
					message: error.message
				})
				response.code(error.statusCode)
				return response
			}
			const response = h.response({
				status: 'error',
				//message: 'Sorry for the inconvenience, our server is having an error.'
				message: error.message
			})
			response.code(500)
			return response
		}
	}
}

module.exports = UploadsHandler
