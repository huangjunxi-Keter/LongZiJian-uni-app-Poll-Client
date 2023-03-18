<template>
	<view>
		<u-list>
			<u-list-item v-for="log in logArray" :key="log.id">
				<u-cell :title="`您在【${log.activity_title}】中投给了【${log.item_title}】`">
					<u-avatar slot="icon" shape="square" size="35" :src="baseSrc + log.cover_image">
					</u-avatar>
					<!-- <u-avatar slot="icon" shape="square" size="35" :src="baseSrc + log.item_image"
						customStyle="margin: -3px 5px -3px 0">
					</u-avatar> -->
				</u-cell>
			</u-list-item>
		</u-list>
	</view>
</template>

<script>
	import {
		findPollLogs
	} from '@/api/poll_log.js';
	import {
		getRequestAddress
	} from '../../utils/request';

	export default {
		name: 'pollLogList',
		data() {
			return {
				loginUser: null,
				logArray: []
			}
		},
		computed: {
			baseSrc() {
				return `${getRequestAddress()}/image/`
			}
		},
		methods: {
			async loadPageData() {
				this.logArray = await findPollLogs({
					uid: this.loginUser.id
				});
				console.log(this.logArray);
			}
		},
		onLoad() {
			this.loginUser = getApp().globalData.loginUser;
			if (this.loginUser)
				this.loadPageData();
			else
				uni.navigateBack();
		}
	}
</script>

<style>

</style>
