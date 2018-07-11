<template lang="pug">
    Row.filter-wrapper(type="flex" justify="center")
        Col(:xs="{ span: 7 }", :md="{ span: 4 }")
            .name 受災地區：
            Select.filter-select(v-model="district", @on-change="setDistrict", placeholder="選擇區域")
                Option(v-for="(item, index) in districtList" :value="item.name" :key="index")
        Col(:xs="{ span: 7 }", :md="{ span: 4 }")
            .name 受災地區：
            Select.filter-select(v-model="type", @on-change="setFilterType", placeholder="選擇類型")
                Option(v-for="(item, index) in typeList" :value="item.name" :key="index")
        Col(:xs="{ span: 7 }", :md="{ span: 4 }")
            .name 受災地區：
            Select.filter-select(v-model="status", @on-change="setFilterStatus", placeholder="是否已完成")
                Option(value="所有狀態", label="所有狀態")  
                Option(:value="true", label="已完成")
                Option(:value="false", label="尚未完成")

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
      status: "所有狀態",
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
    },
    setFilterStatus(value) {
      store.dispatch("setFilterStatus", value);
    }
  }
};
</script>

<style lang="sass">
$sm: 576px
.filter-wrapper
  margin: 32px 0
  height: 100px
  align-items: center
  @media screen and (max-width: $sm) 
    margin: 16px 0
  
  .ivu-col
    background: #fff
    padding: 24px
    @media screen and (max-width: $sm) 
      padding: 8px
    
    &:not(:last-of-type)
      border-right: 1px solid #E8EAEC
    .name 
      text-align: left

.filter-select
  .ivu-select-selection
    border: none
    div 
      text-align: left
      .ivu-select-selected-value
        padding-left: 0
</style>
