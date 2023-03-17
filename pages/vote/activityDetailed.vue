<template>
	<view class="page-content">
		<u-sticky v-if="isPoll">
			<view class="poll_state">您已为此活动投票</view>
		</u-sticky>
		<img :src="src" width="100%" />
		<view class="title">{{ activity.activity_title }}</view>
		<!-- 数据 -->
		<view class="info-box">
			<u-grid :border="true">
				<u-grid-item>
					<view class="grid-text">{{ activity.item_count }}</view>
					<view class="grid-text">项目数</view>
				</u-grid-item>
				<u-grid-item>
					<view class="grid-text">{{ activity.poll_count }}</view>
					<view class="grid-text">总票数</view>
				</u-grid-item>
				<u-grid-item>
					<view class="grid-text">{{ activity.page_view }}</view>
					<view class="grid-text">浏览量</view>
				</u-grid-item>
			</u-grid>
			<view class="date">{{ activity.state ? '活动已结束' : '活动进行中' }}</view>
		</view>
		<!-- 搜索 -->
		<u-sticky>
			<view class="search">
				<u-search :showAction="false" v-model="searchStr" bgColor="#ffffff" placeholder="搜索投票活动"></u-search>
			</view>
		</u-sticky>
		<!-- 介绍 -->
		<view class="introduce">
			<view class="title">介绍</view>
			{{ activity.activity_introduce }}
		</view>
		<!-- 投票项目 -->
		<view class="vote-items">
			<item-box v-for="item in activityItems" :loginUser="loginUser" :activityItem="item" :isPoll="isPoll" />
		</view>
	</view>
</template>

<script>
	import itemBox from '@/components/vote/itemBox.vue';
	import {
		getPollActivity,
		updatePollActivity
	} from '@/api/poll_activity.js';
	import {
		findPollActivityItems
	} from '@/api/poll_activity_item.js';
	import {
		findPollLogsCount
	} from '@/api/poll_log.js'
	import {
		getRequestAddress
	} from '@/utils/request.js';
	import search from '../../uni_modules/uview-ui/libs/config/props/search';

	export default {
		name: 'activityDetailed',
		components: {
			'item-box': itemBox
		},
		data() {
			return {
				loginUser: null,
				activity: {},
				activityItems: [],
				searchStr: '',
				isPoll: false
			}
		},
		computed: {
			src() {
				return `${getRequestAddress()}/image/${this.activity.cover_image}`
			}
		},
		methods: {
			async loadPageData(id) {
				// 获取活动信息
				if (id) {
					this.activity = await getPollActivity(id);
					// 更新活动浏览数
					this.activity.page_view += 1;
					let addPageViewResponse = await updatePollActivity(this.activity);
					console.log('浏览量+1更新结果：' + addPageViewResponse);
				}
				// 如果登录，判断是否有当前活动的投票记录
				if (this.loginUser) {
					this.isPoll = await findPollLogsCount({
						uid: this.loginUser.id,
						aid: this.activity.id
					}) > 0;
				}
				// 获取活动项目信息
				this.search();
			},
			async search() {
				this.activityItems = await findPollActivityItems({
					activityId: this.activity.id,
					title: this.searchStr
				});
			}
		},
		onLoad(option) {
			this.loginUser = getApp().globalData.loginUser;
			this.loadPageData(option.aid);
		},
		onShow() {
			this.loginUser = getApp().globalData.loginUser;
			this.loadPageData();
		}
	}
</script>

<style scoped>
	.page-content {
		background-color: #ecf5ff;
		padding-bottom: 20rpx;
	}

	.title {
		text-align: center;
		padding: 30rpx;
		color: #333333;
	}

	.info-box {
		background-color: rgba(0, 0, 0, 0.5);
		padding: 30rpx 0;
		margin: 0 30rpx;
		border-radius: 15rpx;
	}

	.info-box .date {
		text-align: center;
		padding-top: 15rpx;
		color: #ffffff;
		font-size: 28rpx;
	}

	.grid-text {
		font-size: 14px;
		color: #ffffff;
	}

	.search {
		padding: 30rpx;
	}

	.introduce {
		background-color: #9acafc;
		padding: 10rpx 35rpx 30rpx 35rpx;
		margin: 0 30rpx;
		border-radius: 15rpx;
		font-size: 22rpx;
		color: #505050;
	}

	.introduce .title {
		font-size: 25rpx;
	}

	.vote-items {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.poll_state {
		background-color: #f5fff0;
		color: #5ac725;
		padding: 10rpx;
		text-align: center;
	}
</style>
