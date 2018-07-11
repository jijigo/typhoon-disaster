<template lang="pug">
Layout
  Header
    h1.header 台北市颱風災情即時資訊
  Alert.alert(show-icon) 防災災情及相關諮詢電話：87863119分機 8900-8907
  Content
    // t-filter
    // Cases
    Map
  Footer Footer
</template>

<script>
import axios from "axios";
import Filter from "@/components/Filter";
import store from "@/store/index";

export default {
  components: {
    Cases: require("@/components/Cases").default,
    TFilter: require("@/components/Filter").default,
    Map: require("@/components/Map").default
  },
  created() {
    store.dispatch("getCaseList");
  }
};
</script>

<style lang="sass" scoped>
.header 
  color: #fff
.alert
  margin: 8px auto;
</style>
