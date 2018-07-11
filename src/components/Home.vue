<template lang="pug">
Layout
  Header
    h1.header 台北市颱風災情即時資訊
  // Alert.alert(show-icon) 防災災情及相關諮詢電話：87863119分機 8900-8907
  Content
    t-filter
    // Cases
    Map
  Footer 
    | 防災災情及相關諮詢電話：87863119分機 8900-8907
    // | Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
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
