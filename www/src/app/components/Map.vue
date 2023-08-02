<template>
    <div id="map-container"></div>
</template>

<script>
import Map from '../lib/map';
import Legacy from '../lib/sources/tiles-arii';
import Geokerbin from '../lib/sources/tiles-iriatai';

export default {
    
    mounted() {
        console.log("map");
        Map.createMap('map-container')
        Map.addKerbalLayer(Geokerbin, Geokerbin.kerbin.sat, { id: 0, visible: true })
        Map.addKerbalLayer(Geokerbin, Geokerbin.kerbin.normal, { id: 1, visible: true, className: 'ovr' })
        Map.addKerbalLayer(Legacy, Legacy.kerbin.sat, { id: 2, opacity: 1, visible: false })
        Map.addKerbalLayer(Legacy, Legacy.kerbin.biome, {id: 3, opacity: 0.3, visible: false})
        Map.addKerbalLayer(Legacy, Legacy.laythe.sat, {id: 4, opacity: 0.2, visible: false})
    }
}
</script>

<style>
.ovr {
    /* filter: brightness(1); */
    mix-blend-mode: overlay;
}

.bw {
    filter: grayscale(100%);
}
</style>