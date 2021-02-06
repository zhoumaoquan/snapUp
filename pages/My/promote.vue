<template>
	<view class="container">
		<view class="img-header">
			<image :src="cover"></image>
			<view class="header-text" @click="copyTetx">
				<text>推广码：{{coding}}</text>
			</view>
			<view class="header-box">
				<text class="box-text">好友可在登录时填写推广码</text>
				<view class="box-code">
					<u-image width="100%" height="100%" border-radius="3" :src="ercode">
						<u-loading slot="loading"></u-loading>
					</u-image>
				</view>
				<view class="box-btn">
					<button open-type="share" class="box-btn-item">分享</button>
					<view class="box-btn-item active" @click="saveImage">保存图片</view>
				</view>
			</view>
		</view>
		<view class="img-list">
			<view class="list-bg">
				<image src="https://api.pddblj.com/Uploads/ph2.png"></image>
			</view>
			<view class="list-title">
				<image src="@/static/icon/rule.png"></image>
			</view>
			<view class="list-box">
				
				<scroll-view class="list-box-scroll" :scroll-y="true">
					<view class="list-box-context">
						<rich-text :nodes="content"></rich-text>
					</view>
					
					<!-- <view class="list-box-item">
						<view class="list-icon">
							<image src="@/static/icon/yuan.png"></image>
							<text>1</text>
						</view>
						<view class="list-context">
							<view class="list-box-title">主标题</view>
							<view class="list-box-text">
								<text>文案内容规则内容活动活动罪责文案内容规则内容活动活动罪责文案内容规则内容活动活动罪责</text>
							</view>
							
						</view>
					</view> -->
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import { rulePage } from '@/network/Home-api'
	import {
		inviteCode
	} from '@/network/My-api'
	import { downloadFile } from '@/libs/loadimg'
	export default {
		data() {
			return {
				ercode: '',
				coding: '',
				content: '',
				cover: ''
			};
		},
		onLoad(option) {
			
			uni.showLoading({
				title: '正在加载...'
			})
			if(option.parent_code) {
				
				uni.setStorageSync('parent_code', option.parent_code)
			}
			
			this.getInviteCode(option.m_id)
			this.getRulePage()
		},
		onShareAppMessage() {
			return {
				title: '邀请好友',
				path: '/pages/Home/index?parent_code=' + this.coding,
				success: function(res) {
					console.log('分享成功' + res)
				},
				fail: function(res) {
					console.log(res + '失败');
				}
			}
		},
		methods: {
			async getInviteCode(id) {
				try {
					let res = await inviteCode(id)
					
					this.ercode = res.url
					this.coding = res.member_sn
					
					uni.hideLoading()
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			copyTetx() {
				var that = this;
				wx.setClipboardData({
					//准备复制的数据
					data: that.coding,
					success: function(res) {
						wx.showToast({
							title: '邀请码复制成功',
						});
					}

				})
			},
			async saveImage() {
				try{
					let res = await downloadFile(this.ercode)
					console.log(res)
					if(res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success() {
								uni.showToast({
									title: '保存成功'
								})
							}
						})
					}
					
				}catch(e){
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			async getRulePage() {
				try{
					let res = await rulePage(7)
					this.cover = res.cover
					this.content = res.content
					
					uni.hideLoading()
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
	.img-header {
		position: relative;
		width: 100%;
		height: 1367rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}

	.header-text {
		width: 550rpx;
		height: 100rpx;
		@include flex-center();
		font-size: 32rpx;
		color: #6B4B3D;
		position: absolute;
		z-index: 10;
		top: 615rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.header-box {
		width: 550rpx;
		height: 600rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 720rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;

		.box-text {
			font-size: 28rpx;
			color: #999999;
			font-weight: bold;
			line-height: 70rpx;
			margin-top: 20rpx;
		}

		.box-code {
			width: 358rpx;
			height: 356rpx;
			margin-bottom: 40rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box-btn {
			width: 400rpx;
			height: 75rpx;
			@include flex-al-ju(space-between);

			&-item {
				width: 187rpx;
				height: 74rpx;
				box-sizing: border-box;
				@include flex-center();
				border-radius: 37rpx;
				font-size: 32rpx;
				border: 1px solid #FE7B15;
				font-weight: bold;
				color: #FE7B16;
			}

		}

		.box-btn-item.active {
			background: linear-gradient(90deg, #FE7A15 0%, #F9A239 100%);
			color: #FFFFFF;
		}
	}

	.img-list {
		position: relative;
		width: 750rpx;
		height: 625rpx;
		margin-top: -30rpx;

		.list-bg {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.list-title {
			width: 100%;
			height: 50rpx;
			@include flex-center();
			position: absolute;
			top: 20rpx;

			image {
				width: 222rpx;
				height: 30rpx;
			}
		}

		.list-box {
			width: 635rpx;
			height: 480rpx;
			position: absolute;
			top: 90rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		.list-box-scroll {
			width: 100%;
			height: 100%;
		}

		.list-box-item {
			display: flex;
			width: 100%;
			height: 100%;
			@include box(0 30rpx);
			margin-top: 20rpx;

			.list-icon {
				width: 57rpx;
				height: 57rpx;
				position: relative;
				margin-right: 10rpx;

				image {
					width: 100%;
					height: 100%;
				}

				text {
					display: block;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-size: 30rpx;
					color: #FFFFFF;
					font-weight: bold;
				}
			}

			.list-context {
				flex: 1;

				.list-box-title {
					height: 57rpx;
					@include flex-al();
					font-size: 28rpx;
					color: #6B4B3D;
					font-weight: bold;
				}

				.list-box-text {
					font-size: 22rpx;
					color: #A6897C;
					line-height: 50rpx;
					font-weight: 400;
				}
			}
		}
	}
	.list-box-context {
		width: 100%;
		height: 100%;
		word-wrap:break-word;
		@include box(30rpx);
	}
</style>
