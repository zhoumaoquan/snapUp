<template>
	<view class="container">
		<view class="app-context">
			<view class="app-context-timer">
				<text>本轮公布剩余时间</text>
				<u-count-down :timestamp="payInfo.gong_time" show-days separator-size="20" separator-color="#999999" font-size="26"
				 color="#999999"></u-count-down>
			</view>
			<view class="app-context-price">
				<text>￥</text>
				<text class="active">{{price}}</text>
			</view>
		</view>

		<view class="app-options">
			<view class="app-options-item bottom-line">
				<image src="@/static/icon/wx.png"></image>
				<view class="app-options-text">微信支付</view>
				<view class="app-radio" @click="current = 2" :class="{ active: current === 2 }">
					<view class="app-radio-select"></view>
				</view>
			</view>
			<view class="app-options-item bottom-line">
				<image src="@/static/icon/yue.png"></image>
				<view class="app-options-text">余额支付</view>
				<view class="app-radio" @click="current = 3" :class="{ active: current === 3 }">
					<view class="app-radio-select"></view>
				</view>
			</view>
		</view>

		<view class="default-btn" @click="pay">
			<text>立即支付</text>
		</view>
	</view>
</template>

<script>
	import {
		payRender,
		payMoney
	} from '@/network/Goods-api'
	export default {
		data() {
			return {
				current: 2,
				payInfo: {},
				price: 0.00
			};
		},
		onLoad(option) {

			this.getPayRender(option.id)
		},
		methods: {
			async getPayRender(id) {
				try {
					const m_id = uni.getStorageSync('m_id')
					let res = await payRender({
						m_id,
						order_id: id
					})
					this.payInfo = res
					this.price = res.pay_amounts

				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 进行支付
			async payAction() {
				uni.showLoading({
					title: '正在调起支付...',
					mask: true
				})
				
				let that = this
				
				try {
					let {
						m_id,
						order_id,
					} = this.payInfo
					let res = await payMoney({
						m_id,
						order_id,
						payment: this.current
					})
				
					if (this.current == 3) {
						return uni.showToast({
							title: '余额支付成功',
							mask: true,
							success() {
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/Order/index'
									})
								}, 1500)
							}
						})
					} else {
						wx.requestPayment({
							timeStamp: res.timeStamp,
							nonceStr: res.nonceStr,
							package: res.package,
							paySign: res.paySign,
							signType: res.signType,
							success(res) {
								return uni.showToast({
									title: '微信支付成功',
									mask: true,
									success() {
										setTimeout(() => {
											uni.switchTab({
												url: '/pages/Order/index'
											})
										}, 1500)
									}
								})
							},
							fail(e) {
								console.log(e)
								uni.showToast({
									title: '支付失败',
									icon: 'none'
								})
							}
						})
				
					}
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			async pay() {
				let that = this
				wx.requestSubscribeMessage({
					tmplIds: ['PJG6frdECJk3CWhayO4sx2-A3JvZ-DWujuUHT7ZG74Y'],
					success: function(res) {
						
						if(res['PJG6frdECJk3CWhayO4sx2-A3JvZ-DWujuUHT7ZG74Y'] == 'reject') {
							return uni.showLoading({
								title: '已取消订阅，正在调起支付...',
								mask: true,
								success() {
									setTimeout(() => {
										that.payAction()
									}, 1000)
								}
							})
						}
						
						uni.showLoading({
							title: '已订阅消息，正在调起支付...',
							mask: true,
							success() {
								setTimeout(() => {
									that.payAction()
								}, 1000)
							}
						})
						
						
					},
					fail: function(err) {
						console.log(err)
						return uni.showToast({
							title: '订阅消息失败',
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		@include box(0 30rpx);
	}

	.app-context {
		height: 309rpx;
		@include flex-center();
		flex-direction: column;

		&-timer {
			font-size: 28rpx;
			color: #999999;
			font-weight: 400;
			margin-bottom: 25rpx;

			text {
				margin-right: 15rpx;
			}
		}

		&-price {
			color: #333333;
			font-weight: bold;
			font-size: 48rpx;
			// letter-spacing:5rpx;
			font-family: PingFang SC;

			.active {
				font-size: 72rpx;
			}
		}
	}

	.app-options-item {
		@include flex-al();
		width: 100%;
		height: 128rpx;

		image {
			width: 48rpx;
			height: 48rpx;
			margin-right: 15rpx;
		}

		.app-options-text {
			flex: 1;
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
		}
	}

	.app-radio {
		width: 45rpx;
		height: 45rpx;
		box-sizing: border-box;
		margin-left: 30rpx;
		border: 2rpx solid #E0E0E0;
		border-radius: 50%;
		@include flex-center();
		transition: border .4s;

		.app-radio-select {
			width: 32rpx;
			height: 32rpx;
			border-radius: 50%;
			background-color: #EE363D;
			opacity: 0;
			transition: opacity .5s;
		}
	}

	.app-radio.active {
		border-color: #EE363D;

		.app-radio-select {
			opacity: 1;
		}
	}

	.default-btn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 95rpx;

		z-index: 99;

		font-weight: 400;
	}
</style>
