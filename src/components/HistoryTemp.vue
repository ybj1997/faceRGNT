<template>
  <div class="card">
    <div>
      <span class="name">状态：</span>
      <span class="bad" :class="{good: item.health}">{{ item.name }}</span>
    </div>
    <div>
        <span>时间:</span>
        <span>{{ item.clockTime}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "index"],
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
  div{
      margin-left: 20px;
  }
  .bad{
      color:red
  }
  .good{
      color:green
  }
}
</style>
