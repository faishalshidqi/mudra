const routes = handler => [
	{
		method: 'POST',
		path: '/upload',
		handler: (request, h) => handler.postImageUploadHandler(request, h),
		options: {
			payload: {
				allow: 'multipart/form-data',
				multipart: true,
				output: 'stream',
				maxBytes: 512000
			}
		}
	}
]

module.exports = routes
