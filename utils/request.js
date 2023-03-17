const api_address = "http://192.168.0.126:8003";

export function request({
	url,
	data,
	method
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			method: method || 'get',
			url: api_address + url,
			data,
			success(response) {
				console.warn(`${url} request state：${response.statusCode}`);
				resolve(response.data);
			},
			fail(error) {
				console.error(error);
				reject(error);
			}
		});
	});
}

export function getRequestAddress() {
	return api_address;
}

export function upload(path, savePath, oldFileName) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: api_address + "/sys/upload",
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
