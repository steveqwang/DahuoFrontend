<template>
	<view class="report">
		<view class="info-box">
			<form-box :formManage="formManage" :formInfo="formInfo" ref="formBox">
				<view v-for="(item, index) in formManage" :key="index"  class="info-row">
					<form-row :info="item" :options="item.options" v-model="formInfo[item.key]" :verification="isVerification"/>
				</view>
			</form-box>
		</view>
		<view class="tip-box">
			<text>您的举报将在24小时内被处理</text>
			<text>处理结果将在第一时间在通知消息中反馈</text>
		</view>
		<view class="bottom-box" >
			<button :loading="loading" @click="handleSave()">提交</button>
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
		name: 'report',
		title: '举报',
		components: {
			formRow,
			formBox
		},
		filters: {},
		data() {
			return {
				formInfo: {
					sake: '',
					describe: '',
					images: [],
				},
				formManage: [],
				isVerification: false,
				params: {},
				loading: false,
				regularNumber: 0,
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
			// 举报理由
			getSake(){
				this.formManage[0].options = [
					{label: '举报理由1', value: '1'},
					{label: '举报理由2', value: '2'},
					{label: '举报理由举报理由举报理由举报理由举报理由举报理由举报理由3', value: '3'},
					{label: '举报理由4', value: '4'},
					{label: '举报理由5', value: '5'},
					{label: '举报理由6', value: '6'},
					{label: '举报理由7', value: '7'},
					{label: '举报理由8', value: '8'},
					{label: '举报理由9', value: '9'},
					{label: '举报理由10', value: '10'}
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
					uni.showToast({ title:'提交成功', icon:'none'});
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
					{label: '举报理由', key: 'sake', type: 'select'},
					{label: '举报描述（必填）', key: 'describe', type: 'textarea', placeholder: '请输入举报描述', require: true},
					{label: '图片证据（选填）', key: 'images', type: 'images', maxNum: '9'}
				]
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
	.report{
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
		// .info-row {
		// 	margin-bottom: 40rpx;
		// }
	}
	.tip-box {
		width: 100%;
		padding: 40rpx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 28rpx;
		text-align: center;
		color: #999999;
		line-height: 50rpx;
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