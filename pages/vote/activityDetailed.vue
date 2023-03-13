<template>
	<view class="page-content">
		<img :src="src" width="100%" />
		<view class="title">投票活动标题投票活动标题投票活动标题投票活动标题投票活动标题投票活动标题投票活动标题投票活动标题</view>
		<!-- 数据 -->
		<view class="info-box">
			<u-grid :border="true">
				<u-grid-item v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex">
					<view class="grid-text">{{baseListItem.number}}</view>
					<view class="grid-text">{{baseListItem.title}}</view>
				</u-grid-item>
			</u-grid>
			<view class="date">活动已结束</view>
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
			这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍这是介绍
		</view>
		<!-- 投票项目 -->
		<view class="vote-items">
			<item-box />
			<item-box />
			<item-box />
			<item-box />
			<item-box />
			<item-box />
			<item-box />
		</view>
	</view>
</template>

<script>
	import itemBox from '@/components/vote/itemBox.vue'

	export default {
		name: 'activityDetailed',
		components: {
			'item-box': itemBox
		},
		data() {
			return {
				searchStr: '',
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				baseList: [{
						title: '已报名',
						number: 35
					},
					{
						title: '总票数',
						number: 13887
					},
					{
						title: '浏览量',
						number: 22520
					},
				]
			}
		},
		methods: {

		},
		onLoad(option) {
			console.log(option.vaId);
			uni.setNavigationBarTitle({
				title: '投票活动标题'
			})
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
</style>
