<template>
	<view class="container u-skeleton">
		<view class="app-head">
			<text class="title u-skeleton-fillet">头像</text>
			
			<view class="app-head-img u-skeleton-circle" @click="editAvatar">
				<u-image border-radius="50%" :src="avatar.url" width="100%" height="100%"></u-image>
			</view>
		</view>
		<view class="app-name">
			<text class="title u-skeleton-fillet">昵称</text>
			<view class="app-head-input u-skeleton-fillet">
				<input type="text" v-model="nickname" placeholder="请输入您的昵称" placeholder-style="font-size: 28rpx" />
			</view>
		</view>
		
		<view class="app-btn" @click="saveEdit">
			<text>保存</text>
		</view>
		
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	import { userInfo, editUserInfo } from '@/network/My-api'
	import Upload from '@/libs/upload'
	export default {
		data() {
			return {
				avatar: {
					id: '',
					url: ''
				},
				nickname: '',
				loading: true,
				m_id: ''
			};
		},
		onLoad(option) {
			uni.showLoading({
				title: 'Loading'
			})
			this.getUserInfo(option.m_id)
		},
		methods: {
			async getUserInfo(id) {
				try{
					let res = await userInfo(id)
					this.avatar.id = res.avatar
					this.avatar.url = res.avatar_path
					this.nickname = res.nickname
					this.m_id = res.m_id
					
					uni.hideLoading()
					this.loading = false
				}catch(e){
					uni.showToast({
						title: '获取信息失败',
						icon: 'none'
					})
				}
			},
			// 修改头像
			async editAvatar() {
				try{
					let result = await new Upload({ url: 'System/upload' }).uploadPic()
					
					this.avatar.url = result[0].data.list[0].abs_url
					this.avatar.id = result[0].data.list[0].id
				}catch(e){
					uni.showToast({
						title: '修改头像失败',
						icon: 'none'
					})
				}
				 
			},
			async saveEdit() {
				try{
					console.log(111)
					let res = await editUserInfo({ avatar: this.avatar.id, nickname: this.nickname, m_id: this.m_id })
					
					uni.showToast({
						title: '保存成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				}catch(e){
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}
	.app-head, .app-name {
		@include flex-al-ju(space-between);
		width: 100%;
		@include box(0 30rpx);
		background-color: #FFFFFF;
		
		.title {
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
		}
	}
	.app-head {
		height: 170rpx;
	}
	.app-name {
		height: 104rpx;
	}
	.app-head-img {
		width: 110rpx;
		height: 110rpx;
	}
	.app-head-input {
		flex: 1;
		text-align: right;
		margin-left: 20rpx;
		input {
			width: 100%;
			font-size: 30rpx;
			color: #333333;
		}
	}
	.app-btn {
		width: 100%;
		height: 98rpx;
		@include flex-center();
		background: linear-gradient(0deg, #ED343D, #FF6638);
		color: #FFFFFF;
		font-size: 32rpx;
		font-weight: bold;
		
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
	}
</style>
