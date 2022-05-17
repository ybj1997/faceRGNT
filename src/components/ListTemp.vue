<template>
  <div class="card">
    <div>
      <span class="name">姓名：</span>
      <span>{{ names[item.Person] }}</span>
    </div>
    <div>
      <span>时间:</span>
      <span>{{ item.Time }}</span>
    </div>
    <div>
      <span>打开方式：</span>
      <span>{{ methods[item.method] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      names: {
        yanbojun: "颜博骏",
        taosheng: "陶圣",
        xuehaoyu: "薛皓宇",
      },
      methods: {
        renlian: "人脸解锁",
        mima: "密码解锁",
        RFID: "RFID解锁",
        shouji: "微信小程序解锁",
      },
    };
  },
  props: ["item", "index"],
  onload() {},
};
</script>

<style lang="less">
.card {
  width: 80%;
  height: 80px;
  margin: 0 auto;
  border-radius: 20px;
  margin-top: 10px;
  background-color: rgb(235, 231, 231);
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    margin-left: 20px;
  }
}
</style>
