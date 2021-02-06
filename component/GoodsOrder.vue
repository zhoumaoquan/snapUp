<template>
	<view class="goods-order" @click="jumpDetail(produce.goods_id)">
		<image class="goods-order-img" :src="produce.cover_path" mode="aspectFit"></image>
		<view class="goods-info">
			<view class="goods-info-top">
				<view class="goods-info-title">
					<text>{{produce.goods_name}}</text>
				</view>
				<view class="goods-info-text">
					<text space="ensp">已选： {{produce.goods_attr_desc}}</text>
				</view>
			</view>
			<view class="goods-info-bottom">
				<view class="goods-info-price">
					<text>￥</text>
					<text class="active">{{produce.price}}</text>
				</view>
				<text class="goods-info-num">×{{produce.quantity}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'goods-order',
		props: {
			produce: {
				type: Object,
				default() {
					return {}
				}
			},
			isDetail: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			jumpDetail(id) {
				if(this.isDetail) {
					uni.navigateTo({
						url: '/pages/Goods/details?id=' + id
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-order {
		width: 750rpx;
		height: 238rpx;
		@include box(0 30rpx);
		border-top: 1rpx solid #F2F2F2;
		@include flex-al();
		background-color: #FFFFFF;
		&-img {
			width: 190rpx;
			height: 190rpx;
			margin-right: 20rpx;
		}
		.goods-info {
			width: 480rpx;
			height: 185rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			&-top {
				flex: 1;
			}
			&-bottom {
				@include flex-al();
				justify-content: space-between;
			}
			&-title {
				font-size: 30rpx;
				font-weight: 600;
				color: #333333;
				line-height: 36rpx;
				@include multiline();
			}
			&-text {
				color: #999999;
				font-size: 24rpx;
				font-weight: 400;
			}
			&-price {
				font-size: 26rpx;
				color: #FF3733;
				font-weight: 600;
				.active {
					font-size: 36rpx;
				}
			}
			&-num {
				font-size: 24rpx;
				color: #9E9E9E;
				font-weight: 600;
				font-family: PingFang;
			}
		}
	}
	
</style>
