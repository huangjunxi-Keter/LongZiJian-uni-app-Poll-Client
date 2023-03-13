<template>
	<view class="content">
		<u-sticky offset-top="20rpx">
			<u-search v-model="searchStr" placeholder="搜索活动" :showAction="false"></u-search>
		</u-sticky>
		<view class="activity-list">
			<user-actyvity-box />
			<user-actyvity-box />
			<user-actyvity-box />
			<user-actyvity-box />
			<user-actyvity-box />
		</view>
	</view>
</template>

<script>
	import userActivityBox from '@/components/vote/userActivityBox.vue'

	export default {
		name: 'userActivityList',
		components: {
			"user-actyvity-box": userActivityBox
		},
		data() {
			return {
				searchStr: ''
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.activity-list {
		padding-bottom: 30rpx;
	}
</style>
