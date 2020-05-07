<template>
  <div>
    <baidu-map class="bm-view" :center="center" :zoom="zoom">
      <bm-marker :position="center" :dragging="false"></bm-marker>
    </baidu-map>
  </div>
</template>
<script>
export default {
  data () {
    return {
      center: { lng: 115.96191, lat: 28.68194 },
      zoom: 16
    }
  },
  mounted () {
    // console.log(this.$route)
    console.log(Object.keys(this.$route.query).length)
    if (Object.keys(this.$route.query).length !== 0) {
      for (const key in this.$route.query) {
        this.center[key] = this.$route.query[key]
      }
    }
  }
}
</script>
<style scoped>
.bm-view {
  width: 100%;
  height: 100%;
}
</style>
