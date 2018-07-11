<template lang="pug">
    Row
        Col(span="8")
            Select(v-model="district", @on-change="setDistrict")
                Option(v-for="(item, index) in districtList" :value="item.name" :key="index")
</template>

<script>
import districtList from "@/config/taipei.json";
import store from "@/store/index";

export default {
  name: "t-filter",
  data() {
    return {
      district: "",
      districtList
    };
  },
  methods: {
    setDistrict(value) {
      console.log(value);
      store.dispatch("setFilterDistrict", value);
    }
  }
};
</script>
