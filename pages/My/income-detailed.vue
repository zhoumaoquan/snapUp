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
						<text>{{item.moeny}}</text>
					</view>
				</view>
				<view class="app-box-cont">
					<view class="text">{{item.goods_name}}</view>
					
					<view class="app-box-tips">
						<text>#{{item.goods_attr_desc}}</text>
					</view>
				</view>
			</view>
			<u-loadmore margin-bottom="100" margin-top="50" @loadmore="clickLoadmore" v-if="list.length > 5" :status="status" :icon-type="iconType" :load-text="loadText" />
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
				flag: false,
				status: 'loadmore',
				iconType: 'flower',
				isLoad: true,
				loadText: {
					loadmore: '用力往上拉',
					loading: '正在加载，请休息片刻~',
					nomore: '我也是有底线滴~'
				},
				params: {
					p: 1,
					m_id: '',
					type: ''
				}
			};
		},
		onLoad(option) {
			this.params.type = option.type
			this.params.m_id = option.m_id
			this.getIncomeDesc();
		},
		onReachBottom() {
			this.loadMore()
		},
		
		methods: {
			async getIncomeDesc() {
				try{
					let res = await incomeDesc(this.params)
					
					this.list = res.list
					this.flag = true
					
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			loadMore() {
				if(!this.isLoad) return
				this.params.p += 1
				incomeDesc(this.params).then(res => {
					if(res.list.length === 0) {
						this.params.p -= 1
						this.isLoad = false
						this.status = 'nomore'
					} else {
						this.list = [...this.list, ...res.list]
					}
				})
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
			.app-box-tips {
				font-size: 26rpx;
				color: #999999;
				font-weight: 400;
				line-height: 1;
				text-align: right;
			}
		}
	}
</style>
