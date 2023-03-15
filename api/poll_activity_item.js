import {
	request
} from "@/utils/request.js";

const pollActivityItemApi = {
	find: '/poll-activity-item/find',
	findCount: '/poll-activity-item/find-count',
	get: '/poll-activity-item/get',
	create: '/poll-activity-item/create',
	update: '/poll-activity-item/update',
	delete: '/poll-activity-item/delete',
}

export function findPollActivityItems(data) {
	return request({
		url: pollActivityItemApi.find,
		data
	});
}

export function findPollActivityItemsCount(data) {
	return request({
		url: pollActivityItemApi.findCount,
		data
	});
}

export function getPollActivityItem(id) {
	return request({
		url: pollActivityItemApi.get,
		data: {
			id
		}
	});
}

export function createPollActivityItem(data) {
	return request({
		method: 'post',
		url: pollActivityItemApi.create,
		data
	});
}

export function updatePollActivityItem(data) {
	return request({
		method: 'post',
		url: pollActivityItemApi.update,
		data
	});
}

export function deletePollActivityItem(data) {
	return request({
		method: 'post',
		url: pollActivityItemApi.delete,
		data
	});
}
