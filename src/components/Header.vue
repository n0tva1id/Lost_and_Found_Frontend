
<template>
  <div>
    <!-- 返回按钮按照地方判断一下 右侧筛选按照是否在主页内也要判断一下 -->
    <!-- 此处logo逻辑可能需要修改，图标暂时是vue，等待改bupt -->
    <mu-appbar class="title" color="primary" :title="title">
      <mu-button icon slot="left">
      <img class="logo" src="https://www.bupt.edu.cn/upload/image/201410/%E5%8C%97%E9%82%AE%20logo%20%E8%93%9D.png">
      </mu-button>
      <mu-menu v-if="isHome" slot="right" :open.sync="open">
        <mu-button icon>
          <mu-icon value="keyboard_arrow_down"></mu-icon>
        </mu-button>
        <mu-list slot="content" :value="Type" @change="handleTypeChange">
        <mu-list-item button v-for="type in types" :key="type" :value="type" color="secondary">
        <mu-list-item-content >
          <div v-if="type!='card'">
          <mu-list-item-title>{{type}}</mu-list-item-title>
          </div>
          <div v-else>
          <mu-list-item-title>校园卡</mu-list-item-title>
          </div>
        </mu-list-item-content>
        </mu-list-item>
        </mu-list>
      </mu-menu>
      <mu-button v-else slot="right" icon>
      </mu-button>
    </mu-appbar>
    
  </div>
</template>

<script>
// import Home from '../views/Home.vue'
import Utils from '../utils.js'
export default {
  data() {
    return {
      open : false,
      Type: '全部',
      types: ['全部','card','电子产品','运动装备','衣物服装','箱包水杯','学习资料','其他'],
    }
  },
  computed: {
    title: function () {
      if (this.$route.path.indexOf('/user/') == -1) {
        return this.$store.state.titleMap.get(this.$route.path);
      } else {
        return this.$store.state.titleMap.get('/user');
      }
    },
    isTopic: function () {
      return this.$route.path == '/content'
    },
    isHome: function () {
      return this.$route.path == '/'
    }
  },
  methods: {
    changeTheme(theme) {
      this.theme = theme
      const styleEl = this.getThemeStyle()
      styleEl.innerHTML = this.themes[theme] || ''
    },
    getThemeStyle() {
      const themeId = 'muse-theme'
      let styleEl = document.getElementById(themeId)
      if (styleEl) return styleEl
      styleEl = document.createElement('style')
      styleEl.id = themeId
      document.body.appendChild(styleEl)
      return styleEl
    },
    goBack() {
      if (this.isTopic)
        this.$router.go(-1)
    },
    handleTypeChange(type) {
      this.open = !this.open; //切换菜单显示
      this.Type = type;
      this.$store.dispatch('changeTypeValue', type);
      Utils.$emit('getThings','msg');
      console.log(type);
    },
  },
}
</script>

<style scoped>
.menu{
  height:4rem;
}

.title {
  text-align: center;
  height: 3.15rem;
}

.mu-button {
  padding: 0.4rem;
}
</style>
