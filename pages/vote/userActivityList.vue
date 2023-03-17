<template>
	<view class="content">
		<u-sticky offset-top="20rpx">
			<u-search v-model="searchStr" placeholder="搜索活动" :showAction="false"></u-search>
		</u-sticky>
		<view class="activity-list">
			<user-actyvity-box v-for="item in activitys" :activity="item" />
		</view>
	</view>
</template>

<script>
	import {
		findPollActivitys
	} from '@/api/poll_activity.js';
	import userActivityBox from '@/components/vote/userActivityBox.vue'

	export default {
		name: 'userActivityList',
		components: {
			"user-actyvity-box": userActivityBox
		},
		data() {
			return {
				loginUser: null,
				activitys: [],
				searchStr: '',
				searchTimeOut: null
			}
		},
		methods: {
			async search() {
				this.activitys = await findPollActivitys({
					userId: this.loginUser.id,
					title: this.searchStr
				});
			}
		},
		watch: {
			searchStr() {
				if (this.searchTimeOut)
					clearTimeout(this.searchTimeOut);
				this.searchTimeOut = setTimeout(() => {
					this.search();
				}, 300);
			}
		},
		onShow() {
			this.loginUser = getApp().globalData.loginUser;
			this.search();
		}
	}
</script>

<style scoped>
	.activity-list {
		padding-bottom: 30rpx;
	}
</style>
