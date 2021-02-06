import request from './request'

// 商品详情

export const goodsDetail = (option) => {
	return request({
		url: 'Goods/goodsDetail',
		data: {
			m_id: option.m_id || '',
			goods_id: option.goods_id || ''
		}
	})
}

// 关注商品
export const attentionGoods = (option) => {
	return request({
		url: 'Goods/doCollect',
		data: {
			m_id: option.m_id || '',
			goods_id: option.goods_id || '',
			is_coll: option.is_coll
		}
	})
}

// 商品规格查询
export const goodsInquire = (option) => {
	return request({
		url: 'Goods/getSku',
		data: {
			goods_id: option.goods_id || '',
			goods_attr_ids: option.attr_id || ''
		}
	})
}

// 确认下单
export const goodsConOrder = (option) => {
	return request({
		url: 'Flow/fastConfirmOrder',
		data: {
			m_id: option.m_id || '',
			goods_id: option.goods_id || '',
			quantity: option.quantity || 1,
			goods_attr_ids: option.goods_attr_ids || '',
			goods_attr_desc: option.goods_attr_desc || ''
		}
	})
}

// 提交订单
export const goodsSubmit = (option) => {
	return request({
		url: 'Flow/fastSubmitOrder',
		data: {
			m_id: option.m_id || '',
			adr_id: option.adr_id || '',
			goods_id: option.goods_id || '',
			quantity: option.quantity || 1,
			goods_attr_ids: option.goods_attr_ids || '',
			goods_attr_desc: option.goods_attr_desc || '',
			remark: option.remark || '',
			state: option.state || 0
		}
	})
}


// 支付页面渲染
export const payRender = (option) => {
	return request({
		url: 'Flow/pay',
		mode: 'loading',
		data: {
			m_id: option.m_id || '',
			order_id: option.order_id || ''
		}
	})
}

// 支付
export const payMoney = (option) => {
	return request({
		url: 'Flow/doPay',
		data: {
			m_id: option.m_id || '',
			order_id: option.order_id || '',
			payment: option.payment || ''
		}
	})
}


// 订单列表
export const orderList = (option) => {
	return request({
		url: 'OrderInfo/orderList',
		data: {
			m_id: option.m_id || '',
			status: option.status || 0,
			p: option.p || 1
		}
	})
}

// 订单详情
export const orderDetail = (option) => {
	return request({
		url: 'OrderInfo/orderDetail',
		mode: 'loading',
		data: {
			m_id: option.m_id || '',
			order_id: option.order_id || ''
		}
	})
}

// 物流信息
export const logistics = (option) => {
	return request({
		url: 'OrderInfo/fegine',
		data: {
			m_id: option.m_id || '',
			order_id: option.order_id || ''
		}
	})
} 

// 确认收货
export const receipt = (option) => {
	return request({
		url: 'OrderInfo/signFor',
		mode: 'spin',
		data: {
			m_id: option.m_id || '',
			order_id: option.order_id || ''
		}
	})
}

// 商品分类
export const goodsClassList = (id) => {
	return request({
		url: 'Goods/goodsCategoryList',
		data: {
			goods_cate_id: id || ''
		}
	})
}

// 商品列表
export const goodsList = (option) => {
	return request({
		url: 'Goods/goodsList',
		data: {
			sort: option.sorts || 0,
			goods_cate_id: option.id || '',
			m_id: option.m_id || '',
			p: option.p || 1
		}
	})
}