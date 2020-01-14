<template>
  <!-- <mu-paper class="bottom_nav1"> -->
    <mu-bottom-nav :value="bottomNav" :shift="false" @change="handleChange" >
      <mu-bottom-nav-item to="/" value="首页" title="首页" icon="home"/>
      <mu-bottom-nav-item to="/publish" value="发布" title="发布" icon="search"/>
      <!-- <mu-bottom-nav-item to="/messages" value="消息" title="消息" icon="message"/> -->
      <mu-bottom-nav-item to="/person" value="我的" title="我的" icon="person"/>
    </mu-bottom-nav>
  <!-- </mu-paper> -->
</template>

<script>  
  export default {
    data () {
      return {}
    },
    computed: {
      bottomNav(){
        //vuex中组件状态管理，全局都是这个值
        return this.$store.state.tabValue;
      }
    },
    methods: {
      handleChange (val) {
        this.$store.dispatch('changeTabValue', val);
      }
    }
  }
</script>

<style>
</style>
