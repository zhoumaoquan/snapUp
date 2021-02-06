<template>
	<view class="container">
		<view class="app-list" v-if="list.length > 0 && flag">
			<view class="app-list-item" v-for="(item, index) in list" :key="item.id">
				<view class="app-list-item-l">
					<view class="title">
						<text>{{item.reason}}</text>
					</view>
					<view class="text">
						<text>{{item.create_time}}</text>
					</view>
				</view>
				<block v-if="item.symbol == 1">
					<view class="app-list-item-r">
						<text class="active">+{{item.amounts}}</text>
					</view>
				</block>
				<block v-else>
					<view class="app-list-item-r">
						<text>-{{item.amounts}}</text>
					</view>
				</block>
			</view>
			<u-loadmore margin-bottom="100" margin-top="50" @loadmore="clickLoadmore" v-if="list.length > 5" :status="status" :icon-type="iconType" :load-text="loadText" />
		</view>
		<view v-if="list.length === 0 && flag">
			<z-empty text="暂无余额明细~"></z-empty>
		</view>

	</view>
</template>

<script>
	import ZEmpty from '@/component/Z-empty.vue'

	import {
		myBalance,
		incomeDesc
	} from '@/network/My-api'
	export default {
		data() {
			return {
				list: [],
				flag: false,
				type: 1,
				status: 'loadmore',
				iconType: 'flower',
				isLoad: true,
				loadText: {
					loadmore: '用力往上拉',
					loading: '正在加载，请休息片刻~',
					nomore: '我也是有底线滴~'
				},
				params: {
					m_id: '',
					p: 1,
					type: 3
				}
			};
		},
		components: {
			ZEmpty
		},
		onLoad(option) {
			this.type = option.type
			this.params.m_id = option.m_id
			if (option.type == 2) {
				this.getIncomeDesc()
			} else {
				this.getMyBalance()
			}
		},
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			async getMyBalance() {
				try {
					let res = await myBalance(this.params)

					this.list = res.list
					this.flag = true
					
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			async getIncomeDesc() {
				try {
					let res = await incomeDesc(this.params)

					this.list = res.list
					this.flag = true
					

				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			pageMyBalance() {
				if(!this.isLoad) return
				this.params.p += 1
				myBalance(this.params).then(res => {
					if(res.list.length === 0) {
						this.params.p -= 1
						this.isLoad = false
						this.status = 'nomore'
					} else {
						this.list = [...this.list, ...res.list]
					}
				})
			},
			pageIncomeDesc() {
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
			},
			clickLoadmore() {
				this.loadMore()
			},
			loadMore() {
				
				if (this.type == 2) {
					this.pageIncomeDesc()
				} else {
					this.pageMyBalance()
				}
			}
		}
	}
</script>

<style lang="scss">
	.app-list-item {
		width: 100%;
		height: 150rpx;
		@include flex-al-ju(space-between);
		@include box(0 30rpx);
		border-bottom: 1rpx solid #F2F2F2;

		.title {
			margin-bottom: 15rpx;
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
		}

		.text {
			font-size: 28rpx;
			color: #999999;
			font-weight: 400;
		}

		&-r {
			font-size: 36rpx;
			color: #333333;
			font-weight: bold;

			.active {
				color: #F12D27;
			}
		}
	}
</style>
