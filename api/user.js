import {
	request
} from "@/utils/request.js";

const userApi = {
	login: "/user/login",
	find: "/user/find",
	findCount: "/user/find-count",
	userData: "/user/get",
	userDataByEmail: "/user/getByEmail",
	create: "/user/create",
	update: "/user/update",
};

export function login(data) {
	return request({
		method: "post",
		url: userApi.login,
		data,
	});
}

export function getUsers(data) {
	return request({
		url: userApi.find,
		data,
	});
}

export function getUsersCount(data) {
	return request({
		url: userApi.findCount,
		data,
	});
}

export function getUserData(id = 0) {
	return request({
		url: userApi.userData,
		data: {
			id,
		},
	});
}

export function getUserDataByEmail(email) {
	return request({
		url: userApi.userDataByEmail,
		data: {
			email,
		},
	});
}

export function createUser(data) {
	return request({
		method: "post",
		url: userApi.create,
		data,
	});
}

export function updateUser(data) {
	return request({
		method: "post",
		url: userApi.update,
		data,
	});
}
