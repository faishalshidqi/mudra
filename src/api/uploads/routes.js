const routes = (handler) => [
	{
		method: 'POST',
		path: '/upload/images',
		handler: (request, h) => handler.postUploadImageHandler(request, h),
		options: {
			payload: {
				allow: 'multipart/form-data',
				multipart: true,
				output: 'stream'
			}
		}
	}
]

module.exports = routes
