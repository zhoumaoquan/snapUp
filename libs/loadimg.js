import { BASE_URL } from '@/network/config'
export const uploadHead = function(option) {
	if(option.loading) {
		uni.showLoading({
			title: '上传中...',
			mask: true
		})
	}
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: BASE_URL + option.url,
			filePath: option.imgUrl,
			name: 'image',
			header: {
				'content-type': 'multipart/form-data'
			},
			formData: {
				folder: 1
			},
			success: function(res) {
				let data = JSON.parse(res.data);
				resolve(data);
			},
			complete: function() {
				if(option.loading) {
					uni.hideLoading()
				}
			},
			file: function(err) {
				reject(err);
			}
		})
	})
}

export const downloadFile = function(ImgUrl) {
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url: ImgUrl,
			success(res) {
				resolve(res);
			},
			fail(err) {
				reject(err);
			}
		})
	})
}