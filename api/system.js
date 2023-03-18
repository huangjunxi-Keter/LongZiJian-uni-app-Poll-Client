import {
	request,
	getRequestAddress
} from '@/utils/request.js'

export function upload(path, savePath, oldFileName) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: getRequestAddress() + "/sys/upload",
			filePath: path,
			name: 'uploadFile',
			formData: {
				path: savePath,
				oldFileName
			},
			success(response) {
				console.warn(`upload state：${response.statusCode}`);
				resolve(response.data);
			},
			fail(error) {
				console.error(error);
				reject(error);
			}
		});
	})
}

export function getVerificationCode() {
	return request({
		url: '/sys/getVerificationCode'
	})
}

export function sendEmail(email, title, content) {
	return request({
		method: 'post',
		url: '/sys/send-email',
		data: {
			email,
			title,
			content
		}
	})
}
