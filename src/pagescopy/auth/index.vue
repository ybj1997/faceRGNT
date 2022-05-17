<template>
  <div>
    <div class="header">
      <!-- <img src="../../../static/images/future.png" alt="loginimg" id="loginImg" /> -->
      <div class="header-title" >FaceToFace</div>
    </div>
    <div class="body">
      <div class="loginButton">
        <van-button 
        slot="button" 
        round 
        size="large" 
        color="#0188fb" 
        @click="onClick" 
        open-type="getPhoneNumber" 
        @getphonenumber="getPhoneNumber">
          登陆
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Toast from 'vant-weapp/dist/toast/toast';
export default {
  data() {
    return {
      defaultAdimin:{name: "admin",password:"public"},
      inputUsername: "",
      inputPassword: "",
    };
  },

  methods: {
    getPhoneNumber (e) {
      if(e.target.code){
        Toast.success('登录成功');
        wx.switchTab({
            url:'/pages/index/main'
          })
      }else{
        Toast.fail(e.target.errMsg);
      }
    console.log(e.target)
  }
  }
}
</script>

<style lang="less">
.header {
  background: #0188fb;//#0188fb
  padding: 25px 20px;
  line-height: 50px;
  color: white;
  height: 5rem;
  .header-title {
    font-size: 30px;
    text-align: center;
    margin: 50px auto;
  }
}
.body {
  width: 315px;
  margin: 3rem auto 0;
  .inputItem {
    margin-bottom: 25px;
  }
  .body-bottom {
    text-align: right;
    color: #838391;
  }
  .loginButton {
    margin-top: 30px;
    font-size: 8px !important;
  }
}
.producer {
  text-align: center;
}
</style>
