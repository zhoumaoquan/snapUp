<template>
	<view class="container">
		<view class="app-header">
			<view class="app-header-item">
				<text>快递公司：</text>
				<text class="active">{{type}}</text>
			</view>
			<view class="app-header-item">
				<text>快递单号：</text>
				<text class="active">{{number}}</text>
			</view>
		</view>
		<view class="app-box">
			<u-time-line>
				<u-time-line-item nodeTop="20" v-for="(item, index) in list" :key="index">
					<block v-if="index === 0">
						<template v-slot:node>
							<view class="u-node">
								<image src="@/static/icon/round.png" mode=""></image>
							</view>
						</template>
					</block>
					<template v-slot:content>
						<view>
							<view class="u-order-title active">{{item.status}}</view>
							<view class="u-order-time active">{{item.time}}</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
	</view>
</template>

<script>
	import { logistics } from '@/network/Goods-api'
	export default {
		data() {
			return {
				type: '',
				number: '',
				list: []
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: '正在加载...'
			})
			
			this.getLogistics(option.m_id, option.id)
		},
		methods: {
			async getLogistics(m_id, id) {
				try{
					let res = await logistics({ m_id, order_id: id })
					
					this.type = res.type
					this.number = res.number
					this.list = res.list
					
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
	page {
		background-color: #F2F2F2;
		padding-bottom: 100rpx;
	}

	.app-header {
		width: 100%;
		height: 176rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;
		@include box(30rpx);
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		&-item {
			font-size: 28rpx;
			color: #9E9E9E;
			font-weight: 600;

			.active {
				color: #333333;
			}
		}
	}

	.app-box {
		@include box(40rpx 0rpx 0rpx 50rpx);
		background-color: #FFFFFF;
	}
	.u-node {
		width: 30rpx;
		height: 30rpx;
		image {
			width: 30rpx;
			height: 30rpx;
		}
	}
	.u-order-title {
		font-size: 28rpx;
		color: #9E9E9E;
		font-weight: 600;
		line-height: 40rpx;
		margin-bottom: 15rpx;
	}

	.u-order-time {
		font-size: 24rpx;
		font-weight: 600;
		line-height: 40rpx;
		color: #9E9E9E;
	}

	.u-order-title.active,
	.u-order-time.active {
		color: #333333;
	}
</style>
