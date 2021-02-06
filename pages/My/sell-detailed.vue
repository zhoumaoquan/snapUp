<template>
	<view class="container">
		<view class="app-box" v-if="list.length > 0 && flag">
			<view class="app-box-item" v-for="(item, index) in list" :key="item.id">
				<view class="app-box-head">
					<image :src="item.avatar"></image>
					<view class="app-box-info">
						<text class="title">{{item.nickname}}</text>
						<text class="text">{{item.add_time}}</text>
					</view>
					<view class="app-box-num">
						<text>{{item.money}}</text>
					</view>
				</view>
				<view class="app-box-cont">
					<text class="text">{{item.goods_name}}</text>
					
				</view>
				<view class="app-box-tips">
					<text>#{{item.goods_attr_desc}}</text>
				</view>
			</view>
		</view>
		<view v-if="list.length === 0 && flag">
			<z-empty text="暂无收益明细~"></z-empty>
		</view>
	</view>
</template>

<script>
	import ZEmpty from '@/component/Z-empty.vue'
	import { incomeDesc } from '@/network/My-api'
	export default {
		components: {
			ZEmpty
		},
		data() {
			return {
				list: [],
				flag: false
			};
		},
		onLoad(option) {
			this.getIncomeDesc(option.m_id);
		},
		methods: {
			async getIncomeDesc(m_id) {
				try{
					let res = await incomeDesc({ type: 4, m_id})
					
					this.list = res.list
					this.flag = true
					
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
	.app-box-item {
		width: 100%;
		@include box(30rpx);
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #F2F2F2;
		.app-box-head {
			height: 80rpx;
			@include flex-al();
			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
			.app-box-info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 20rpx;
				.title {
					font-size: 30rpx;
					color: #333333;
					font-weight: bold;
				}
				.text {
					font-size: 26rpx;
					color: #999;
					font-weight: 500;
				}
			}
			.app-box-num {
				margin-left: 20rpx;
				font-size: 36rpx;
				color: #F12D27;
				font-weight: bold;
			}
		}
		.app-box-cont {
			margin-top: 10rpx;
			background-color: #F9F9F9;
			@include box(20rpx);
			border-radius: 8rpx;
			position: relative;
			.text {
				display: block;
				height: 100%;
				font-size: 28rpx;
				color: #333333;
				font-weight: bold;
				line-height: 42rpx;
				letter-spacing: 10rpx;
			}
			
		}
		.app-box-tips {
			font-size: 26rpx;
			color: #999999;
			font-weight: 400;
			height: 60rpx;
			@include flex-al-ju(flex-end);
		}
	}
</style>
