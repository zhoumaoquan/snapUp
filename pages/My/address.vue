<template>
	<view class="container">
		<u-radio-group v-model="defaults" @change="radioGroupChange" v-if="list.length > 0">
			<view class="app-box-item" v-for="(item, index) in list" :key="item.adr_id" @click="selectAddress(index)">
				<view class="app-box-top">
					<image v-if="item.tag == 0" class="app-box-top-icon" src="@/static/icon/morendidian.png"></image>
					<image v-if="item.tag == 1" class="app-box-top-icon" src="@/static/icon/jia.png"></image>
					<image v-if="item.tag == 2" class="app-box-top-icon" src="@/static/icon/xiao.png"></image>
					<image v-if="item.tag == 3" class="app-box-top-icon" src="@/static/icon/qi.png"></image>
					<view class="app-box-top-info">
						<view class="app-box-top-name">
							<text space="ensp">{{item.contacts}}     {{item.mobile}}</text>
						</view>
						<view class="app-box-top-text">
							<text space="ensp">{{item.province_name}} {{item.city_name}} {{item.district_name}} {{item.address}}</text>
						</view>
					</view>
				</view>
				<view class="app-box-bot">
					<u-radio :name="item.adr_id" label-size="26" active-color="#F95639">默认收货地址</u-radio>
					<view class="app-box-btn">
						<view class="app-btn-item" @click.stop="editAddress(item.adr_id, 'edit')">
							<image src="@/static/icon/edit.png"></image>
							<text>编辑</text>
						</view>
						<view class="app-btn-item" @click.stop="editAddress(item.adr_id, 'remove')">
							<image src="@/static/icon/delete.png"></image>
							<text>删除</text>
						</view>
					</view>
				</view>
			</view>
		</u-radio-group>
		<view v-else>
			<z-empty :src="src" color="#666" text="没有收货地址~"></z-empty>
		</view>
		
		
		<view class="app-btn" @click="addTo">
			<text>添加新地址</text>
		</view>
	</view>
</template>

<script>
	import ZEmpty from '@/component/Z-empty.vue' 
	import { addressList, setDefault, delAddress } from '@/network/My-api'
	export default {
		data() {
			return {
				list: [],
				src: require('@/static/image/not-address.png'),
				m_id: '',
				defaults: ''
			};
		},
		components: {
			ZEmpty
		},
		
		onLoad(option) {
			
			this.m_id = option.m_id
		},
		onShow() {
			
			this.getAddressList(this.m_id)
		},
		methods: {
			async getAddressList(id) {
				try{
					let res = await addressList(id)
					
					this.list = res.list
					let active = res.list.filter((item) => { return item.is_default == 1 })
					this.defaults = active.length > 0 ? active[0].adr_id : ''
					
				}catch(e){
					uni.showToast({
						title: '获取地址列表失败',
						icon: 'none'
					})
				}
			},
			selectAddress(index) {
				let current = this.list[index]
				
				let pages = getCurrentPages()
				let page = pages[pages.length - 2]
				page.$vm.order.address = current
				uni.navigateBack({
					delta: 1
				})
			},
			addTo() {
				uni.navigateTo({
					url: '/pages/My/edit-address?type=1&m_id=' + this.m_id
				})
			},
			editAddress(id, type) {
				let _this = this
				if(type === 'edit') {
					return uni.navigateTo({
						url: '/pages/My/edit-address?type=2&m_id=' + this.m_id + '&id=' + id
					})
				} else {
					uni.showModal({
						title: '提醒',
						content: '您确定需要删除该地址吗?',
						success(res) {
							if(res.confirm) {
								_this.deleteAddress(id)
							} else {
								uni.showToast({
									title: '您取消了删除',
									icon: 'none'
								})
							}
						}
					})
				}
			},
			async deleteAddress(id) {
				try{
					let res = await delAddress({ m_id: this.m_id, id })
					
					this.getAddressList(this.m_id)
					
					uni.showToast({
						title: '删除成功',
						duration: 2000
					})
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			radioGroupChange(e) {
				setDefault({ m_id: this.m_id, id: e }).then(res => {
						uni.showToast({
							title: '设置成功',
							mask: true
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
	page {
		padding-bottom: 200rpx;
		background-color: #F2F2F2;
	}
	.app-box-item {
		width: 100%;
		background-color: #FFFFFF;
		@include box(0 30rpx);
		height: 245rpx;
		margin-top: 20rpx;
		.app-box-top {
			width: 100%;
			height: 155rpx;
			@include flex-al();
			border-bottom: 1rpx solid #F2F2F2;
			
			&-icon {
				width: 60rpx;
				height: 60rpx;
				margin-right: 20rpx;
			}
			
			&-info {
				height: 140rpx;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				.app-address-not {
					font-size: 32rpx;
					font-weight: 400;
					color: #333;
				}
				.app-address-name {
					font-size: 30rpx;
					color: #333333;
					font-weight: 500;
				}
				.app-address-text {
					width: 570rpx;
					font-size: 26rpx;
					color: #999999;
					font-weight: 500;
					@include ellipsis();
				}
			}
		}
		
	}
	.app-box-bot {
		height: 88rpx;
		@include flex-al-ju(space-between);
		.app-box-btn {
			@include flex-al();
			.app-btn-item {
				@include flex-al();
				margin-left: 40rpx;
				font-size: 24rpx;
				line-height: 30rpx;
				color: #9E9E9E;
				font-weight: bold;
				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				}
			}
			
		}
	}
	.app-btn {
		width: 100%;
		height: 97rpx;
		background: linear-gradient(90deg, #ED343D, #FF6638);
		@include flex-center();
		color: #FFFFFF;
		font-size: 32rpx;
		font-weight: bold;
		
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
