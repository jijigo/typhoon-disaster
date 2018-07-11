<template lang="pug">
    l-map(ref="map", :zoom="zoom", :min-zoom="11" :center="center", style="height: 500px")
        l-tile-layer(:url="url", :attribution="attribution")
        l-marker(v-for="(m, index) in cases"
                :key="index"
                ref="markers"
                :icon="greenIcon"
                :lat-lng="caseLatLng(m.position)")
          l-popup(style="width: 300px;")
            Card(:bordered="false")
              Row
                Col(span="8") 發生時間 : 
                Col(span="16") {{ m.time }}
              Row
                Col(span="8") 受災地區 : 
                Col(span="16") {{ m.district }}
              Row
                Col(span="8") 災害類型 :  
                Col(span="16") {{ m.type }}
              Row
                Col(span="8") 災情描述 :   
                Col(span="16") {{ m.description }}
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import taipeiGeo from "@/config/taipeiGeo.json";
import store from "@/store/index";
import _ from "lodash";

var greenIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  computed: {
    cases() {
      return store.getters.cases;
    }
    // markers() {
    //   return _.map(this.cases, item => {
    //     return {
    //       position: L.latLng(item.position.lat, item.position.lng)
    //     };
    //   });
    // }
  },
  data() {
    return {
      zoom: 11,
      center: L.latLng(25.081152288448365, 121.54761747457088),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      taipeiGeo: taipeiGeo.features,
      greenIcon
    };
  },
  mounted() {
    var states = [
      {
        type: "Feature",
        properties: { party: "Republican" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-104.05, 48.99],
              [-97.22, 48.98],
              [-96.58, 45.94],
              [-104.03, 45.94],
              [-104.05, 48.99]
            ]
          ]
        }
      },
      {
        type: "Feature",
        properties: { party: "Democrat" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-109.05, 41.0],
              [-102.06, 40.99],
              [-102.03, 36.99],
              [-109.04, 36.99],
              [-109.05, 41.0]
            ]
          ]
        }
      }
    ];
    var myLines = [
      {
        type: "LineString",
        coordinates: [[-100, 40], [-105, 45], [-110, 55]]
      },
      {
        type: "LineString",
        coordinates: [[-105, 40], [-110, 45], [-115, 55]]
      }
    ];

    var myStyle = {
      color: "#fff",
      weight: 5,
      opacity: 0.65
    };

    L.geoJSON(taipeiGeo, {
      style: {
        color: "#ff7800",
        weight: 5,
        opacity: 0.65
      },
      on: {
        click() {
          console.log("click");
        }
      }
    }).addTo(this.$refs.map.mapObject);
  },
  methods: {
    caseLatLng(position) {
      return L.latLng(position.lat, position.lng);
    }
  }
};
</script>

<style lang="sass">
.leaflet-popup-content-wrapper 
  padding: 0
  .leaflet-popup-content
    margin: 0
.leaflet-popup-tip-container
  display: none
</style>
