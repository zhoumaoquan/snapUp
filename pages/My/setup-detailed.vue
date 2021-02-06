<template>
	<view class="container">
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	import { helpDeta } from '@/network/My-api'
	export default {
		data() {
			return {
				content: ''
			};
		},
		onLoad(option) {
			this.getHelpDeta(option.id)
		},
		methods: {
			async getHelpDeta(id) {
				try{
					let res = await helpDeta(id)
					uni.setNavigationBarTitle({
						title: res.title
					})
					
					this.content = res.content
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
