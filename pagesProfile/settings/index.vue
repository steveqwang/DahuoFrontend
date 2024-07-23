<template>
  <view class="profileSettings">
    <view class="content">
      <!-- 第一部分：个人信息 -->
      <view class="section">
        <view class="profile-section">
          <image class="avatar" :src="avatarUrl"></image>
          <view class="info">
            <text class="name">@Roger Q</text>
          </view>
					<button class="edit-bio-button" @click="editBio">我的简介 ></button>
        </view>
        <textarea class="bio-input" v-model="bio" placeholder="点击添加介绍和背景图片，填写简介"></textarea>
      </view>
      <!-- 第二部分：我的链接 -->
      <view class="section">
        <text class="section-title">我的链接</text>
        <view class="link-placeholder">
					<text class="link-text">还没有添加名片链接哦</text> <!-- 添加灰色小字 -->
					<button class="add-link-button" @click="addLink">
						<image class="add-link-icon" src="../../static/icon/addlink.png" />
					</button>
					<text class="link-text">添加链接</text> <!-- 添加灰色小字 -->
        </view>
      </view>
      <!-- 第三部分：我的社交媒体 -->
      <view class="section">
        <text class="section-title">我的社交媒体</text>
        <view class="social-media-list">
          <view class="social-media-item" v-for="(item, index) in socialMediaList" :key="index">
            <image :src="item.icon" class="icon"></image>
            <text class="social-media-name">{{ item.name }}</text>
            <switch :checked="item.enabled" @change="toggleSwitch(index)"></switch>
          </view>
        </view>
				<text class="hint">长按链接拖动改变顺序</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'profileSettings',
  data() {
    return {
      avatarUrl: '../../static/icon/avatar.png',
      bio: '',
      socialMediaList: [
        { name: '大众点评', icon: '../../static/icon/dianping_round.png', enabled: false },
        { name: '小红书', icon: '../../static/icon/xhs_round.png', enabled: false },
        { name: '微博', icon: '../../static/icon/weibo_round.png', enabled: false },
        { name: '抖音', icon: '../../static/icon/douyin_round.png', enabled: false }
      ]
    };
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    openSettings() {
      // 打开设置页面的逻辑
    },
    addLink() {
      // 跳转到添加链接页面逻辑
    },
    toggleSwitch(index) {
      this.$set(this.socialMediaList[index], 'enabled', !this.socialMediaList[index].enabled);
    }
  }
};
</script>

<style scoped>

.profileSettings {
  width: 100%;
  padding: 20rpx;
  box-sizing: border-box;
  background-color: #f5f5f5; /* 背景色 */
}

.content {
	padding: 5rpx; /* 增加内容的边距 */
}

.section {
  background-color: #ffffff;
  padding: 20rpx;
  margin: 20rpx 0; /* 增加上下间距 */
  border-radius: 30rpx;
  width: 100%; /* 增加宽度占比 */
  box-sizing: border-box; /* 确保宽度包括内边距 */
}

/* 个人信息部分 */
.profile-section {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.avatar {
  width: 80rpx; /* 调整宽度 */
  height: 80rpx; /* 调整高度 */
  border-radius: 50%;
}

.info {
  margin-left: 20rpx;
}

.name {
  font-size: 28rpx; /* 调整字体大小 */
  font-weight: bold;
}

.edit-bio-button {
  font-size: 24rpx;
  color: #888;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 20rpx; /* 靠右对齐 */
	margin-right: 20rpx;
}

.bio-input {
  width: 100%; /* 使用100%宽度 */
  padding: 20rpx;
  border: 1px solid #eaeaea;
  border-radius: 25rpx;
  font-size: 24rpx;
  margin-top: 10rpx;
  height: 100rpx; /* 增加高度 */
  box-sizing: border-box; /* 确保宽度包括内边距 */
}

/* 链接部分 */
.section-title {
  font-size: 28rpx;
  font-weight: bold;
	color: #404040;
  margin: 40rpx auto 50rpx 30rpx;
}

.link-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  border: 1px dashed #eaeaea;
  border-radius: 10rpx;
  margin-top: 20rpx;
}

.link-text {
  color: #888;
  font-size: 24rpx;
  margin: 10rpx 0; /* 上下间距 */
}

.add-link-button {
  background: none; /* 透明背景 */
  border: none; /* 无边框 */
  padding: 0; /* 无内边距 */
  width: 100rpx; /* 设置按钮宽度 */
  height: 100rpx; /* 设置按钮高度 */
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.add-link-icon {
  width: 100rpx; /* 图片宽度 */
  height: 100rpx; /* 图片高度 */
}

/* 社交媒体部分 */
.social-media-list {
  display: flex;
  flex-direction: column;
}

.social-media-item {
  display: flex;
  align-items: center;
  padding: 10rpx 10rpx; /* 增加高度 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 增加阴影 */
  cursor: pointer;
  border-radius: 20rpx; /* 圆弧状 */
	margin-top: 20rpx;
  margin-bottom: 5rpx;
  border-radius: 50px; /* 两端半圆形 */
}

.icon {
  width: 80rpx; /* 调整宽度 */
  height: 80rpx; /* 调整高度 */
  margin-right: 40rpx;
}

.social-media-name {
  flex: 1;
  font-size: 28rpx;
	font-weight: bold; /* 加粗 */
}

.hint {
  text-align: center;
  font-size: 24rpx;
  color: #888;
  margin-top: 20rpx;
  display: flex;
  justify-content: center; /* 居中 */
}

</style>
