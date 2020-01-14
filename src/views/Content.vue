
//图片背景 排版
<template>
  <div class="content">
    <!--标题区-->
    <header class="md_header">
      <h1>
        <span class="tag-lost" v-if="Tab==='lost'">寻物</span>
        <span class="tag-find" v-else-if="Tab==='find'">失物</span>
        {{name}}
      </h1>
      <div class="label">
        <span>发布于 {{CreatedAt | time_ago}}</span>
        <span>地点 {{station}}</span>
        <span>类别 {{type}} </span>
        <!-- <span>来自 {{data.tab | tab}}</span> -->
      </div>
    </header>
    <!-- 内容区 -->
    <!-- <article class="md_content" v-html="data.content"></article> -->
    <div class="img">
      <!-- <div v-for="(Image_path,index) in image_path" :key="Image_path">
        <mu-container>
        <mu-paper :z-depth="5">
          <router-link target="_blank" :to="'/api/api/download/'+Image_path">
          <img v-preview :src="'/api/api/download/'+Image_path"/>
          </router-link>
        </mu-paper>
        <br>
        </mu-container>
      </div> -->
      <img v-for="img in image_path"  :src="'/api/api/download/'+img" :key="img">
      <mu-button @click="enditem"  class="vueco-btn"  color="red" v-if="!is_finished">
        <mu-icon  value="near_me"></mu-icon>
        找到啦！
      </mu-button> 
    </div>
    <!-- 提示框 -->
    <mu-dialog :open="showReplyDialog" title="提示：" @close="close">
      {{tips}}
      <mu-flat-button slot="actions" @click="close" primary label="确定" />
    </mu-dialog>
    <mu-dialog :open="end" title="提示：">
      {{tips}}
      <mu-button flat slot="actions" primary @click="end_close"  >确定</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //要获取当前用户的id
      enduserID:1,
      //待改
      Tab: '',
      ID: '',
      CreatedAt: '',
      UpdatedAt: '',
      DeletedAt: '',
      name: '',
      station: '',
      time: '',
      type: '',
      number: '',
      found_user_id: '',
      lost_user_id: '',
      is_finished: false,
      image_path: '',
      accesstoken: '',
      data: {
        author: {},
        replies: {}
      },
      favorite: false,
      single_reply: '',
      reply: '',
      tips: '失败了，再试试吧',
      showReplyDialog: false,
      end:false,
    }
  },
  computed: {
    favorite_txt: function () {
      return this.favorite ? '取消收藏' : '收藏';
    },
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    enditem() {
        let that = this;
        this.axios.post("/api/api/end", {
          itemID: this.ID,
          userID: this.enduserID,
        }).then(function (res) {
          that.tips = '成功啦';
          that.end = true;
          setTimeout(function () {
            that.end = false;
            that.goBack();
          }, 1500);
        }).catch(function (err) {
          that.end = true;
        })
    },
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.showReplyDialog = false;
    },
    end_close () {
      this.end = false;
    },
  },
  created() {
    this.accesstoken = localStorage.getItem("accesstoken");
    this.loginname = localStorage.getItem("loginname");
    this.Tab = this.$route.params.Tab;
    this.ID = this.$route.params.ID;
    this.CreatedAt = this.$route.params.CreatedAt;
    this.UpdatedAt = this.$route.params.UpdatedAt;
    this.DeletedAt =  this.$route.params.DeletedAt;
    this.name = this.$route.params.name;
    this.station = this.$route.params.station;
    this.time = this.$route.params.time;
    this.type = this.$route.params.type;
    this.number = this.$route.params.number;
    this.found_user_id = this.$route.params.found_user_id;
    this.lost_user_id = this.$route.params.lost_user_id;
    this.is_finished = this.$route.params.is_finished;
    this.image_path = this.$route.params.image_path;
    // this.getTopic();
  }
}
</script>

<style>
.favorite-box .mu-checkbox-label {
  color: #009688;
}
</style>

<style scoped>
.img {
  padding: 1rem;
  border-top: 1px solid #e5e5e5;
  margin-bottom: 2rem;
}

.content {
  justify-content: flex-start;
}

.title {
  height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.md_header {
  padding: 1rem;
}

.md_header h1 {
  font-size: 20px;
  font-weight: 600;
}

.md_header .label span:before {
  content: "•";
  padding: 0 0.5rem;
}

.md_header .label span {
  font-size: 12px;
  color: #838383;
  font-weight: 400;
  padding: 0 0.2rem;
}

.tag-lost {
  background-color: #009688;
  color: #fff;
  padding: 0.1rem 0.3rem;
  border-radius: 0.2rem;
}

.tag-find {
  background-color: #ff8c00;
  color: #fff;
  padding: 0.1rem 0.3rem;
  border-radius: 0.2rem;
}


.favorite-box {
  font-size: 20px;
  font-weight: 700;
}

.md_content {
  padding: 1rem;
  border-top: 1px solid #e5e5e5;
  margin-bottom: 2rem;
}

.md_content h1,
.md_content h2,
.md_content h3,
.md_content h4,
.md_content h5,
.md_content h6 {
  font-weight: 700;
}

.md_content p {
  font-size: 15px;
  line-height: 1.7em;
  overflow: auto;
}

.md_content h2 {
  font-size: 26px;
  margin: 30px 0 15px;
  border-bottom: 1px solid #eee;
}

.md_content h3 {
  margin: 30px 0 15px;
  border-bottom: 1px solid #eee;
  font-size: 24.5px;
}

.md_content pre {
  font-family: Monaco, Menlo, Consolas, "Courier New", monospace;
  font-size: 14px;
  border-radius: 0;
  padding: 1rem;
  border: 0;
  margin: 1rem 0;
  border-width: 1px 0;
  background: #f7f7f7;
}

.md_content ul {
  list-style-type: disc;
  margin: 0 0 1rem 2rem;
}

.md_content ol {
  list-style: decimal;
  margin-left: 2em;
}

.md_content li {
  line-height: 2.5rem;
}

.md_content a {
  display: block;
}

.md_content img {
  height: auto;
  max-width: 100%;
  vertical-align: middle;
  border: 0;
}
</style>
