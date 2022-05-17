<template>
  <div>
    <van-nav-bar
      title="实时监控"
      bind:click-right="onClickRight"
      class="quit"
    />
  </div>

    
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },

  methods: {
    
  },

  onShow() {
    
  },
};
</script>

<style lang="less">
.quit {
  position: relative;
  top: -45px;
}
ul{
  position: relative;
  top:-45px;
  width: 100%;
  height: 40px;
  display:flex;
  background-color: rgb(236, 236, 236);
  li{
    flex:1;
    line-height: 40px;
    text-align: center;
  }
}
</style>
