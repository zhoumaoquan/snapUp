import request from './request'

// 获取首页轮播、导航栏、公共数据
export const HomeBase = (id) => {
	return request({
		url: 'Index/index',
		data: {
			m_id: id || ''
		}
	})
}

// 获取首页推荐商品数据
export const HomeGoods = (option) => {
	return request({
		url: 'Goods/goodsList',
		mode: 'spin',
		data: {
			is_best: option.is_best || '',
			p: option.p || 1,
			goods_cate_id: option.id,
			m_id: option.m_id || ''
		}
	})
}

// 获取首页 商品分类数据
export const HomeCate = (id) => {
	return request({
		url: 'Goods/goodsCategoryList',
		mode: 'spin',
		data: {
			id: id || ''
		}
	})
}

// 获取某个分类下的商品 
export const classGoods = (option) => {
	return request({
		url: 'Goods/goodsList',
		mode: 'spin',
		data: {
			sort: option.sorts || 0,
			p: option.p || 1,
			m_id: option.m_id || '',
			goods_cate_id: option.cate_id || ''
		}
	})
}

// 热门搜索
export const SeachPopular = () => {
	return request({
		url: 'System/getKeywords',
		mode: 'spin'
	})
}

// 搜索
export const searchGoods = (option) => {
	return request({
		url: 'Goods/goodsList',
		mode: 'spin',
		data: {
			keywords: option.keywords || '',
			sort: option.sorts || 0,
			p: option.p || 1,
			m_id: option.m_id || ''
		}
	})
}

// 规则
export const rulePage = (type) => {
	return request({
		url: 'System/userInstructions',
		mode: 'spin',
		data: {
			type
		}
	})
}

export const loginCount = (id) => {
	return request({
		url: 'Passport/login_count',
		data: {
			m_id: id || ''
		}
	})
}