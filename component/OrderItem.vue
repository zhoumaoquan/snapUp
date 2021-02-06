<template>
	<view class="order-item" @click="jumpDetail(state.order_id)">
		<view class="order-top">
			<text>订单编号：{{state.order_sn}}</text>
			<text class="active">{{state.status_name}}</text>
		</view>
		<goods-order :produce="state.goods_list[0]"></goods-order>
		<view class="order-bottom">
			<view>
				<text>总计：</text>
				<text class="active">￥{{state.pay_amounts}}</text>
			</view>
			<view class="order-bottom-btn" v-if="state.status == 3" @click.stop="confirm(state.order_id)">确认收货</view>
		</view>
	</view>
</template>

<script>
	import GoodsOrder from '@/component/GoodsOrder.vue'
	export default {
		components: {
			GoodsOrder
		},
		props: {
			state: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		methods: {
			jumpDetail(id) {
				uni.navigateTo({
					url: '/pages/Order/details?id=' + id
				})
			},
			confirm(id) {
				uni.showModal({
					title: '提示',
					content: '请确认您已收货了吗？',
					success: (res) => {
						if(res.confirm) {
							this.$emit('receipt', id)
						}
					}
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-item {
		width: 100%;
		height: 435rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		.active {
			color: #FF3733;
		}
	}
	.order-top {
		width: 100%;
		height: 86rpx;
		@include box(0 30rpx);
		@include flex-al-ju(space-between);
		font-size: 28rpx;
		color: #666666;
		font-weight: 600;
		
	}
	.order-bottom {
		width: 100%;
		height: 110rpx;
		@include box(0 30rpx);
		@include flex-al-ju(space-between);
		font-size: 28rpx;
		color: #333333;
		font-weight: 600;
		border-top: 1rpx solid #F2F2F2;
		text {
			margin-right: 10rpx;
		}
		&-btn {
			width: 138rpx;
			height: 50rpx;
			border-radius: 25rpx;
			background: linear-gradient(90deg, #ED343D, #FF6638);
			@include flex-center();
			font-size: 24rpx;
			color: #FFFFFF;
		}
	}
</style>
