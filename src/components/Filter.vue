<template lang="pug">
    Row.filter-wrapper(type="flex" justify="start")
        Col(:xs="{ span: 8 }", :md="{ span: 4 }")
            Select(v-model="district", @on-change="setDistrict", placeholder="選擇區域")
                Option(v-for="(item, index) in districtList" :value="item.name" :key="index")
        Col(:xs="{ span: 8, offset: 1 }", :md="{ span: 4, offset: 1 }")
            Select(v-model="type", @on-change="setFilterType", placeholder="選擇類型")
                Option(v-for="(item, index) in typeList" :value="item.name" :key="index")

</template>

<script>
import districtList from "@/config/districtList.json";
import typeList from "@/config/typeList.json";

import store from "@/store/index";

export default {
  name: "t-filter",
  data() {
    return {
      district: "所有區域",
      type: "所有災情",
      districtList,
      typeList
    };
  },
  methods: {
    setDistrict(value) {
      store.dispatch("setFilterDistrict", value);
    },
    setFilterType(value) {
      store.dispatch("setFilterType", value);
    }
  }
};
</script>

<style lang="sass" scoped>
.filter-wrapper
  margin-bottom: 32px
</style>
