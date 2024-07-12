<template>
	<view class="datetime">
		<picker mode="multiSelector" :disabled="disabled" @change="bindChange" @columnchange="bindColumnchange"
			:value="indexPic" :range="originData" range-key="text" @cancel="handleCancel">
			<slot />
			<!-- <view class="datetime-text">{{datetimeStr}}</view> -->
		</picker>
	</view>
</template>

<script>
	export default {
		name: "datetime", // 时间选择器 时分
		props: {
			value: {
				type: Array,
				default: ()=> [],
			},
			// 是否禁用
			disabled: {
				type: Boolean,
				default: false,
			},
			placeholder: {
				type: String,
				default: "请选择日期"
			}
		},

		watch: {
			value(newVal, oldVal) {
				this.setPropValue(newVal)
			}
		},
		data() {
			return {
				originData: [
					[],
					[],
					[],
					[],
					[]
				],
				indexPic: [0, 0, 0, 0, 0],
			}
		},
		mounted() {
			this.initData()
		},
		methods: {
			bindChange(event) {
				// 组件返回值
				let returnVIndex = event.target.value;
				let r1 = this.originData[0][returnVIndex[0]]
				let r2 = this.originData[1][returnVIndex[1]]
				let r3 = this.originData[2][returnVIndex[2]]
				let r4 = this.originData[3][returnVIndex[3]]
				let r5 = this.originData[4][returnVIndex[4]]
				// 组件返回时间与参数值
				this.$emit("change", [r1.value + ":" + r2.value , r4.value + ":" + r5.value ])
			},
			handleCancel(){
				this.$emit('cancel');
			},
			bindColumnchange(event) {
				this.indexPic[event.detail.column] = event.detail.value;
			},
			// 更新prop传入值
			setPropValue(value) {
				if(!value || value.length < 2) return;
				let start = value[0].split(':').map(c=> Number(c));
				let end = value[1].split(':').map(c=> Number(c));
				this.originData.forEach((item, index)=>{
					if(index === 0 || index === 3){
						for (let i = 0; i < item.length; i++) {
							if (index === 0 && Number(item[i].value) === start[0] || index === 3 && Number(item[i].value) === end[0]) {
								this.indexPic[index] = i
								break;
							}
						}
					}else if(index === 1 || index === 4){
						for (let i = 0; i < item.length; i++) {
							if (index === 1 && Number(item[i].value) === start[1] || index === 4 && Number(item[i].value) === end[1]) {
								this.indexPic[index] = i
								break;
							}
						}
					}
				});
				// 更新页面数组渲染
				this.indexPic = [...this.indexPic];
			},
			// 数据初始化
			initData() {
				let
					hours = [],
					minutes = [],
					hh = 23,
					mm = 60
				for (let ih = 0; ih <= hh; ih++) {
					hours.push({
						value: ih < 10 ? '0' + ih : ih,
						text: ih < 10 ? '0' + ih + "时" : ih + "时"
					})
				}
				for (let im = 0; im < mm; im++) {
					minutes.push({
						value: im < 10 ? '0' + im : im,
						text: im < 10 ? '0' + im + "分" : im + "分"
					})
				}

				this.originData[0] = hours
				this.originData[1] = minutes
				this.originData[2] = [{value: '至',text: '至'}]
				this.originData[3] = hours
				this.originData[4] = minutes
				this.originData = [...this.originData]
				this.setPropValue(this.value)
			},
		}
	}
</script>

<style scoped>
	.datetime {
		min-width: 200rpx;
		min-height: 50rpx;
	}

	.datetime-text {
		color: #888A88;
		padding: 10rpx;
	}
</style>
