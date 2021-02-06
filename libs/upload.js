import {
	BASE_URL
} from '@/network/config'

export default class Upload {
	constructor(object) {
		this.obj = {
			count: 1,
		}
		if (Object.prototype.toString.call(object) === "[object Object]") {
			Object.assign(this.obj, object);
		} else {
			uni.showToast({
				title: '参数必须为对象',
				icon: "icon",
				duration: 2000
			});
		}


		return this;
	}
	// 上传图片 返回一个图片的数组集合
	async uploadPic() {
		let chooseImageResult = await this.chooseImage()
		console.log("选择图片", chooseImageResult)

		let imgArr = await chooseImageResult.tempFilePaths.map(async (item, index) => {
			uni.showLoading({
				title: '正在上传,请等待...',
				mask: true
			});
			let uploadFileResult = await this.uploadFile(item)
			return uploadFileResult
		})

		return new Promise((resolve, reject) => {
			Promise.all(imgArr).then((result) => {

				// uni.hideLoading();
				uni.showToast({
					title: '上传成功',
					icon: "none",
					duration: 2000
				});
				resolve(result)
			})
		})
	}
	uploadFile(file) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: BASE_URL + this.obj.url,
				filePath: file,
				name: 'image',
				success: function(res) {
					var data = res.data;
					resolve(JSON.parse(data))
				},
				header: {
					'content-type': 'multipart/form-data'
				},
				formData: {
					folder: 1
				},
				fail: function(res) {
					reject("上传失败")
				},
				complete: function(res) {
					uni.hideToast();
				}
			})
		})
	}
	chooseImage() {
		return new Promise((resolve, reject) => {
			uni.showActionSheet({
				itemList: ['从手机相册中选择', '拍摄'],
				itemColor: '#000000',
				success: (status) => {
					if (!status.cancel) {
						let Type = status.tapIndex == 0 ? 'album' : 'camera'
						uni.chooseImage({
							count: this.obj.count, //1, // 默认9
							sizeType: ['compressed'], //['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
							sourceType: [Type], //['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
							success: function(res) {
								resolve(res)
							},
							fail: function() {
								reject("选择图片失败")
							}
						})
					}
				}
			})

		})
	}
}
