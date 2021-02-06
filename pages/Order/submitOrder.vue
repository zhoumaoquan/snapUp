<template>
	<view class="app-page u-skeleton">
		<view class="app-address" v-if="order.address == ''" @click="jumpAddress">
			<image class="app-address-icon u-skeleton-circle" src="@/static/icon/morendidian.png"></image>
			<view class="app-address-info">
				<text class="app-address-not u-skeleton-fillet">请先填写收货地址</text>
			</view>
			<u-icon class="u-skeleton-fillet" name="arrow-right" size="24" color="#999"></u-icon>
		</view>
		<view class="app-address" v-else @click="jumpAddress">
			<image v-if="order.address.tag == 0" class="app-address-icon u-skeleton-fillet" src="@/static/icon/morendidian.png"></image>
			<image v-if="order.address.tag == 1" class="app-address-icon u-skeleton-fillet" src="@/static/icon/jia.png"></image>
			<image v-if="order.address.tag == 2" class="app-address-icon u-skeleton-fillet" src="@/static/icon/xiao.png"></image>
			<image v-if="order.address.tag == 3" class="app-address-icon u-skeleton-fillet" src="@/static/icon/qi.png"></image>
			<view class="app-address-info">
				<view class="app-address-name u-skeleton-fillet">
					<text space="ensp">{{order.address.contacts}} {{order.address.mobile}}</text>
				</view>
				<view class="app-address-text u-skeleton-fillet">
					<text space="ensp">{{order.address.province_name}} {{order.address.city_name}} {{order.address.district_name}} {{order.address.address}}</text>
				</view>
			</view>
			<u-icon class="u-skeleton-fillet" name="arrow-right" size="24" color="#999"></u-icon>
		</view>
		<view class="app-title-one">
			<text class="u-skeleton-fillet">商品清单</text>
		</view>
		<!-- 骨架屏 -->
		<block v-if="loading">
			<view class="goods-order">
				<view class="goods-order-l u-skeleton-fillet"></view>
				<view class="goods-order-r">
					<view class="goods-order-title u-skeleton-fillet"></view>
					<view class="goods-order-text u-skeleton-fillet"></view>
					<view class="goods-order-price u-skeleton-fillet"></view>
				</view>
			</view>
			<view class="goods-line u-skeleton-fillet"></view>
			<view class="goods-line active u-skeleton-fillet"></view>
			<view class="goods-line u-skeleton-fillet"></view>
		</block>

		<good-order :produce="order.goods_list[0]"></good-order>
		<view class="app-title-two">
			<text>商品总计</text>
			<text>￥{{order.goods_amounts}}</text>
		</view>
		<view class="app-comment">
			<view class="app-textarea">
				<textarea :auto-height="true" v-model="context" placeholder="订单备注(选填)"></textarea>
			</view>

		</view>

		<view class="app-switch">
			<u-icon label-pos="left" @click="routerRule(8)" name="question-circle" size="36" color="#EE5F65" label="是否开启自动抢购" label-color="#333"
			 label-size="30"></u-icon>
			<u-switch v-model="checked" active-color="#F54B3B" size="40"></u-switch>
		</view>

		<view class="app-tabber u-skeleton-fillet">
			<view class="app-tabber-text">
				<text>合计：</text>
				<text class="active">￥{{order.pay_amounts}}</text>
			</view>
			<view class="app-tabber-btn" @click="sumbitOrder">
				<text>提交订单</text>
			</view>
		</view>

		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>

</template>

<script>
	import GoodOrder from '@/component/GoodsOrder.vue'
	
	import { goodsSubmit } from '@/network/Goods-api'
	export default {
		components: {
			GoodOrder
		},
		data() {
			return {
				checked: false,
				order: {},
				m_id: '',
				loading: true,
				context: ''
			};
		},
		onLoad(option) {
			var globalData = getApp().globalData.order;
			this.order = globalData
			this.m_id = option.m_id
			console.log(globalData)
			let timer = setTimeout(() => {
				this.loading = false
				clearTimeout(timer)
			}, 500)
		},
		methods: {
			jumpAddress() {
				uni.navigateTo({
					url: '/pages/My/address?m_id=' + this.m_id
				})
			},
			routerRule(type) {
				uni.navigateTo({
					url: '/pages/Home/rule?type=' + type
				})
			},
			sumbitOrder() {
				if(this.order.address === '') {
					return uni.showToast({
						title: '请选择收货地址',
						icon: 'none'
					})
				}
				
				uni.showLoading({
					title: '订单创建中...',
					mask: true
				})
				
				let { goods_id, quantity,goods_attr_ids ,goods_attr_desc } = this.order.goods_list[0];
				
				let state = this.checked ? '1' : '0'
				
				goodsSubmit({
					m_id: this.m_id,
					adr_id: this.order.address.adr_id,
					goods_id,
					quantity,
					goods_attr_ids,
					goods_attr_desc,
					remark: this.context,
					state
				}).then(res => {
					
					uni.showToast({
						title: '下单成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/Order/Pay?id=' + res.order_id
								})
							}, 1000)
						}
					})
					
				}).catch(e => {
					uni.showToast({
						title: e,
						icon: 'none'
					})
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

	.app-comment {
		width: 100%;
		background-color: #FFFFFF;
		height: auto;
		min-height: 200rpx;
		@include box(38rpx 30rpx);

		.app-textarea {
			@include box(25rpx 30rpx);
			background-color: #F6F6F6;
			border-radius: 10rpx;
		}

		textarea {
			width: 100%;
			background-color: #F6F6F6;


			font-size: 28rpx;
			color: #333333;
			height: 20rpx;
		}
	}

	.app-switch {
		margin-top: 20rpx;
		background-color: #FFFFFF;
		width: 100%;
		height: 104rpx;
		@include box(0 30rpx);
		@include flex-al-ju(space-between);
	}

	.app-tabber {
		width: 100%;
		height: 98rpx;

		background-color: #FFFFFF;

		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		@include box(0 30rpx);
		@include flex-al-ju(space-between);

		&-text {
			color: #ED474D;
			font-size: 24rpx;

			.active {
				font-size: 36rpx;
				font-weight: 600;
			}
		}

		&-btn {
			width: 180rpx;
			height: 74rpx;
			border-radius: 37rpx;
			background: linear-gradient(90deg, #ED343D, #FF6638);
			@include flex-center();
			font-size: 28rpx;
			color: #FFFFFF;
			font-weight: bold;
		}
	}

	.goods-order {
		width: 750rpx;
		height: 240rpx;
		@include box(0 30rpx) @include flex-al();

		.goods-order-l {
			width: 190rpx;
			height: 190rpx;
			margin-right: 15rpx;
		}

		.goods-order-r {
			flex: 1;

			.goods-order-title {
				width: 436rpx;
				height: 50rpx;
				margin-bottom: 20rpx;
			}

			.goods-order-text {
				width: 150rpx;
				height: 40rpx;
				margin-bottom: 50rpx;
			}

			.goods-order-price {
				width: 100rpx;
				height: 50rpx;
			}
		}
	}

	.goods-line {
		width: 690rpx;
		margin: 10rpx auto;
		height: 104rpx;
	}

	.goods-line.active {
		height: 154rpx;
	}
</style>
