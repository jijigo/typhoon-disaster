<template lang="pug">
    l-map(ref="map", :zoom="zoom", :max-zoom="16" :center="center", style="height: 500px")
        l-tile-layer(:url="url", :attribution="attribution")
        // l-geo-json(v-for="(geoJson, index) in taipeiGeo", :key="index", :geojson="geoJson", :options="geoJsonOptions")
        l-marker-cluster(:options="clusterOptions")
          l-marker(v-for="(m, index) in cases"
                :key="index"
                ref="markers"
                :icon="getIcon(m.type)"
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
                  Col(span="8") 受災地點 : 
                  Col(span="16") {{ m.address }}
                Row
                  Col(span="8") 災害類型 :  
                  Col(span="16") {{ m.type }}
                Row
                  Col(span="8") 災情描述 :   
                  Col(span="16") {{ m.description }}
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LGeoJson } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";

// import "MarkerCluster.css";
import markerClusterGroup from "leaflet.markercluster";
import taipeiGeo from "@/config/taipeiGeo.json";
import store from "@/store/index";
import _ from "lodash";

import landslide from "@/assets/landslide.svg";
import twister from "@/assets/twister.svg";
import earthquake from "@/assets/earthquake.svg";
import flood from "@/assets/flood.svg";
import meteorite from "@/assets/meteorite.svg";
import windstorm from "@/assets/windstorm.svg";
import iceberg from "@/assets/windstorm.svg";

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
    LPopup,
    LMarkerCluster: Vue2LeafletMarkerCluster,
    LGeoJson
  },
  computed: {
    cases() {
      return store.getters.cases;
    }
  },
  data() {
    return {
      zoom: 11,
      center: L.latLng(25.081152288448365, 121.54761747457088),
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      taipeiGeo: taipeiGeo.features,
      greenIcon,
      clusterOptions: {
        maxClusterRadius: 50,
        disableClusteringAtZoom: 17,
        spiderLegPolylineOptions: { weight: 1.5, color: "#222", opacity: 0 },
        iconCreateFunction: cluster => {
          return L.divIcon({
            html: '<div class="circle">' + cluster.getChildCount() + "</div>",
            className: "mycluster",
            iconSize: L.point(32, 32)
          });
        }
      },
      // geoJsonOptions: {
      //   onEachFeature: (feature, layer) => {
      //     layer.getLatLng = () => {
      //       return this.getBounds().getCenter();
      //     };
      //     layer.setLatLng = () => {};
      //     layer._latlng = layer.getLatLng();
      //   },
      //   pointToLayer: (geoJsonPoint, latlng) => {
      //     return L.marker(latlng);
      //   }
      // },
      icons: {
        landslide,
        twister,
        earthquake,
        flood,
        meteorite,
        windstorm,
        iceberg
      }
    };
  },
  mounted() {
    L.geoJSON(taipeiGeo, {
      style: {
        color: "#ff7800",
        weight: 5,
        opacity: 0.65
      }
    }).addTo(this.$refs.map.mapObject);
  },
  methods: {
    caseLatLng(position) {
      return L.latLng(position.lat, position.lng);
    },
    getIcon(type) {
      let iconName = "";
      switch (type) {
        case "路樹災情":
          iconName = "windstorm";
          break;
        case "民生、基礎設施災情":
          iconName = "twister";
          break;
        case "建物毀損":
          iconName = "earthquake";
          break;
        case "積淹水災情":
          iconName = "flood";
          break;
        case "環境汙染":
          iconName = "iceberg";
          break;
        case "廣告招牌災情":
          iconName = "meteorite";
          break;
        default:
          iconName = "landslide";
      }
      return new L.Icon({
        iconUrl: this.icons[iconName],
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
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

.circle
  border-radius: 50%;
  background: #32ccbc;
  width: 35px;
  height: 35px;
  line-height: 35px;
  color: #fff;
</style>
