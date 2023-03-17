<template>
	<view class="content">
		<u-sticky offset-top="20rpx">
			<u-search v-model="searchStr" placeholder="搜索项目" :showAction="false"></u-search>
		</u-sticky>
		<user-item-box v-for="item in activityItems" :activityItem="item" />
		<u-button :customStyle="createButtonStyle" type="primary" icon="plus" @click="toEditItem" />
	</view>
</template>

<script>
	import userItemBox from '@/components/vote/userItemBox.vue'
	import {
		findPollActivityItems
	} from '../../api/poll_activity_item'

	export default {
		name: 'activityItemList',
		components: {
			"user-item-box": userItemBox
		},
		data() {
			return {
				createButtonStyle: {
					position: 'fixed',
					right: '50rpx',
					bottom: '50rpx',
					width: '100rpx',
					height: '100rpx',
					borderRadius: '50%',
					boxShadow: '0 0 10rpx 3rpx #999999'
				},
				activityId: null,
				activityItems: [],
				searchStr: '',
				searchTimeOut: null
			}
		},
		methods: {
			toEditItem() {
				uni.navigateTo({
					url: `/pages/vote/editItem?aid=${this.activityId}`
				})
			},
			async search() {
				this.activityItems = await findPollActivityItems({
					activityId: this.activityId,
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
		onLoad(option) {
			this.activityId = option.aid;
		},
		onShow() {
			this.search();
		}
	}
</script>

<style scoped>

</style>
