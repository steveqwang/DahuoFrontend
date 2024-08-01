<template>
	<view class="tabs_box">
		<view  class="uni-tab-row"  v-if='type == 1'>
		  <view  class="uni-tab-item"  v-for="(tab,index) in tabList" :key="index" :data-index="tab" @click="handleTap(tab, index)"  :class="{'uni-tab-item-active': styleType == 1 && active== tab[defaultValue],'uni-tab-item-active2': styleType == 2 && active== tab[defaultValue]}">
		    <text class="uni-tab-item-title"  >{{tab[defaultLabel]}}</text>
		  </view>
		</view>
		<view  class="uni-tab-row uni-tab-row2"  v-if='type == 2'>
		  <view  class="uni-tab-item"  v-for="(tab,index) in tabList" :key="index"   :ref="'tabitem'+ tab[defaultValue]"
			  @click="handleTap(tab, index)"   :class="multiple  ? active.indexOf(tab[defaultValue]) != -1 : active == tab[defaultValue] ? 'uni-tab-item-active' : ''">
		   <text class="uni-tab-item-title"  >{{tab[defaultLabel]}}</text>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			tabList:{
				type: Array,
				default () {
					return [];
				}	
			},
			type:{
				type: [Number,String],
				default: 1
			},
			styleType:{
				type: [Number,String],
				default: 1
			},
			defaultActive: {
				type: [Number,String, Array],
				default: '',
			},
			multiple: {
				type: Boolean,
				default: false,
			},
			defaultLabel: {
				type: String,
				default: 'name'
			},
			defaultValue: {
				type: String,
				default: 'id'
			}
		},
		name:"tabs",
		data() {
			return {
				active: 0,
			};
		},
		watch: {
			defaultActive: {
				handler(val){
					this.active = val;
				},
				immediate: true,
			},
		},
		methods:{
			handleTap(row, index) {
				if(this.multiple) {
					let curI = this.active.indexOf(row[this.defaultValue]);
					curI == -1 ? this.active.push(row[this.defaultValue]) : this.active.splice(curI, 1);
				}else {
					if(row[this.defaultValue] == this.active) return;
					this.active = row[this.defaultValue];
				}
				this.$emit('change', this.active, this.multiple ? this.tabList.filter(c=> this.active.indexOf(row[this.defaultValue])) : this.tabList[index])
			},
		},
		onReady(){
		},
	}
</script>

<style lang="scss" scoped>
.uni-tab-row{
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 padding: 30rpx 0;
	 box-sizing: border-box;
	 white-space: nowrap;
	 .uni-tab-item {
		 // flex: 1;
		 text-align: center;
		 padding: 0 40rpx ;
		 box-sizing: border-box;
		 height: 64rpx;
		 line-height:  64rpx;
		 border-radius: 32rpx;
		 margin-right: 10rpx;
		 &:last-child {
		 	margin-right: 0rpx;
		 }
		 .uni-tab-item-title {
		 	font-size: 28rpx;
		 	color: #666666;
		 }
	 }
	 .uni-tab-item-active {
	 	  font-size: 36rpx;
	 	  color: #FFF;
	 	  height: 64rpx;
	 	  background: linear-gradient(90deg,#fc2b74, #fc5a3f);
	 	  box-shadow: 0px 6px 22px 0px rgba(252,62,96,0.48); 
	 	.uni-tab-item-title {
	 		color: #FFF;
	 	}
	 }
}
.uni-tab-row2 {
	overflow-x: auto;
	 justify-content: flex-start;
	 display: flex;
	 .uni-tab-item {
		 margin-right: 24rpx;
	 }
	 &::-webkit-scrollbar {
	 		 display: none !important;
	 		  width: 0;
	 		  height: 0;
	 		  color: transparent;
	 		}
}
  .scroll::-webkit-scrollbar {
   display: none !important;
    width: 0;
    height: 0;
    color: transparent;
  }
  ::-webkit-scrollbar {
  		width: 0;
  		height: 0;
  		background-color: transparent;
  	} 
</style>
