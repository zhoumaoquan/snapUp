import request from './request'

// 个人信息
export const userInfo = (id) => {
	return request({
		url: 'Passport/member_info',
		data: {
			m_id: id || ''
		}
	})
}

// 修改个人信息
export const editUserInfo = (option) => {
	return request({
		url: 'Center/modifyInfo',
		mode: 'loading',
		message: '保存中...',
		data: {
			m_id: option.m_id || '',
			avatar: option.avatar || '',
			nickname: option.nickname || ''
		}
	})
}

// 地址列表
export const addressList = (id) => {
	return request({
		url: 'Center/addresses',
		mode: 'loading',
		data: {
			m_id: id || ''
		}
	})
}

// 地址详情
export const addressDeta = (option) => {
	return request({
		url: 'Center/address',
		mode: 'loading',
		data: {
			m_id: option.m_id || '',
			adr_id: option.id || ''
		}
	})
}

// 添加新地址
export const newAddress = (option) => {
	return request({
		url: 'Center/updAddress',
		mode: 'loading',
		message: '添加地址中...',
		data: {
			m_id: option.m_id || '',
			...option
		}
	})
}

// 设置默认地址
export const setDefault = (option) => {
	return request({
		url: 'Center/setDefault',
		mode: 'spin',
		data: {
			m_id: option.m_id || '',
			adr_id: option.id || ''
		}
	})
}

// 删除地址
export const delAddress = (option) => {
	return request({
		url: 'Center/delAddress',
		mode: 'loading',
		message: '正在删除...',
		data: {
			m_id: option.m_id || '',
			adr_id: option.id || ''
		}
	})
}

// 关于我们
export const aboutUs = () => {
	return request({
		mode: 'loading',
		url: 'System/aboutUs'
	})
}

// 反馈意见
export const feedback = (option) => {
	return request({
		url: 'System/feedback',
		mode: 'loading',
		message: '正在提交...',
		data: {
			content: option.content || '',
			contact: option.contact || '',
			image: option.image || '',
			title: option.title || ''
		}
	})
}

// 帮助列表
export const helpList = () => {
	return request({
		mode: 'loading',
		url: 'System/helpArticle'
	})
}

// 文档详情
export const helpDeta = (id) => {
	return request({
		url: 'System/articleDetail',
		mode: 'loading',
		data: {
			id: id || ''
		}
	})
}

// 我的关注
export const myAttention = (option) => {
	return request({
		url: 'Center/myCollGoods',
		mode: 'spin',
		data: {
			m_id: option.m_id || '',
			type: option.type || 1
		}
	})
}

// 我的钱包
export const myWallet = (id) => {
	return request({
		url: 'Center/withdrawPage',
		mode: 'spin',
		data: {
			m_id: id || ''
		}
	})
}

// 余额明细
export const myBalance = (option) => {
	return request({
		url: 'Center/balanceRecords',
		mode: 'loading',
		data: {
			m_id: option.m_id || '',
			p: option.p || 1
		}
	})
}

// 提现页面
export const withdrawPage = (option) => {
	return request({
		url: 'Center/withdraw_type',
		mode: 'loading',
		data: {
			m_id: option.m_id || '',
			type: option.type || 1
		}
	})
}

// 收益总页面
export const incomePage = (id) => {
	return request({
		url: 'Center/sales_withdraw',
		mode: 'spin',
		data: {
			m_id: id || ''
		}
	})
}

// 收益明细
export const incomeDesc = (option) => {
	return request({
		url: 'Center/sales_withdraw_desc',
		mode: 'loading',
		data: {
			m_id: option.m_id || '',
			type: option.type || 1,
			p: option.p || 1
		}
	})
}

// 创建充值订单
export const topupOrder = (option) => {
	return request({
		url: 'Center/createRechargeOrder',
		data: {
			m_id: option.m_id || '',
			recharge_amounts: option.number || 0
		}
	})
}

// 充值订单在线支付
export const topupOrderPay = (option) => {
	return request({
		url: 'Center/doBRPay',
		data: {
			m_id: option.m_id || '',
			payment: 2,
			recharge_order_id: option.orderId || ''
		}
	})
}

// 提现
export const withdrawMoney = (option) => {
	return request({
		url: 'Center/withdraw',
		data: {
			m_id: option.m_id || '',
			amounts: option.amounts || '',
			type: option.type || 1,
			account_name: option.username || '',
			account_number: option.number || ''
		}
	})
}

// 消息列表
export const newsList = (option) => {
	return request({
		url: 'HomeMessage/messages',
		data: {
			m_id: option.m_id || '',
			p: option.p || 1
		}
	})
}

// 消息详情
export const newsDetail = (option) => {
	return request({
		url: 'HomeMessage/detail',
		data: {
			m_id: option.m_id || '',
			home_msg_id: option.id || ''
		}
	})
}

// 邀请码
export const inviteCode = (id) => {
	return request({
		url: 'Center/distributeCode',
		data: {
			m_id: id || '',
		}
	})
}