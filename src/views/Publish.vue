<template>
  <div class="content">
    <main>
      <mu-select class="text" v-model="list" :labelFocusClass="['label-foucs']" label="选择板块">
        <mu-option v-for="(text,index) in lists" :key="text" :label="text" :value="index" ></mu-option>
      </mu-select>
      <!-- 邮件电话什么的要加入用户信息中，到时候拉取丢失物品时用，用getuser那种接口 -->
      <mu-select class="text" v-model="type" :labelFocusClass="['label-foucs']" label="物品种类">
        <mu-option v-for="(text,index) in types" :key="text" :label="text" :value="index" ></mu-option>
      </mu-select>
      <span v-if="type===0" class="text">
              <mu-text-field v-model="number" class="text" label="卡号" />
      </span>
      <span v-else-if="type!==0" class="text">
              <mu-text-field v-model="name" class="text" label="物品名" />
      </span>        
      <mu-text-field v-model="station" class="text" label="地点" />
      <mu-date-input class="text" container="dialog" v-model="time" label="选择日期和时间" type="dateTime" label-float full-width landscape/>
      <el-upload
        class="imguploadmod"
        :action="upload_url"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="handleUploadSuccess"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
        >
          <el-button size="medium" type="primary" color="primary" >点击上传图片</el-button>
          <div slot="tip" class="el-upload__tip">图片最多只能上传三张哦,每张限制3MB</div>
      </el-upload>
      <mu-button @click="pubTopic"  class="vueco-btn"  color="primary">
        <mu-icon  value="near_me"></mu-icon>
        发布
      </mu-button> 
    </main>
    <!--登录提示,等待token-->
    <!-- <mu-dialog :open="!accesstoken" title="提示："> -->
    <mu-dialog :open="publish" title="提示：">
      {{tips}}
      <mu-button flat slot="actions" primary @click="close"  >确定</mu-button>
    </mu-dialog>
    <mu-dialog :open="cardtip" title="提示：">
      {{tips_card}}
      <mu-button flat slot="actions" primary @click="close_card_tip"  >确定</mu-button>
    </mu-dialog>
    <mu-dialog :open="!cookie" title="提示：">
      请先登录
      <mu-button flat slot="actions" color="primary" to="/"  >取消</mu-button>
      <mu-button flat slot="actions" color="primary" to="/person"  >确定</mu-button>
    </mu-dialog>
    <mu-dialog :open="cardrec" title="提示：">
      {{tips_card_isSuccess}}
      <mu-button flat slot="actions" primary @click="close_card_tip_isSuccess"  >确定</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import marked from 'marked';
export default {
  data() {
    return {
      //上传图片的文件列表
      fileList: [],
      accesstoken: '',
      cookie:'',      
      list: 0,
      lists: ['失物招领', '寻物启事'],
      type: 0,
      types: ['校园卡','电子产品','运动装备','衣物服装','箱包水杯','学习资料','其他'],
      name: '',
      number: '',
      station: '',
      time: '',
      tab: '',
      type_upload:'',
      image_path: [],
      publish: false,
      cardtip: true,
      cardrec: false,
      upload_url: '/api/api/uploadcard',
      // 等待接入之后的详细信息描述
      content: '',
      tips: '请确认已登录且每个信息都已输入',
      tips_card: '当失物是校园卡的时候，可以试一试先直接上传校园卡图片哦，也许有黑科技能帮你填上卡号呢',
      tips_card_isSuccess:'识别成功啦'
    }
  },
  methods: {
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleUploadSuccess(res){
      if(this.type!=0){//非校园卡部分图像处理
        this.image_path.push(res[0]);
      }
      else{
        this.image_path.push(res.filename);
        if(res.success==true){//识别成功后将识别到的卡号赋值进去
          this.number=res.id;///还是res.da
        }
        else {
          this.tips_card_isSuccess='识别好像失败了，请手动输入卡号吧';
        }
        this.cardrec = true;
      }
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`,{center: true});
    },
    pubTopic() {
      if (this.list === 0) {
        this.tab = 'found'
      } else if (this.list === 1) {
        this.tab = 'lost'
      }
      if (this.type === 0) {
        this.name='校园卡'+'  '+this.number;
        this.type_upload = 'card';
      } else {
        this.type_upload = this.types[this.type];
      }
      //这里要根据types来改变发送的信息，用if判断
      if (this.station && this.time && this.cookie && (this.number||this.name) ) {
        let that = this
        let time_formated = new Date(that.time)
        // that.content = marked(that.content)
        this.axios.post('/api/api/add/'+that.tab, {
          name: that.name,
          number: that.number,
          station: that.station,
          time: time_formated,
          type: that.type_upload,
          //图片上传，等待写地址
          image_path: that.image_path
        }).then(function (res) {
          // that.content = ''
          that.tips = '发表成功！'
          that.publish = true
          setTimeout(function () {
            that.publish = false
          }, 1500)
        }).catch(function (err) {
          that.publish = true;
        })
      }else{
        this.publish = true;
      }
    },
    close() {
      this.publish = false;
    },
    close_card_tip() {
      this.cardtip = false;
    },
    close_card_tip_isSuccess() {
      this.cardrec =false ;
    }
  },
  created() {
    // this.accesstoken = localStorage.getItem("accesstoken");
    this.cookie = localStorage.getItem("cookie");
  },
  mounted() {
    this.$store.dispatch('changeTabValue', '发布');
  },
  //选择项目不是校园卡时将上传地址改成一般上传接口
  updated() {
    if(this.type!=0){
          this.upload_url =  '/api/api/upload';
        }
    else {
          this.upload_url = '/api/api/uploadcard';
    }
  }
}
</script>

<style scoped>
main {
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.text {
  width: 100%;
  margin: 0;
}

.imguploadmod{
  width:100%;
}
.text-content {
  flex: 1;
  background-color: #f7f7f7;
  padding: 1rem;
  overflow-y: auto;
}
</style>
