class UploadsHandler {
	constructor(storageService, validator) {
		this._storageService = storageService
		this._validator = validator
	}

	async postImageUploadHandler(request, h) {
		const {file, foldername, filename} = request.payload

		this._validator.validateImageHeaders(file.hapi.headers)
		const url = await this._storageService.uploadFile(file, foldername, filename)
		const response = h.response({
			status: 'success',
			message: 'Successfully uploaded the file',
			data: {
				url
			}
		})
		response.code(201)
		return response
	}
}

module.exports = UploadsHandler
