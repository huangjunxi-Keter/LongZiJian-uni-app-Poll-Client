<template>
	<view class="content" :style="{'margin-top': `${statusBarHeight}rpx`}">
		<!-- 轮播图 -->
		<u-swiper :list="swiperList" keyName="image" showTitle :autoplay="false" circular></u-swiper>
		<!-- 搜索 -->
		<view class="search">
			<u-search :showAction="false" v-model="searchStr" placeholder="搜索投票活动"></u-search>
		</view>
		<!-- 投票活动 -->
		<view class="vote-activity-list">
			<activity-box v-for="item in activitys" :activity="item" />
		</view>
		<!-- 底部导航 -->
		<tabbar :current="0"></tabbar>
	</view>
</template>

<script scoped>
	import activityBox from '@/components/vote/activityBox.vue'
	// API
	import {
		findPollActivitys
	} from '@/api/poll_activity.js';

	export default {
		name: 'voteIndex',
		components: {
			'activity-box': activityBox
		},
		data() {
			return {
				swiperList: [{
					image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东',
				}, {
					image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				}, {
					image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}],
				// 手机状态栏的高度
				statusBarHeight: 0,
				activitys: [],
				searchStr: '',
				searchTimeOut: null
			}
		},
		methods: {
			async search() {
				this.activitys = await findPollActivitys({
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
		onLoad() {
			this.statusBarHeight = getApp().globalData.statusBarHeight;
		},
		onShow() {
			this.search();
		}
	}
</script>

<style scoped>
	.search {
		padding: 20rpx 0;
		background-color: white;
	}

	.vote-activity-list {}
</style>
