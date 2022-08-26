<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
  >
    <div style="display: flex">
      <button style="margin: 0.3rem 0.5rem" @click="drawMarkers">
        Draw Markers</button
      ><button style="margin: 0.3rem 0.5rem" @click="drawDirections">
        Draw Directions</button
      ><button style="margin: 0.3rem 0.5rem" @click="clearMap">
        Clear Map
      </button>
    </div>
    <GmapMap
      :center="center"
      :zoom="15"
      map-type-id="terrain"
      style="width: 1000px; height: 600px"
    >
      <GmapMarker
        :key="index"
        :ref="'kutu'+index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
        @drag="listenDrag"
      />
      <gmap-polygon :paths="paths"></gmap-polygon>
    </GmapMap>
    <div>
      <p>
        {{ JSON.stringify(markers) }}
      </p>
    </div>
  </div>
</template>

<script>
const home = { lat: -6.189192, lng: 106.782779 };
const work = { lat: -6.193057, lng: 106.782409 };
export default {
  name: "GoogleMap",
  data() {
    return {
      center: home,
      markers: [],
      paths: [],
    };
  },
  methods: {
    listenDrag(event) {
      const index = event?.domEvent?.path[1]?.name?.replace(/\D/gi, "") || NaN;
      console.log(event?.domEvent)
      if (!isNaN(index)) {
        this.markers[index].position = {lat: event.latLng.lat(), lng: event.latLng.lng()}
      }
    },
    drawMarkers() {
      this.markers = [
        {
          position: home,
        },
        {
          position: work,
        },
      ];
    },
    drawDirections() {
      this.paths = [this.markers[0].position, this.markers[1].position];
    },
    clearMap() {
      this.markers = [];
      this.paths = [];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
