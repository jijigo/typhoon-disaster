<template lang="pug">
    Table(:columns="columns", :data="cases")
</template>

<script>
import store from "@/store/index";

export default {
  data() {
    return {
      columns: [
        {
          title: "發生時間",
          key: "time"
        },
        {
          title: "災害類型",
          key: "type"
        },
        {
          title: "災害區域",
          key: "district"
        },
        {
          title: "災害位置",
          key: "address"
        },
        {
          title: "災害描述",
          key: "description"
        }
      ]
    };
  },
  computed: {
    cases() {
      return store.getters.cases;
    }
  }
};
</script>
