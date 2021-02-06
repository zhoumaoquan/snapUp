<template>
	<view class="container">
		<view class="new-list" v-if="list.length > 0 && flag">
			<view class="new-list-item" v-for="(item, index) in list" :key="item.home_msg_id" @click="router(item.home_msg_id)">
				<view class="new-list-title">
					<text class="title">【{{item.content}}】</text>
					<text class="time">{{item.create_time}}</text>
				</view>
				<view class="new-list-text">
					<text class="text">{{item.subject}}</text>
					<view class="point" v-if="item.status == 0"></view>
				</view>
			</view>
		</view>
		<view v-if="list.length == 0 && flag">
			<z-empty text="暂无消息内容~"></z-empty>
		</view>
		
	</view>
</template>

<script>
	import ZEmpty from '@/component/Z-empty.vue'
	
	import { newsList } from '@/network/My-api'
	export default {
		data() {
			return {
				params: {
					m_id: '',
					p: 1
				},
				flag: false,
				list: []
			};
		},
		components: {
			ZEmpty
		},
		onLoad(option) {
			uni.showLoading({
				title: '加载中...'
			})
			this.params.m_id = option.m_id
		},
		onShow() {
			this.getNewsList()
		},
		methods: {
			async getNewsList() {
				try{
					let res = await newsList(this.params)
					
					this.list = res.list
					this.flag = true
					uni.hideLoading()
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			router(id) {
				uni.navigateTo({
					url: '/pages/My/new-details?m_id=' + this.params.m_id + '&id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
		padding-bottom: 100rpx;
	}
	.new-list-item {
		width: 100%;
		height: 144rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		@include box(0 30rpx);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		
		.new-list-text,
		.new-list-title {
			@include flex-al();
		}
		.title, .text {
			flex: 1;
			width: 490rpx;
			@include ellipsis();
		}
		.title {
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
		}
		.time {
			font-size: 24rpx;
			color: #9E9E9E;
			font-weight: bold;
			margin-left: 20rpx;
		}
		.text {
			font-size: 28rpx;
			color: #9E9E9E;
			font-weight: bold;
		}
		.point {
			width: 18rpx;
			height: 18rpx;
			border-radius: 50%;
			background-color: #FF5533;
			margin-left: 20rpx;
		}
	}
</style>
