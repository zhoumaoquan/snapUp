<template>
	<view class="container">
		<view class="app-box" v-if="list.length > 0">
			<view class="app-box-item" v-for="(item) in list" :key="item.id" @click="jumpDetail(item.id)">
				<text>{{item.title}}</text>
				<u-icon name="arrow-right" size="30" color="#333"></u-icon>
			</view>
		</view>
		<view v-else>
			<z-empty text="暂没有列表数据~"></z-empty>
		</view>
	</view>
</template>

<script>
	import { helpList } from '@/network/My-api'
	import ZEmpty from '@/component/Z-empty.vue'
	export default {
		data() {
			return {
				list: []
			};
		},
		components: {
			ZEmpty
		},
		onLoad(option) {
			this.getHelpList()
		},
		methods: {
			async getHelpList() {
				try{
					let res = await helpList()
					
					this.list = res.list
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			jumpDetail(id) {
				uni.navigateTo({
					url: '/pages/My/setup-detailed?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}
	.app-box {
		margin-top: 20rpx;
		&-item {
			height: 104rpx;
			@include box(0 30rpx);
			background-color: #FFFFFF;
			border-bottom: 1rpx solid #F2F2F2;
			@include flex-al-ju(space-between);
			font-size: 30rpx;
			color: #333333;
		}
	}
</style>
