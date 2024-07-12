import Vue from 'vue'
import Vuex from 'vuex'
import { setLogin, setBindPhone, getUser, setUser, setLogout} from '@/api/user.js'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		TOKEN: uni.getStorageSync('DH_TOKEN') ? uni.getStorageSync('DH_TOKEN') : null,
		USER_INFO: uni.getStorageSync('DH_USER_INFO') ? uni.getStorageSync('DH_USER_INFO') : null,
		SYSTEMP_INFO: null, // 系统信息
		INVITATION_CODE: uni.getStorageSync('DH_INVITATION_CODE') ? uni.getStorageSync('DH_INVITATION_CODE') :
					null,
					
	},
	getters: {
		USER_INFO: state => state.USER_INFO,
		TOKEN: state => state.TOKEN,
		SYSTEMP_INFO: state => state.SYSTEMP_INFO,
		INVITATION_CODE: state => state.INVITATION_CODE,
	},
	mutations: {
		SET_SYSTEMP_INFO(state, data) {
			state.SYSTEMP_INFO = data;
		},
		SET_INVITATION_CODE(state, data) {
			state.INVITATION_CODE = data;
			uni.setStorageSync('DH_INVITATION_CODE', data)
		},
		SET_TOKEN(state, data) {
			state.TOKEN = data
			uni.setStorageSync('DH_TOKEN', data)
			if (!data) {
				state.USER_INFO = null
				uni.setStorageSync('DH_USER_INFO', null)
			}
		},
		SET_USER_INFO(state, data) {
			state.USER_INFO = data
			uni.setStorageSync('DH_USER_INFO', data)
			if (!data) {
				state.TOKEN = null
				uni.setStorageSync('DH_TOKEN', null)
			}
		},
	},
	actions: {
		// 登录
		SET_LOGIN({ state, commit, dispatch }, params) {
			return new Promise((resolve, reject) => {
				wx.login({
				  success (res) {
					if (res.code) {
					 setLogin({code:res.code})
					 .then((info) => {
						if (info.code == 0 ) {
							commit('SET_TOKEN',info.data.access_token);
							dispatch('GET_USER');
							resolve(info);
						}else if(info.code == 2){ //需要绑定手机号
							resolve({...info});
						}else{
							reject(info);
						}
					 })
					 .catch((err) => {
						reject(err);
					 });
					} else {
						reject(err);
					
					}
				  }
				})
			});
		},
		SET_BIND_PHONE({ state, commit, dispatch }, params){
			return new Promise((resolve, reject) => {
				setBindPhone(params)
				.then((res) => {
					if (res.code == 0) {
						commit('SET_TOKEN',res.data.access_token);
						dispatch('GET_USER');
						resolve();
					}else{
						reject(res);
					}
				})
				.catch((err) => {
					reject(err);
				});
			});
		},
		// 获取信息
		GET_USER({ state, commit, dispatch }, params){
			return new Promise((resolve, reject) => {
				getUser(params)
				.then((res) => {
					if (res.code == 0) {
						commit('SET_USER_INFO',res.data);
						resolve();
					}else{
						reject();
					}
				})
				.catch((err) => {
					reject(err);
				});
			});
		},
		// 修改信息
		SET_USER({ state, commit, dispatch }, params){
			return new Promise((resolve, reject) => {
				setUser(params)
				.then((res) => {
					if (res.code == 0) {
						dispatch('GET_USER');
						resolve();
					}else{
						reject(res);
					}
				})
				.catch((err) => {
					reject(err);
				});
			});
		},
		// 退出（测试使用）
		SET_LEAVE({ state, commit, dispatch }){
			// setLogout().then((res1)=>{
			// 	if(res1.code == 0){
					commit('SET_TOKEN',null)
					uni.showToast({
						title:'退出成功',icon:'none'
					});
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/my/index'
						});
					},600)
				// }
			// })
		},
	}
})