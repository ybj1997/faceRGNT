<template>
  <div class="counter-warp">
    <div>
      <div v-if="clickFlag" class="disabledButton" @click="disabledClick">
        <span>已打卡</span>
      </div>
      <div v-else class="button" @click="click">
        <span>打卡</span>
      </div>
    </div>
    <van-toast id="van-toast" />
    <p class="history" @click="toHistory">历史记录</p>
    <van-action-sheet
      :show="isShow"
      title="健康状况"
      :actions="actionArr"
      @close="closeActionSheet"
      @select="selectActionSheet"
    >
    </van-action-sheet>
  </div>
</template>

<script>
// Use Vuex
import store from "./store";
import moment from "moment";
import Toast from "vant-weapp/dist/toast/toast";

export default {
  components: {},
  data() {
    return {
      clickFlag: false,
      isShow: false,
      actionArr: [
        {
          name: "健康",
          color: "#00FF00",
        },
        {
          name: "不健康",
          color: "#ee0a24",
        },
      ],
    };
  },
  computed: {
    count() {
      return store.state.count;
    },
  },
  methods: {
    click() {
      let that = this;
      that.isShow = true;
      console.log(1111);
    },
    disabledClick() {
      Toast.fail("你已完成健康打卡");
    },
    closeActionSheet() {
      let that = this;
      that.isShow = false;
    },
    selectActionSheet(e) {
      let that = this;
      that.isShow = false;
      const name = e.target.name;
      const key = JSON.stringify(moment().add(10, "days").calendar());
      const clockTime = moment(new Date()).format("MMMM Do YYYY, h:mm:ss");
      const data = {name, clockTime, health: name === '健康'}
      wx.setStorage({
        key,
        data,
        encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
        success() {
          Toast.success("打卡成功");
          that.clickFlag = true;
        },
      });
      that.clickFlag = true;
      console.log(data);
    },
    toHistory() {
      wx.navigateTo({
        url: "/pages/history/main",
      });
    },
  },
  // onShow() {
  //   const that = this;
  //   const key = JSON.stringify(moment().add(10, "days").calendar());
  //   console.log(key);
  //   wx.getStorage({
  //     key,
  //     encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
  //     success(res) {
  //       that.clickFlag = true;
  //     },
  //   });
  // },
};
</script>

<style lang="less">
.counter-warp {
  text-align: center;
  margin-top: 2rem;
  div {
    width: 100%;
    margin: 0 auto;
    .button {
      width: 100px;
      height: 100px;
      border-radius: 80px;
      background-color: #3e7df3;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .disabledButton {
      width: 100px;
      height: 100px;
      border-radius: 80px;
      background-color: #bdbec2;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .history {
    margin-top: 7rem;
  }
}
</style>
