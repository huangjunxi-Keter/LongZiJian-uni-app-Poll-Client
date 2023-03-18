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
