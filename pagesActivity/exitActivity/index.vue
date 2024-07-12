<template>
	<view class="event-exit">
		<view class="info-box">
			<form-box :formManage="formManage" :formInfo="formInfo" ref="formBox">
				<view v-for="(item, index) in formManage" :key="index"  class="info-row">
					<form-row :info="item" :options="item.options" v-model="formInfo[item.key]" :verification="isVerification"/>
				</view>
			</form-box>
			
			<view class="tip-box">
				* 注：退出活动后资金将原路返回
			</view>
		</view>
		<view class="bottom-box" >
			<button :loading="loading" @click="handleSave()">确认退出</button>
			<view class="bottom-occupy"></view>
		</view>
	</view>
</template>

<script>
	import formRow from '../components/form-row.vue';
	import formBox from '../components/form-box.vue';
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	export default {
		name: 'event-exit',
		title: '退出活动',
		components: {
			formRow,
			formBox
		},
		filters: {},
		data() {
			return {
				formInfo: {
					sake: '',
					illustrate: '',
				},
				formManage: [],
				isVerification: false,
				params: {},
				loading: false,
			}
		},
		computed: {
			...mapGetters(['USER_INFO', 'SYSTEMP_INFO'])
		},
		onLoad(params) {
			this.params = params;
			this.init();
			this.getSake();
		},
		methods: {
			// 理由
			getSake(){
				this.formManage[0].options = [
					{label: '我不想去了', value: '我不想去了'},
					{label: '临时有事', value: '临时有事'},
					{label: '其他', value: '其他'}
				]
			},
			// 提交
			async handleSave(){
				this.isVerification = true;
				let flag = await this.$refs.formBox.validate();
				if(!flag) return uni.showToast({ title:'请检查填写信息！', icon:'none'});
				this.loading = true;
				setTimeout(()=>{
					console.log(this.formInfo)
					uni.showToast({ title:'退出成功', icon:'none'});
					this.loading = false;
					setTimeout(()=> {
						uni.navigateBack({
							delta: 1
						})
					}, 600);
				},500)
			},
			// 初始化
			init(){
				this.formManage = [
					{label: '退出原因', key: 'sake', type: 'select', require: true, regular: true},
					{label: '退出说明', key: 'illustrate', type: 'textarea', regular: true},
				]
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.event-exit{
		width: 100%;
		padding: 30rpx 24rpx 180rpx;
		box-sizing: border-box;
		
	}
	.info-box {
		width: 100%;
		background: #fff;
		padding: 30rpx 24rpx;
		box-sizing: border-box;
		border-radius: 30rpx;
		min-height: calc(100vh - 240rpx);
		// .info-row {
		// 	margin-bottom: 40rpx;
		// }
	}
	.tip-box {
		box-sizing: border-box;
		font-size: 28rpx;
		color: $theme;
		line-height: 40px;
	}
	.bottom-box {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		background: #ffffff;
		box-shadow: 0px 0px 12px 0px rgba(238,239,241,0.50); 
		button {
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: $uni-button-bg;
			border-radius: 30rpx;
			font-size: 30rpx;
			font-family: PingFang HK, PingFang HK-Medium;
			font-weight: 500;
			color: #ffffff;
		}
		.bottom-occupy {
			height: calc(constant(safe-area-inset-bottom) / 2);
			height: calc(env(safe-area-inset-bottom) / 2);
			width: 100%;
		}
	}
</style>