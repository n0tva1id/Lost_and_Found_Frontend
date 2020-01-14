<template>
  <div class="content" style="height: 100vh;">
    <mu-snackbar :position="normal.position" :open.sync="toast">
      {{toastMsg}}
      <mu-button flat slot="action" color="secondary" @click="normal.open = false">关闭</mu-button>
    </mu-snackbar>
    <mu-tabs  :value="activeTab" full-width @change="handleTabChange">
      <mu-tab value="found">失物招领</mu-tab>
      <mu-tab value="lost">寻物启事</mu-tab>
    </mu-tabs>
    <mu-container ref="container" class="thing_list">
    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="loadMore">
      <mu-list textline="two-line" >
        <!-- 是否需要让后端加一个每个东西的id号 方便具体定位？或者直接把那个传进去？ -->
        <div v-if="things">
        <div v-for="thing in things" :key="thing.ID">
          <!-- routerlink将params传入，似乎要用name不能用path 否则参数过不去...name可以在路由的那个js里看，大小写别弄错了 -->
          <mu-list-item avatar button :to="{name:'Content',query:{ID:thing.ID},params:{ 
            Tab: activeTab,
            ID: thing.ID,
            CreatedAt: thing.CreatedAt,
            UpdatedAt: thing.UpdatedAt,
            DeletedAt: thing.DeletedAt,
            name: thing.name,
            station: thing.station,
            time: thing.time,
            type: thing.type,
            number: thing.number,
            found_user_id: thing.found_user_id,
            lost_user_id: thing.lost_user_id,
            is_finished: thing.is_finished,
            image_path: thing.image_path}}">
            <mu-list-item-action >
              <div class="thumbnail">
                <div v-if="thing.image_path[0]!=undefined">       
                  <img :src="'/api/api/thumbnail/'+thing.image_path[0]">
                </div>
                <div v-else>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEDlCznioBeifzvm3oWlHyQ-EQR0LzlVzisB7JSvwCQDd7xIu">
                </div>
              </div>
                <!-- <mu-list-item-after-text>2 hr</mu-list-item-after-text>
                <mu-checkbox color="yellow700" v-model="selects" value="value2"  uncheck-icon="star_border" checked-icon="star"></mu-checkbox> -->
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title class="topic-content">
                {{thing.name}}
              </mu-list-item-title>
              <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)">
                  <!-- 占位置 -->
                  &nbsp;
              </mu-list-item-sub-title>
              <mu-list-item-sub-title>
                <!-- <span>{{thing.CreatedAt | time_ago}}</span> -->
                <i class="material-icons" style="font-size:13px;">location_on</i>&nbsp; {{thing.station}}&nbsp;&nbsp;/&nbsp;&nbsp;
                <i class="material-icons" style="font-size:13px;">subject</i>&nbsp; {{thing.type}}
              </mu-list-item-sub-title>
              </mu-list-item-content>
              <!-- 后置内容 -->
              <mu-list-item-action >
                <span v-if="activeTab==='lost'">
                  <span class="lost-thing">#寻物</span>  
                </span>
                <span v-else-if="activeTab==='found'">
                  <span class="find-thing">#失物</span>
                </span>
                <span>{{thing.time | time_ago}}</span>
              </mu-list-item-action>
          </mu-list-item>
          <mu-divider />
        </div>
        </div>
      </mu-list>
    </mu-load-more>
  </mu-container>
  </div>
</template>

