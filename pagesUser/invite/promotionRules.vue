<template>
	<view class="promotion-rules">
		<view class="lable">
			<view class="row" v-for="(item,index) in tabList" :key="index">
				<text>{{item.label}}</text>
				<image @click="handleEquity()" v-if="item.icon" :src="item.icon" mode="scaleToFill"></image>
			</view>
		</view>
		<block v-if="!loading">
			<view class="list">
				<view class="list-row"  v-for="(item,index) in list" :key="index" >
					<view  class="row" v-for="(item2,index2) in tabList" :key="index2" :class="{'active': item2.key == 'equity'}">
						{{item[item2.key]}}
					</view>
				</view>
				
			</view>
		</block>
		<loadingBox v-else />
		<view class="info-box">
			<view class="title">
				{{info.title}}
			</view>
			<parse :html="info.content" class="content" />
		</view>
	</view>
</template>

<script>
	import {
		parseTime
	} from '@/utils/global.js'
	import {
		loadingBox
	} from '@/components/loading-box.vue';
	import parse from '@/components/u-parse/u-parse.vue';
	export default {
		name: 'promotionRules',
		title: '晋升规则',
		components: {
			loadingBox,
			parse
		},
		data() {
			return {
				tabList: [{
						label: '等级',
						key: 'grade'
					},
					{
						label: '条件',
						key: 'condition'
					},
					{
						label: '权益',
						key: 'equity',
						icon: require('../static/icon/doubt01.png')
					}
				],
				list: [],
				info: {
					title: '邀请规则权益说明：',
					content: '',
				},
				loading: false,
			}
		},
		onLoad(params) {
			this.getInfo();
			this.getList();
		},
		methods: {
			// 权益
			handleEquity(){
				uni.showToast({
					title: '下级用户消费，可以获得实付金额的5%',
					icon: 'none'
				});
			},
			getInfo() {
				let content =
					'<div>工会，或称劳工总会、工人联合会。工会原意是指基于共同利益而自发组织的社会团体。这个共同利益团体诸如为同一雇主工作的员工，在某一产业领域的个人。工会组织成立的主要意图，可以与雇主谈判工资薪水、工作时限和工作条件等等。</div><div>工会，或称劳工总会、工人联合会。工会原意是指基于共同利益而自发组织的社会团体。这个共同利益团体诸如为同一雇主工作的员工，在某一产业领域的个人。工会组织成立的主要意图，可以与雇主谈判工资薪水、工作时限和工作条件等等。</div>'
				this.info.content = content;
			},
			// 信息
			getList() {
				this.loading = true;
				setTimeout(() => {
					this.list = [{
							grade: '普通用户',
							condition: '无',
							equity: '无'
						},
						{
							grade: '会员用户',
							condition: '购买会员',
							equity: '5%'
						},
						{
							grade: '团长',
							condition: '团队满50人',
							equity: '8%'
						},
						{
							grade: '代理',
							condition: '团队满200人',
							equity: '10%'
						}
					];
					this.loading = false;
				}, 1000)
			},

		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";

	.promotion-rules {
		padding: 30rpx 24rpx;
		box-sizing: border-box;
		width: 100%;

	}
	.lable {
		padding: 30rpx 0rpx;
		display: flex;
		align-items: center;
		.row {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 42rpx;
			font-size: 30rpx;
			image {
				margin-left: 4rpx;
				width: 26rpx;
				height: 26rpx;
			}
		}
	}
	.list {
		.list-row {
			display: flex;
			align-items: center;
			background-color: #fff;
			margin-bottom: 2rpx;
		}
		.row {
			padding: 40rpx 24rpx;
			box-sizing: border-box;
			flex: 1;
			line-height: 36rpx;
			font-size: 26rpx;
			font-family: PingFang HK, PingFang HK-Medium;
			font-weight: 500;
			text-align: center;
			color: #4e5969;
		}
		.active {
			color: $theme;
		}
	}
	.info-box {
		padding: 30rpx 0;
		box-sizing: border-box;
		width: 100%;
	
		.title {
			line-height: 42rpx;
			font-size: 30rpx;
			font-family: PingFang HK, PingFang HK-Medium;
			font-weight: 500;
			text-align: left;
			color: #1d2129;
			padding-left: 18rpx;
			position: relative;
			margin-bottom: 24rpx;
	
			&::before {
				position: absolute;
				z-index: 1;
				content: '';
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 6rpx;
				height: 36rpx;
				background: $theme;
				border-radius: 4rpx;
			}
		}
	
		.content {
			font-size: 28rpx;
			line-height: 46rpx;
			word-break: break-all;
			height: auto;
			overflow: hidden;
		}
	}
</style>