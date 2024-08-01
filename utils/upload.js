import global from './global.js'

const file = (e, params) => {
	let obj = params?params:{}
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: global.baseUrl  + 'common/upload',
			filePath: e,
			name: 'file',
			formData: {
				...obj
			},
			success: (res) => {
				resolve(JSON.parse(res.data))
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

export default file