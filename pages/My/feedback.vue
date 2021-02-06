<template>
	<view class="container">
		<view class="app-box-item mg-top">
			<text class="title">反馈标题：</text>
			<view class="app-box-input">
				<input type="text" v-model="param.title" maxlength="50" placeholder="请输入标题问题" />
			</view>
		</view>
		<view class="app-box-item">
			<text class="title">描述问题：</text>
		</view>
		<textarea :auto-height="true" placeholder-class="placeholder" placeholder="您好！为了更好的解决您的问题，请详细描述问题出现的原因!" v-model="param.content" class="app-box-cont">

		</textarea>


		<view class="app-upload">
			<view class="app-upload-add mg-right" @click="uploadImage">
				<image class="app-upload-icon" src="@/static/icon/upload.png"></image>
				<text>上传照片</text>
			</view>

			<view class="app-upload-box-item mg-right" v-for="(item, index) in imageList" :key="item.data.list[0].id">
				<u-image border-radius="10" :src="item.data.list[0].abs_url" width="100%" height="100%">
					<u-loading slot="loading"></u-loading>
				</u-image>

				<u-icon class="app-upload-close" @click="closeImage(index)" color="#333" name="close-circle-fill" size="45"></u-icon>
			</view>

		</view>

		<view class="app-box-item mg-top">
			<text class="title">联系方式：</text>
			<view class="app-box-input">
				<input maxlength="11" v-model="param.contact" type="number" placeholder="请输入联系方式" />
			</view>
		</view>

		<view class="default-btn" @click="submit">
			<text>提交反馈</text>
		</view>
	</view>
</template>

<script>
	import Upload from '@/libs/upload'
	import {
		feedback
	} from '@/network/My-api'
	export default {
		data() {
			return {
				param: {
					title: '',
					image: '',
					contact: '',
					content: ''
				},
				imageList: []
			};
		},
		onLoad(option) {

		},
		methods: {
			async uploadImage() {
				try {
					let result = await new Upload({
						url: 'System/upload',
						count: 5
					}).uploadPic()
					
					this.imageList = result
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			async submit() {
				if (this.param.title.trim().length === 0) {
					return uni.showToast({
						title: '请填写反馈标题',
						icon: 'none'
					})
				}
				if (this.param.content.trim().length < 5) {
					return uni.showToast({
						title: '反馈意见不能少于5个字哦',
						icon: 'none'
					})
				}
				if (this.param.contact.trim().length === 0) {
					return uni.showToast({
						title: '请填写联系方式',
						icon: 'none'
					})
				}
				
				let imgId = this.imageList.map((item) => {
					return item.data.list[0].id
				})
				this.param.image = imgId.length > 0 ? imgId.join(',') : '';
				try {
					let res = await feedback(this.param)
					
					uni.showToast({
						title: '反馈成功',
						mask: true,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
					})
				} catch (e) {
					uni.showToast({
						title: e,
						icon: 'none'
					})
				}
			},
			closeImage(e) {
				
				this.imageList.splice(e, 1)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		@include box(0 30rpx);
	}

	.mg-top {
		margin-top: 30rpx;
	}

	.app-box-item {
		@include flex-al();
		height: 108rpx;

		.title {
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
			margin-right: 30rpx;
		}

		.app-box-input {
			flex: 1;

			input {
				width: 100%;
				height: 100%;
				font-size: 30rpx;
				color: #333333;
			}
		}
	}

	.app-box-cont {
		width: 100%;
		color: #333333;
		font-size: 30rpx;
		min-height: 100rpx;
	}
	.placeholder {
		word-wrap: break-word;
	}
	.app-upload {
		margin-top: 70rpx;
		display: flex;
		flex-wrap: wrap;

		&-add {
			box-sizing: border-box;
			width: 150rpx;
			height: 150rpx;
			border-radius: 10rpx;
			background-color: #FBFAF8;
			border: 2rpx dashed #D0D0D0;
			margin-top: 20rpx;
			@include flex-center();
			flex-direction: column;

			.app-upload-icon {
				width: 46rpx;
				height: 38rpx;
			}

			text {
				font-size: 22rpx;
				color: #999999;
				margin-top: 13rpx;
			}
		}

		.app-upload-box-item {
			position: relative;
			width: 150rpx;
			height: 150rpx;
			margin-top: 20rpx;

			.app-upload-close {
				position: absolute;
				right: -17rpx;
				top: -17rpx;
			}
		}

		.mg-right {
			margin-right: 20rpx;
		}

		.mg-right:nth-of-type(4n+4) {
			margin-right: 0;
		}
	}

	.default-btn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 96rpx;

		z-index: 99;
	}
</style>
