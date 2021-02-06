<template>
	<view class="container u-skeleton">
		<scroll-view :scroll-y="true" :enable-flex="true" class="app-header">
			<view class="number-item" v-for="(item, index) in detail.code_arr" :key="item.code">
				<text>抢货码：</text>
				<view class="number-item-cont">
					<view class="number">{{item.code}}</view>
				</view>
				<text v-if="item.status == 1">待公布</text>
				<text v-if="item.status == 2">已抢到</text>
				<text v-if="item.status == 3">未抢到</text>
			</view>
		</scroll-view>

		<!-- 物流信息 -->
		<view class="app-address" v-if="detail.status == 3 || detail.status == 4" @click="jumpLogistic">
			<image class="app-address-icon" src="@/static/icon/kuaid.png"></image>
			<view class="app-address-info" v-if="Object.keys(logistic).length > 0">
				<view class="app-address-name">
					<text space="ensp">{{logistic.status}}</text>
				</view>
				<view class="app-address-text">
					<text space="ensp">{{logistic.time}}</text>
				</view>
			</view>
			<u-icon name="arrow-right" size="24" color="#999"></u-icon>
		</view>

		<!-- 收货地址 -->
		<view class="app-address">
			<image v-if="detail.tag == 0" class="app-address-icon" src="@/static/icon/morendidian.png"></image>
			<image v-if="detail.tag == 1" class="app-address-icon" src="@/static/icon/jia.png"></image>
			<image v-if="detail.tag == 2" class="app-address-icon" src="@/static/icon/xiao.png"></image>
			<image v-if="detail.tag == 3" class="app-address-icon" src="@/static/icon/qi.png"></image>
			<view class="app-address-info">
				<view class="app-address-name">
					<text space="ensp">{{detail.contacts}} {{detail.mobile}}</text>
				</view>
				<view class="app-address-text">
					<text space="ensp">{{detail.province_name}} {{detail.city_name}} {{detail.district_name}} {{detail.address}}</text>
				</view>
			</view>
		</view>
		<view class="app-title-one">
			<text>商品清单</text>
		</view>
		<good-order :isDetail="true" :produce="detail.goods_list[0]"></good-order>
		<view class="app-title-one mg-top">
			<text>订单信息</text>
		</view>
		<view class="order-info">
			<view class="order-info-item">
				<text class="title">订单编号</text>
				<text class="text">{{detail.order_sn}}</text>
			</view>
			<view class="order-info-item">
				<text class="title">订单状态</text>
				<text class="active">{{detail.status_name}}</text>
			</view>
			<view class="order-info-item">
				<text class="title">备注信息</text>
				<text class="text">{{detail.remark}}</text>
			</view>
		</view>
		<view class="app-title-one mg-top">
			<text>金额信息</text>
		</view>
		<view class="app-title-two">
			<text>商品总计</text>
			<text>￥{{detail.goods_amounts}}</text>
		</view>
		<view class="app-box">
			<view class="app-box-title">
				<text class="title">实付款:</text>
				<text class="active">￥{{detail.pay_amounts}}</text>
			</view>
			<view class="app-box-text">
				<text class="text">抢购时间：{{detail.create_time}}</text>
			</view>
		</view>

		<view class="order-tabbar" @click="confirmReceipt" v-if="detail.status == 3">
			<view class="order-tabbar-item">确认收货</view>
		</view>

		<u-skeleton :loading="loadSkeleton" bgColor="#F2F2F2"></u-skeleton>
	</view>
</template>

<script>
	import GoodOrder from '@/component/GoodsOrder.vue'

	import {
		orderDetail,
		logistics,
		receipt
	} from '@/network/Goods-api'
	export default {
		components: {
			GoodOrder
		},
		data() {
			return {
				loadSkeleton: true,
				detail: {},
				logistic: {},
				m_id: '',
				order_id: ''
			};
		},
		onLoad(option) {
			this.m_id = uni.getStorageSync('m_id')
			this.order_id = option.id
			this.getOrderDetail(this.m_id, option.id)
		},
		methods: {
			async getOrderDetail(m_id, id) {
				try {
					let res = await orderDetail({
						m_id,
						order_id: id
					})
					if (res.status == 3 || res.status == 4) {
						let info = await logistics({
							m_id,
							order_id: id
						})
						
						this.logistic = info.list[0] || {}
					}
					
					this.detail = res
					this.loadSkeleton = false
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			async receipt() {
				let {
					order_id
				} = this.detail

				try {
					let res = await receipt({
						m_id: this.m_id,
						order_id
					})

					uni.showToast({
						title: '操作成功',
						mark: true,
						success: () => {
							setTimeout(() => {
								this.getOrderDetail(this.m_id, order_id)
							}, 1500)
						}
					})
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			// 确认收货
			confirmReceipt() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '请确认您已收货了吗？',
					success: (res) => {
						if (res.confirm) {
							that.receipt();
						}
					}
				})
			},
			jumpLogistic() {
				uni.navigateTo({
					url: '/pages/Order/logistics?m_id=' + this.m_id + '&id=' + this.order_id
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/order.scss';

	page {
		background-color: #F2F2F2;
		padding-bottom: 200rpx;
	}

	.app-header {
		width: 100%;

		background: linear-gradient(90deg, #EE373D 0%, #FE6338 100%);
		height: 350rpx;
		display: flex;
		flex-direction: column;
		align-items: center;

		.number-item {
			width: 750rpx;
			@include box(0 50rpx 0rpx 35rpx);
			height: 90rpx;
			@include flex-al();
			flex-shrink: 0;
			font-size: 32rpx;
			font-weight: 600;
			color: #FFFFFF;
			margin-top: 15rpx;

			// margin-bottom: 20rpx;
			&-cont {
				flex: 1;
				display: flex;
				margin-left: 10rpx;

				.number {

					padding: 4rpx 20rpx 2rpx 16rpx;
					background-color: #FFFFFF;
					border-radius: 10rpx;
					font-size: 40rpx;
					color: #EE383D;
					font-weight: 400;
				}
			}
		}
	}

	.mg-top {
		margin-top: 20rpx;
		border-bottom: 1rpx solid #F2F2F2;
	}

	.order-info {
		width: 100%;
		height: 243rpx;
		background-color: #FFFFFF;
		@include box(30rpx);
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		&-item {
			@include flex-al-ju(space-between);

			.title {
				font-size: 30rpx;
				font-weight: bold;
				color: #333333;
			}

			.text,
			.active {
				font-size: 28rpx;
				font-weight: bold;
				color: #333333;
			}

			.active {
				color: #FF3733;
				font-weight: 400;
			}
		}
	}

	.app-title-two {
		margin-top: 0;
	}

	.app-box {
		width: 100%;
		height: 164rpx;
		@include box(30rpx);
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		&-title,
		&-text {
			display: flex;
			justify-content: flex-end;
			color: #666666;
		}

		.title {
			font-size: 28rpx;
			line-height: 50rpx;
			margin-right: 10rpx;
		}

		.active {
			font-size: 34rpx;
			color: #FF3733;
			font-weight: bold;
		}

		.text {
			font-size: 26rpx;
			color: #666666;
			font-weight: 400;
		}
	}

	.order-tabbar {
		width: 100%;
		height: 110rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
		background-color: #FFFFFF;
		@include flex-al-ju(flex-end);
		@include box(0 30rpx);

		&-item {
			width: 138rpx;
			height: 50rpx;
			border-radius: 25rpx;
			font-size: 24rpx;
			color: #F8F8F8;
			font-weight: 400;
			@include flex-center();
			background: linear-gradient(0deg, #ED343D, #FF6638);
		}
	}
</style>
