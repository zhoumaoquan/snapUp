<template>
	<view class="container">
		<view class="app-box">
			<view class="app-box-title">
				<text>【{{obj.subject}}】</text>
			</view>
			<view class="app-box-text">
				{{obj.content}}
			</view>
		</view>
	</view>
</template>

<script>
	import { newsDetail } from '@/network/My-api'
	export default {
		data() {
			return {
				obj: {}
			};
		},
		onLoad(option) {
			this.getNewsDetail(option.m_id, option.id)
		},
		methods: {
			async getNewsDetail(m_id, id) {
				try{
					let res = await newsDetail({ m_id, id })
					this.obj = res
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
	.app-box {
		border-top: 10rpx solid #F2F2F2;
		@include box(35rpx);
		&-title {
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
			margin-bottom: 30rpx;
		}
		&-text {
			font-size: 28rpx;
			color: #9E9E9E;
			line-height: 39rpx;
			font-weight: bold;
		}
	}
</style>
