<template>
<div class='container'>
    <div class="header">
      <div class="weather-top">
        <div class="weather-wind">
          空气质量-
          <span id='wind-class'>{{HeaderData.airText}}</span>
        </div>
        <span class="weather-city">重庆 南岸区</span>
        <img src="../../../static/images/Position.png" alt="定位" class="dingwei">
      </div>
      <div class="weather-middle">
        <div class="air-class">
          <span id="air-class-num">{{HeaderData.air}}</span>
        </div>
        <div class="weather-msg">
          <!-- <img src="../../../static/images/duoyun.png" alt="QWeather" class="weather-img"> -->
          <span class="weather-num">{{HeaderData.weather}}</span>
        </div>
      </div>
      <div class="weather-bottom">
        健康小卫士:
        <span>
          {{HeaderData.Advice}}
        </span>
      </div>
    </div>
    <div class="body">
      <ul>
        <li class="temperature list-card1" style="margin:10px 15px 10px 0">
          <img src="../../../static/images/Temp.png" alt="温度" class="data-img">
          <div>
            <div class="msg-temperature-title title">温度</div>
            <div class="msg-temperature-data data">{{temperature}}℃</div>
          </div>
        </li>
        <li class="humidity list-card1" style="margin:10px 0 10px 15px">
          <img src="../../../static/images/Humity.png" alt="湿度" class="data-img hum-img">
          <div>
            <div class="humidity-title title">湿度</div>
            <div class="humidity-data data">{{humidity}}%</div>
          </div>
        </li>
        <li class="light-intensity list-card1" style="margin:10px 15px 10px 0" >
          <img src="../../../static/images/Light.png" atl="光照强度" class="data-img" id="light">
          <div>
            <div class="ligntintensity-title title">光照度</div>
            <div class="ligntintensity-data data">{{lightpower}}Lx</div>
          </div>
        </li>
        <li class="light-switch list-card1" style="margin:10px 0 10px 15px">
          <img src="../../../static/images/LEDlight.png" alt="灯" class="data-img">
          <div>
            <div class="lightswitch-title title">客厅灯</div>
            <switch class="ligntswitch-data" :checked="LED" @change="onLEDchange"/>
          </div>
        </li>
        <li class="lertor list-card">
          <div class="alertor">
           <img src="../../../static/images/Alert.png" alt="灯" class="data-img" id="alertor">
           <div>
            <van-toast id="van-toast" />
            <div class="lightswitch-title title">室温监控</div>
            <switch class="ligntswitch-data" :checked="BEEP" @change="onBEEpchange"/>
           </div>
          </div>
          <div class="stepper">
              <div class="Temphandle">
                <img src="../../../static/images/jiangwen.png" alt="jiangwen" @click="downTemp">
              </div>
              <h2 class="crtValue">
                {{currentValue}}℃
                <van-toast id="van-toast" />
              </h2>
              <div class="Temphandle">
                <img src="../../../static/images/shengwen.png" alt="jiangwen" @click="upTemp">
              </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mqtt from "../../../node_modules/mqtt/dist/mqtt.js";
import Toast from "vant-weapp/dist/toast/toast";

