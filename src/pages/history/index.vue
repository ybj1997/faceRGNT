<template>
  <div>
    <header style="color:brown">仅能展示最近三次健康打卡</header>
    <HistoryTemp
         v-for="(item, index) in dataList"
        :key="index"
        :item="item"
        :index="index"
    />
  </div>
</template>

<script>
import HistoryTemp from '../../components/HistoryTemp.vue'

export default {
  components: {HistoryTemp},

  data() {
    return {
      dataList: [],
    };
  },

  methods: {},

  onShow() {
    const that = this;
    that.dataList = [];
    wx.getStorageInfo({
      success(res) {
        console.log("全部打卡历史记录",res);
        const keyArr = res.keys.slice(-3);
        for (let item of keyArr) {
          console.log("item",item);
          wx.getStorage({
            key: item,
            encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
            success(res) {
              that.dataList.push(res.data);
            },
          });
        }
      },
    });
  },

};
</script>

<style lang="less">
header{
  width: 100%;
  margin-bottom: 30px;
  text-align: center;
}
</style>