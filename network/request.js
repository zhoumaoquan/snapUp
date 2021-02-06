import {
	BASE_URL,
	TIME_IUT,
	HEADER,
	METHOD
} from './config'

export default (Option) => {

	if (Option.mode === 'loading') {
		uni.showLoading({
			title: Option.message || '加载中...',
			mask: true
		})
	} else if (Option.mode === 'spin') {
		uni.showNavigationBarLoading()
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + Option.url,
			method: Option.method || METHOD,
			header: Option.header || HEADER,
			data: Option.data || {},
			success: (res) => {
				if (res.data.flag === 'success') {
					resolve(res.data.data);
				} else {
					reject(res.data.message);
				}
			},
			fail: (err) => {
				reject(err);
			},
			complete: () => {
				if (Option.mode === 'loading') {
					uni.hideLoading()
				} else if (Option.mode && Option.mode !== 'none') {
					uni.hideNavigationBarLoading();
				}
			}
		})
	})
}