const mqttURL = "wxs://broker-cn.emqx.io:8084/mqtt";
let timer;
export default {
  data() {
    return {
      currentValue: 26,
      alertData: { Temp: [0, 35] },
      ImgPath: "",
      clients: {},
      humidity: 0,
      temperature: 0,
      lightpower: 0,
      LED: false,
      BEEP: false,
      //获取天气地区坐标
      lacation_weidu: 29.52311,
      lacation_jingdu: 106.56347,
      //天气数据
      HeaderData: {
        weathericon: "",
        weather: "加载中",
        Advice: "加载中...",
        air: 0,
        airText: "加载中...",
      },
    };
  },

  methods: {
    // debounce(fn,delay) {
    //   let timer;
    //   return function() {
    //     let _this = this;
    //     let args = arguments;
    //     timer = setTimeout(()=>{
    //       fn.call(_this,args);
    //     },delay)
    //   }
    // },
    downTemp(e) {
      let that = this;
      if (that.currentValue <= 0) {
        Toast.fail("当前设置监控温度过低");
        return;
      }
      that.currentValue -= 1;
      let massege = JSON.stringify({target:'SECTION',value:that.currentValue}).toString();
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (that.BEEP === true) {
          this.clients.publish(
            "raspberry/status456",
            massege,
            function (err) {
              if (!err) {
                console.log("降低监控温度完毕");
              }
            }
          );
        }
      }, 1000);
    },
    upTemp(e) {
      let that = this;
      if (that.currentValue >= 40) {
        Toast.fail("当前设置监控温度过高");
        return;
      }
      that.currentValue += 1;
      let massege = JSON.stringify({target:'SECTION',value:that.currentValue}).toString();
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (that.BEEP === true) {
        this.clients.publish(
          "raspberry/status456",
          massege,
          function (err) {
            if (!err) {
              console.log("升高监控温度完毕");
            }
          }
        );
        }
      }, 1000);
    },
    onLEDchange: function (e) {
      console.log("LED开关");
      if (e.mp.detail.value) {
        Toast.success("成功开灯");
        this.clients.publish(
          "raspberry/status456",
          // '{"target":"LED","value":1}',
          '1',
          function (err) {
            if (!err) {
              console.log("开启LED灯");
            }
          }
        );
      } else {
        Toast.success("成功关灯");
        this.clients.publish(
          "raspberry/status456",
          '{"target":"LED","value":0}',
          function (err) {
            if (!err) {
              console.log("关闭LED灯");
            }
          }
        );
      }
    },
    onBEEpchange: function (e) {
      let that = this;
      let massege = JSON.stringify({target:'SECTION',value:that.currentValue}).toString();
      if (e.mp.detail.value) {
        Toast.success("开启温度监控");
        that.BEEP = true;
        this.clients.publish(
          "raspberry/status456",
          '{"target":"MONITOR","value":1}',
          function (err) {
            if (!err) {
              console.log("开启温度监控");
            }
          }
        );
        this.clients.publish(
          "raspberry/status456",
          massege,
          function (err) {
            if (!err) {
              console.log("开启时发送温度设置");
            }
          }
        );
      } else {
        Toast.success("关闭温度监控");
        that.BEEP = false;
        this.clients.publish(
          "raspberry/status456",
          '{"target":"MONITOR","value":0}',
          function (err) {
            if (!err) {
              console.log("LEDpublish");
            }
          }
        );
      }
    },
  },

  onShow() {
    var that = this;
    that.clients = mqtt.connect(mqttURL);
    console.log(that.clients);
    that.clients.on("connect", function (err) {
      console.log("成功连接mqtt服务器");
      that.clients.subscribe("raspberry/topic123", function (err) {
        if (!err) {
          console.log("订阅成功");
        }
      });
    });

    that.clients.on("message", function (topic, massage) {
      console.log(topic);
      let parseData = JSON.parse(massage);
      console.log(parseData);
      that.temperature = parseData ? parseData.Temp : "测试中...";
      that.lightpower = parseData ? parseData.Light : "测试中...";
      that.humidity = parseData ? parseData.Hum : "测试中...";
    });

    //发起网络请求
    /*天气请求*/
    wx.request({
      url: `https://devapi.qweather.com/v7/weather/3d?location=106.56347,29.52311&key=3245d5b33b494c819b02729c53fb31e8`,
      success(res) {
        that.HeaderData.weather = res.data.daily[0].textDay;
        that.HeaderData.weathericon = res.data.daily[0].iconDay;
      },
    });

    /*生活建议请求*/
    wx.request({
      /*
      全部天气指数:
        运动指数	1
        洗车指数	2
        穿衣指数	3
        钓鱼指数	4
        紫外线指数	5
        旅游指数	6
        花粉过敏指数
        舒适度指数	8
        感冒指数	9
        空气污染扩散 10
        空调开启指数 11
        太阳镜指数	12
        化妆指数	13
        晾晒指数	14
        交通指数	15
        防晒指数	16
      */
      url: `https://devapi.qweather.com/v7/indices/1d?type=8&location=106.56347,29.52311&key=3245d5b33b494c819b02729c53fb31e8`,
      success(res) {
        that.HeaderData.Advice = res.data.daily[0].text;
      },
    });

    /*空气质量请求*/
    wx.request({
      url: `https://devapi.qweather.com/v7/air/now?location=106.56347,29.52311&key=3245d5b33b494c819b02729c53fb31e8`,
      success(res) {
        console.log(res.data);
        that.HeaderData.air = res.data.now.aqi;
        that.HeaderData.airText = res.data.now.category;
      },
    });
  },
};
</script>

<style lang='less'scoped>
.container {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  .header {
    width: 80%;
    background: rgb(62, 125, 243);
    color: #fff;
    padding: 15px 30px;
    border-radius: 15px;
    .weather-top {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .dingwei {
        position: absolute;
        width: 15px;
        height: 15px;
        right: 90px;
        top: 4px;
      }
    }
    .weather-middle {
      width: 100%;
      height: 50px;
      display: flex;
      line-height: 50px;
      justify-content: space-between;
      margin: 10px 0;
      .air-class {
        padding-left: 5%;
        font-size: 50px;
      }
      .weather-msg {
        .weather-img {
          display: inline-block;
          width: 70px;
          height: 50px;
        }
        .weather-num {
          margin-left: 10px;
          font-size: 30px;
          vertical-align: top;
        }
      }
    }
  }
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
        height: 150px;
        .alertor {
          display: flex;
          justify-content: space-around;
          .data-img {
            width: 50px;
            height: 50px;
            margin-top: 10px;
          }
          div {
            height: 30px;
            .title {
              text-align: right;
              font-size: 20px;
              color: rgb(173, 173, 173);
            }
            .data {
              font-size: 30px;
            }
            .ligntintensity-title {
              padding-right: 10px;
            }
          }
        }
        .stepper {
          margin-top: 20px;
          width: 100%;
          display: flex;
          justify-content: space-around;
          .Temphandle {
            img {
              width: 50px;
              height: 50px;
            }
          }
          .crtValue {
            font-size: 30px;
          }
        }
      }
      .list-card1 {
        width: 150px;
        display: flex;
        height: 80px;
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
  #alertor {
    width: 60px;
  }
}
</style>
