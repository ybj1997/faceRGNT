<template>
  <div>
    <div class="header">
      <img src="../../../static/images/future.png" alt="loginimg" id="loginImg" />
      <div class="header-title" >登录</div>
      <div class="header-text">Made by Group 21</div>
    </div>
    <div class="body">
      <!-- <div class="inputItem"> -->
        <!-- <van-field
          placeholder="请输入用户名"
          custom-style="background-color:#fff"
          :value="inputUsername"
          @change="onUsernameChange"
        />
      </div>
      <div class="inputItem">
        <van-field
          placeholder="请输入密码"
          password=true
          :value="inputPassword"
          @change="onPasswordChange"
        />
      </div> -->
      <!-- <div class="body-bottom" @click="zhuce">
        <span class="item">不准忘记密码</span>
        <van-toast id="van-toast" />
      </div> -->
      <div class="loginButton">
        <van-button slot="button" block color="#20c3af" @click="onClick" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
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
    console.log(e)
  },
  auth(info){
    console.log(info);
  },
    onUsernameChange(e) {
      var _this = this;
      _this.$set(_this, "inputUsername", e.mp.detail);
      console.log("username:", _this.inputUsername);
    },
    onPasswordChange(e) {
      var _this = this;
      _this.$set(_this, "inputPassword", e.mp.detail);
      console.log("password:", _this.inputPassword);
    },
    onClick(e) {
      var _this = this;
      console.log("登陆");
      if(_this.defaultAdimin.name === _this.inputUsername && _this.defaultAdimin.password === _this.inputPassword) {
        Toast.success('登录成功');
        setTimeout(()=>{
          wx.switchTab({
            url:'/pages/index/main'
          })
        },500)
      }else{
        Toast.fail('输入错误');
      }
    },
    zhuce(e){
      var _this = this;
      Toast.fail('不准点(ﾟДﾟ*)ﾉ')
    }
  },
};
</script>

<style lang="less">
.header {
  background: #20c3af;
  padding: 25px 20px;
  line-height: 50px;
  color: white;
  .header-title {
    font-size: 30px;
  }
  #loginImg {
    display: inline-block;
    width: 250px;
    height: 250px;
    margin-left:40px;
  }
}
.body {
  width: 315px;
  margin: 40px auto 0;
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
