<template>
	<view class="container">
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	import { rulePage } from '@/network/Home-api'
	export default {
		data() {
			return {
				content: ''
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
			this.getRulePage(option.type)
		},
		methods: {
			async getRulePage(type) {
				try{
					let res = await rulePage(type)
					
					uni.setNavigationBarTitle({
						title: res.title
					})
					this.content = res.content
					
					uni.hideLoading()
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		@include box(30rpx);
	}
</style>
