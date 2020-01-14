<template>
<!-- 从别的view回来之后的登录管理，cookie引入 -->
  <div class="content">
    <main v-if="isLogin">
      <!-- 个人信息 -->
      <!-- 头像接口待引入 -->
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkEDlCznioBeifzvm3oWlHyQ-EQR0LzlVzisB7JSvwCQDd7xIu">
      <span class="name">{{userid}}</span>
      <section class="info_list">
      <mu-list toggle-nested >
      <mu-list-item button  nested :open="false" toggle-nested>
      <mu-list-item-action>
        <mu-icon value="send"></mu-icon>
      </mu-list-item-action>
      <mu-list-item-title>失物</mu-list-item-title>
      <mu-list-item-action>
        <span>
          <span v-show="user_info.found!=0" class="counter">&nbsp;{{user_info.found}}&nbsp;</span>  
        </span>
        <mu-icon v-show="user_info.found!=0" class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
      </mu-list-item-action>
      <mu-list-item button slot="nested" v-for="thing in thing_found" :key="thing.id" :to="{name:'Content',query:{ID:thing.ID},params:{ 
            Tab: 'lost',
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
        <mu-list-item-title>{{thing.name}}</mu-list-item-title>
      </mu-list-item>
      </mu-list-item>
      <mu-list-item button  nested :open="false" toggle-nested>
      <mu-list-item-action>
        <mu-icon value="drafts"></mu-icon>
      </mu-list-item-action>
      <mu-list-item-title>寻物</mu-list-item-title>
      <mu-list-item-action>
        <span>
          <span v-show="user_info.lost!=0" class="counter">&nbsp;{{user_info.lost}}&nbsp;</span>  
        </span>
        <mu-icon v-show="user_info.lost!=0" class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
      </mu-list-item-action>
      <mu-list-item button slot="nested" v-for="thing in thing_lost" :key="thing.id" :to="{name:'Content',query:{ID:thing.ID},params:{ 
            Tab: 'find',
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
        <mu-list-item-title>{{thing.name}}</mu-list-item-title>
      </mu-list-item>
      </mu-list-item>
      <mu-list-item button  nested :open="false" toggle-nested>
      <mu-list-item-action>
        <mu-icon value="inbox"></mu-icon>
      </mu-list-item-action>
      <mu-list-item-title>已找到的失物</mu-list-item-title>
      <mu-list-item-action>
        <span>
          <span v-show="user_info.endFound!=0" class="counter">&nbsp;{{user_info.endFound}}&nbsp;</span>  
        </span>
        <mu-icon v-show="user_info.endFound!=0" class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
      </mu-list-item-action>
      <mu-list-item button slot="nested" v-for="thing in end_found" :key="thing.id" :to="{name:'Content',query:{ID:thing.ID},params:{ 
            Tab: 'lost',
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
            is_finished: true,//前端直接改完成状态
            image_path: thing.image_path}}">
        <mu-list-item-title>{{thing.name}}</mu-list-item-title>
      </mu-list-item>
      </mu-list-item>

      <mu-list-item button  nested :open="false" toggle-nested>
      <mu-list-item-action>
        <mu-icon value="grade"></mu-icon>
      </mu-list-item-action>
      <mu-list-item-title>已找到的寻物</mu-list-item-title>
      <mu-list-item-action>
        <span v-show="user_info.endLost!=0">
          <span class="counter">&nbsp;{{user_info.endLost}}&nbsp;</span>  
        </span>
        <mu-icon v-show="user_info.endLost!=0" class="toggle-icon" size="24" value="keyboard_arrow_down"></mu-icon>
      </mu-list-item-action>
      <mu-list-item button slot="nested" v-for="thing in end_lost" :key="thing.id" :to="{name:'Content',query:{ID:thing.ID},params:{ 
            Tab: 'find',
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
            is_finished: true,//前端直接改完成状态
            image_path: thing.image_path}}">
        <mu-list-item-title>{{thing.name}}</mu-list-item-title>
      </mu-list-item>
      </mu-list-item>
      </mu-list>
      </section>
      <!-- 退出登录按钮 -->
      <mu-button @click="logout"  class="vueco-btn"  color="primary">
       <mu-icon  value="power_settings_new"></mu-icon>
       退出登录
      </mu-button> 
    </main>
    <!-- 未登录时的登录界面 -->
    <main v-else>
      <mu-text-field v-model="username" label="用户名" :errorText="error" labelFloat icon="account_circle"/>
      <mu-text-field v-model="password" type="password" label="密码" :errorText="error" labelFloat icon="locked"/>
      <mu-button @click="login"  class="vueco-btn"  color="primary">
       登录
      </mu-button> 
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //用户id作为1，测试用
        userid:'1',
        username: '',
        password: '',
        userToken: '',
        error: '',
        user: {},
        user_info: {},
        isLogin: true,
        lost:0,
        find:0,
        open: 'send',
        things: null,
        type:'end',
        end_found:{},//用户找到的 已找到失主的物品
        end_lost:{},//获得用户已找到的丢失物品
        thing_found:{},//获得用户找到的物品
        thing_lost:{}//获得用户丢失的物品
      }
    },
    computed: {},
    methods: {
      login() {
        // if (this.userToken.length == 36) {
          this.error = '';
          const self = this;
          //等待接入易班接口
          let url = '/api/api/user/fakelogin' + '?userid=' + this.userid;
          this.axios.post(url).then(function (res) {
          // this.axios.post(url, { accesstoken: self.userToken }).then(function (res) {
            // 200:OK,请求已成功
            if (res.status == 200) {
            // if (res.status == 200 && res.data.success) {
              self.error = '';
              console.log(res);
              // localStorage.setItem("accesstoken", self.userToken);
              // localStorage.setItem('userid', res.data.UserID);
              localStorage.setItem("accesstoken", res.data.AccessToken);
              localStorage.setItem("cookie", res.headers['set-cookie']);
              self.isLogin = true;
              self.getUserInfo();
            } else {
              // self.error = '请输入正确的Access Token'
            }
          }).catch(function (err) {
            console.log(err);
            // this.error = '请输入正确的Access Token'
          })
        // } else {
        //   this.error = '请输入正确的Access Token'
        // }
      },
      getUserInfo(){
        const self = this;
        // let url = this.$store.state.svrUrl + '/user/' + localStorage.getItem("loginname");
        let url = '/api/api/all/' + this.userid ;
        this.axios.get(url).then(function (res) {
          if (res.status == 200) {
            self.user_info = res.data;
            this.lost=this.user_info.lost;
            console.log(res);
          } else {
            console.log(res.status)
          }
        }).catch(function (err) {
          console.log(err)
        });
      },
      get(Type){
        const self = this;
        let type;
        switch (Type){
          case 'EndFound': 
            type='end/found/';
            break;
          case 'EndLost':
            type='end/lost/';
            break;
          case 'ThingLost':
            type='thing/lost/';
            break;
          case 'ThingFound':
            type='thing/found/';
            break;
        }
        let url = '/api/api/' + type + this.userid + '/1/99';//暂时只加载99个
        this.axios.get(url).then(function (res) {
          if (res.status == 200) {
            switch (Type){
              case 'EndFound': 
                self.end_found = res.data;
                console.log(1);
                break;
              case 'EndLost':
                self.end_lost = res.data;
                console.log(2);
                break;
              case 'ThingLost':
                self.thing_lost = res.data;
                console.log(3);
                break;
              case 'ThingFound':
                self.thing_found = res.data;
                console.log(4);
                break;
            }
            
        // console.log(this.end_lost);
        // console.log(this.thing_found);
        // console.log(this.thing_lost);
          } else {
            console.log(res.status)
          }
        }).catch(function (err) {
          console.log(err)
        });
      },
      logout(){
        localStorage.setItem('accesstoken', '')
        localStorage.setItem('user_id', '')
        localStorage.setItem('loginname', '')
        localStorage.setItem('cookie', '')
        this.isLogin = false;
      }
    },
    created(){
      // this.userid=localStorage.getItem("userid")
      this.login();
      this.$nextTick(function(){
      this.$store.dispatch('changeTabValue', '我的');
      this.userToken = localStorage.getItem("accesstoken")
      // this.isLogin = localStorage.getItem("cookie").length != 0;
      // if (this.isLogin){
      //进入之后直接加载 不判断是否已经登录
        this.getUserInfo();
        this.get('EndFound');
        this.get('EndLost');
        this.get('ThingFound');
        this.get('ThingLost');
        // setTimeout(function(){
        // console.log(this.end_found);
        // console.log(this.end_lost);
        // console.log(this.thing_found);
        // console.log(this.thing_lost);
        // },3000);
        
      })
    }
  }
</script>

<style scoped>
  .name {
    color: #009688;
    font-weight: 700;
    font-size: 24px;
  }

  .timer {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 1rem 0;
  }

  main {
    background-color: #f8f8f8;
  }

  main > img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    margin: 1rem 0;
  }
  
  .info_list {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    margin-bottom: 1rem;
    border-top: 1px solid #009688;
  }

  .icon {
    color: #009688;
  }

  .count {
    background-color: #009688;
    color: #fff;
    padding: 0.1rem 0.6rem;
    border-radius: 0.2rem;
    margin-top: 2rem;
  }
  .counter {
  background-color: #009688;
  color: #fff;
  padding: 0.2rem;
  border-radius: 0.3rem;
  font-size: 12px;
}
</style>
