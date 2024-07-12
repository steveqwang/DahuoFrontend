<template>
	<view class="form-box">
		<slot/>
	</view>
</template>

<script>
	import regularObj from "@/utils/validate";
	export default {
		props: {
			formManage: {
				type: Array,
				default: () => [],
			},
			formInfo: {
				type: Object,
				default: () => {},
			},
		},
		components: {},
		data() {
			return {
				regularObj: regularObj,
			}
		},
		// watch: {
		// 	formInfo: {
		// 		handler(val){
		// 			 this.info = formInfo;
		// 		},
		// 		immediate: true,
		// 		deep: true,
		// 	},
			
		// },
		methods: {
			validate() {
				let flag = true;
				for(let i = 0; i < this.formManage.length; i++){
					flag = this.getRegular(this.formManage[i])
					if(!flag) break;
						
				}
				return flag;
			},
			// 正则
			getRegular(row){
				let flag = true;
				if(row.regularFun) {
					row.regularText = this.regularObj[row.regularFun](row, this.formInfo[row.key]);
					flag = !row.regularText;
					return flag;
				}
				if(!row.require) return flag;
				switch (row.type){
					case 'images':
						if(!this.formInfo[row.key].length)  flag = false;
						break;
					default: // input、textarea、select
						if(!this.formInfo[row.key] && this.formInfo[row.key] !== 0)  flag = false;
						break;
				}
				return flag;
				
			},
		},
		onReady() {
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/css/mixin.scss";
</style>