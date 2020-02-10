<template>
    <div id="map-container"></div>
</template>

<script>
import Map from '../lib/map';
import Bodies from '../lib/bodies';

export default {
    
    mounted() {
        console.log("map");
        Map.createMap('map-container')
        Map.addKerbalLayer(Bodies.kerbin.sat, {id: 1})
        Map.addKerbalLayer(Bodies.kerbin.biome, {id: 2, opacity: 0.3})
        Map.addKerbalLayer(Bodies.laythe.sat, {id: 3, opacity: 0.2, visible: false})
    }
}
</script>

<style>

</style>