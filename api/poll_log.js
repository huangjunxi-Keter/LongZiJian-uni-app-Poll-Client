import {
	request
} from '@/utils/request.js'

const pollLogApi = {
	find: '/poll-log/find',
	findCount: '/poll-log/find-count',
	create: '/poll-log/create',
	delete: '/poll-log/delete',
}

export function findPollLogs(data) {
	return request({
		url: pollLogApi.find,
		data
	});
}

export function findPollLogsCount(data) {
	return request({
		url: pollLogApi.findCount,
		data
	});
}

export function createPollLog(data) {
	return request({
		method: 'post',
		url: pollLogApi.create,
		data
	});
}

export function deletePollLog(data) {
	return request({
		method: 'post',
		url: pollLogApi.delete,
		data
	});
}