<script>
import Utils from '../utils.js'
export default {
  data() {
    return {
      normal: {
        position: 'bottom',
        open: false,
        timeout: 2000
      },
      activeTab: 'found',
      page: 1,
      toastMsg: '',
      toast: false,
      things: null,
      scroller: null,
      loading: false,
      refreshing: false,
      num: 8,
      text: 'List',
    }
  },
  computed: {
  now: function () {
    return Date.now()
    }
  },
  methods: {
    image_path_full(val) {
      return "/api/api/thumbnail/" + val
    },
    refresh () {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      this.getThings();
      // 手动延时（滑稽）等待修改
      setTimeout(() => {
        this.refreshing = false;
      }, 100)
    },
    load () {
      this.loading = true;
      // 手动延时（滑稽）等待修改
      setTimeout(() => {
        this.loading = false;
      }, 100)
    },
    //换tab，可以考虑改写成下拉列表成为分类筛选。或者直接只分一个校园卡快捷通道然后直接分，考虑
    handleTabChange(val) {
      this.loading = false;
      this.activeTab = val;
      this.getThings();
    },
    checkStatus() {
      //确认登录的url
      let url='/api/api';
      this.axios.get(url).then(function (res){
        if (res.status == 302) {//如果返回了302重定向
          //页面跳转逻辑等待实现。
        }
        
      })
    },
    getThings() {
      this.page = 1;  
      let type= this.$store.state.TypeValue;
      if (type=='全部'){
          type='';
      }
      let url = '/api/api/search/' + this.page + '/8' +'?lost_or_find=' + this.activeTab + '&type=' + type;
      const self = this;
      self.refreshing = true;
      this.axios.get(url).then(function (res) {
        if (res.status == 200 && res.data != "") {//如果返回status为200ok
          // self.things = [];//清空一次
          // self.activeTab = val;
          self.things = res.data;//把返回的json赋值给things类。
          console.log("getThings");
          console.log(res.data);
        } else if(res.data =="") {
          self.things = [];//清空一次
          self.showToast('没有更多了');
        }
        else{
          self.showToast('获取数据失败，请稍后重试');
        }
        self.refreshing = false;
      }).catch(function (err) {
        console.log(err);
        self.refreshing = false;
      })
    },
    loadMore() {
      this.page++;//页数+1
      let type= this.$store.state.TypeValue;
      if (type=='全部'){
          type='';
      }
      let url = '/api/api/search/' + this.page + '/8' +'?lost_or_find='+ this.activeTab+'&type=' + type;
      const self = this;
      self.loading = true;
      this.axios.get(url).then(function (res) {
        if (res.status == 200 && res.data!="") {//空的时候的判定
          self.things = self.things.concat(res.data);
        } else if(res.data==""){//错误处理，拉不到新的记得把page减下去
          self.showToast('没有更多了');
          self.page--
        } else {
          self.showToast('获取数据失败，请稍后重试');
          self.page--
        }
        self.loading = false;
      }).catch(function (err) {//意外情况处理
        self.loading = false;
        console.log(err);
        self.page--
      })
    },
    showToast(msg) {
      this.toastMsg = msg
      this.toast = true
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => {
        this.toast = false
      }, 2000)
    },
    hideToast() {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    toUser(val) {//去个人页面，val传参,等待更改
      this.$router.push('/user/' + val);
    }
  },
  mounted: function () {
    this.$store.dispatch('changeTabValue', '首页');
    this.scroller = this.$el;
    // this.getThings('all');
    //getthings逻辑需要修改，先向后端请求一下登录接口，如果返回302就需要跳转去相应的url。
    var that = this;
    Utils.$on('getThings', function (msg) {
        console.log(msg);
        that.getThings();
      });
    this.getThings();
  }
}


</script>

<style  scoped>
.demo-text {
  padding: 16px;
  background: #fff;
  margin: 8px 0;
}
.demo-loadmore-wrap {
  width: 100%;
  /* max-width: 360px; */
  height: 420px;
  display: flex;
  flex-direction: column;
  /* .mu-appbar {
    width: 100%;
  } */
}
.thing_list {
  /* position: relative;
  height: 1000px; */
  width: 100%;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
  
a {
  color: black;
}

.tab-content {
  padding-top: 48px;
}

.thing-content {
  margin-top: 3px;
  margin-bottom: -8px;
  display: flex;
  justify-content: space-between
}

.lost-thing {
  background-color: #009688;
  color: #fff;
  padding: 0.2rem;
  border-radius: .1rem;
  font-size: 11px;
}

.find-thing {
  background-color: #ff8c00;
  color: white;
  padding: 0.2rem;
  border-radius: .1rem;
  font-size: 11px;
}

.mu-item-title {
  font-weight: bold;
}

.thumbnail{
  width: 3rem;
  height: 3rem;
  vertical-align: top;
}

/* .tab{
  position: fixed;
} */
</style>
