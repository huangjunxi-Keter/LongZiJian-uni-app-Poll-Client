import {
	request
} from "@/utils/request.js";

const pollActivityApi = {
	find: '/poll-activity/find',
	findCount: '/poll-activity/find-count',
	get: '/poll-activity/get',
	create: '/poll-activity/create',
	update: '/poll-activity/update',
}

export function findPollActivitys(data) {
	return request({
		url: pollActivityApi.find,
		data
	});
}

export function findPollActivitysCount(data) {
	return request({
		url: pollActivityApi.findCount,
		data
	});
}

export function getPollActivity(id) {
	return request({
		url: pollActivityApi.get,
		data: {
			id
		}
	});
}

export function createPollActivity(data) {
	return request({
		method: 'post',
		url: pollActivityApi.create,
		data
	});
}

export function updatePollActivity(data) {
	return request({
		method: 'post',
		url: pollActivityApi.update,
		data
	});
}
