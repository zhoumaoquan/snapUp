import request from './request'

// 获取openid
export const getOpenCode = (code) => {
	return request({
		url: 'Passport/openidForCode',
		data: {
			code: code || ''
		}
	})
}

// 保存用户信息
export const saveUserInfo = (option) => {
	return request({
		url: 'Passport/login',
		data: {
			openid: option.openid,
			avatar: option.avatar,
			gender: option.gender,
			nickname: option.nickname,
			account: option.account,
			code: option.code || ''
		}
	})
}

// 获取手机号
export const getUserPhone = (option) => {
	return request({
		url: 'Passport/getphone',
		data: {
			...option
		}
	})
}