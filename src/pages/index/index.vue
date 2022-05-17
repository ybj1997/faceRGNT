<template>
  <div style="positon: relative">
    <van-nav-bar id="navbar" right-text="退出" @click="onClickRight" />
    <div class="container">
      <div class="body">
        <ul>
          <li class="temperature list-card1">
            <img src="../../../static/images/wendu.png" class="data-img" />
            <div>
              <div class=" title">温度</div>
              <div class=" data">{{ temperature }}</div>
            </div>
          </li>
          <li class=" list-card1">
            <img
              src="../../../static/images/Humity.png"
              class="data-img hum-img"
            />
            <div>
              <div class="humidity-title title">湿度</div>
              <div class="humidity-data data">{{ humidity }}</div>
            </div>
          </li>
          <van-toast id="van-toast" />
          <li class="list-card">
            <div class="alertor">
              <img
                src="../../../static/images/clock.png"
                class="data-img"
                id="ring"
              />
              <div class="button">
                <div class="title">门禁开关</div>
                <van-button
                  class="openButton"
                  color="#1296db"
                  round
                  large
                  @click="openDoor"
                >
                  开门
                </van-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import mqtt from "../../../node_modules/mqtt/dist/mqtt.js";
import Toast from "vant-weapp/dist/toast/toast";
let timer;
const mqttURL = "wxs://broker-cn.emqx.io:8084/mqtt";
export default {
  data() {
    return {
      ImgPath: "",
      clients: {},
      humidity: 0,
      temperature: 0,
      BEEP: false,
    };
  },

  methods: {
    //节流函数
    debounce(fn, delay) {
      let timer;
      return function () {
        let _this = this;
        let args = arguments;
        timer = setTimeout(() => {
          fn.call(_this, args);
        }, delay);
      };
    },
    openDoor: function (e) {
      let that = this;
      Toast.success("开启门禁");
      const fn = () => {
        that.clients.publish("Test", "智能门禁系统测试数据", function (err) {
          if (!err) {
            console.log("开启门禁");
          }
        });
        return true;
      };
      //节流函数
      if (!timer) {
        timer = fn();
        setTimeout(() => {
          timer = null;
        }, 5000);
      } else {
        Toast.fail("正在开门");
      }
    },
    onClickRight() {
      console.log("退出登录");
      try {
        wx.redirectTo({
          url: "/pages/auth/main",
        });
      } catch (e) {
        Toast.fail(e);
      }
    },
  },

  onLoad() {
    console.log("开始加载");
    var that = this;
    that.clients = mqtt.connect(mqttURL);
    that.clients
      .on("connect", function (err) {
        console.log("成功连接mqtt服务器");
      })
      .subscribe("raspberry/topic789", function (err) {
        if (!err) {
          console.log("订阅成功");
        }
      })
      .on("message", function (topic, massage) {
        let parseData = JSON.parse(massage);
        that.temperature = parseData.Temperature ? parseData.Temperature : "加载中...";
        that.humidity = parseData.Humidity ? parseData.Humidity : "加载中...";
      });
  },

  onUnload() {
    that.clients = {};
  },
};
</script>

<style lang='less'scoped>
.container {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  .body {
    width: 90%;
    margin: 0;
    padding: 0;
    list-style: none;
    ul {
      display: flex;
      flex-wrap: wrap;
      .list-card {
        width: 100%;
        margin: 15px 0;
        border: 1px solid #fff;
        border-radius: 15px;
        box-shadow: 0px 0px 5px rgb(167, 164, 164);
        height: 80px;
        .alertor {
          display: flex;
          justify-content: space-around;
          align-items: center;
          .data-img {
            width: 50px;
            height: 50px;
          }
          div {
            margin-top: -10px;
            margin-left: 15px;
            height: 30px;
            .title {
              text-align: right;
              font-size: 20px;
              color: rgb(173, 173, 173);
            }
            .data {
              font-size: 30px;
            }
            .openButton {
              transform: translateX(100%);
              margin-left: 20px;
            }
          }
        }
      }
      .list-card1 {
        width: 100%;
        display: flex;
        height: 80px;
        margin-top: 20px;
        border: 1px solid #fff;
        border-radius: 15px;
        box-shadow: 0px 0px 5px rgb(167, 164, 164);
        justify-content: space-around;
        align-items: center;
        .data-img {
          width: 50px;
          height: 50px;
        }
        div {
          .title {
            text-align: right;
            color: rgb(173, 173, 173);
          }
          .data {
            font-size: 30px;
          }
        }
        .hum-img {
          width: 60px;
          height: 60px;
        }
        .light-img {
          margin-left: 15px;
        }
      }
    }
  }
  #ring {
    width: 50px;
    height: 50px;
    margin-top: 15px;
    transform: translateX(15px);
  }
}
#navbar {
  position: relative;
  top: -45px;
}
</style>
