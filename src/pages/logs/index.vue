<template>
  <div>
    <van-toast id="van-toast" />
    <ul>
      <ListTemp
        v-for="(item, index) in logsData"
        :key="index"
        :item="item"
        :index="index"
      />
    </ul>
  </div>
</template>

<script>
import mqtt from "../../../node_modules/mqtt/dist/mqtt.js";
import ListTemp from "../../components/ListTemp.vue";
const mqttURL = "wxs://broker-cn.emqx.io:8084/mqtt";
export default {
  components: { ListTemp },

  data() {
    return {
      clients: {},
      logsData: [],
    };
  },

  methods: {},

  //日志数据格式
  //{'method': 'mima', 'Person': '', 'Time': 'Thu May 12 23:12:27 2022'},
  //{'method': 'mima', 'Person': '', 'Time': 'Thu May 12 23:12:27 2022'},
  //{'method': 'renlian', 'Person': 'taosheng', 'Time': 'Fri May 13 15:32:15 2022'},
  //{'method': 'renlian', 'Person': 'taosheng', 'Time': 'Fri May 13 15:32:23 2022'},
  //{'method': 'renlian', 'Person': 'taosheng', 'Time': 'Fri May 13 15:32:34 2022'}
  onLoad() {
    console.log("开始加载");
    var that = this;
    that.clients = mqtt.connect(mqttURL);
    that.clients
      .on("connect", function (err) {
        console.log("成功连接mqtt服务器");
      })
      .subscribe("raspberry/topic123", function (err) {
        if (!err) {
          console.log("订阅日志成功");
        }
      })
      .publish("raspberry/status456", "1", function (err) {
        if (!err) {
          console.log("获取日志");
        }
      });
    that.clients.on("message", function (topic, massage) {
      const maxArr = new Array();
      const parseData = JSON.parse(massage);
      console.log("LOG日志：",parseData);
      if (maxArr.length <= 5) {
        that.logsData.push(parseData);
      } else {
        that.logsData.shift();
        that.logsData.push(parseData);
      }
    });
  },
  onUnload() {
    that.clients = {};
  },
};
</script>

<style lang="less">
.quit {
  position: relative;
  top: -45px;
}
</style>
