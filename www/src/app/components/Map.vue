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
        Map.addKerbalLayer(Bodies.kerbin.sat, {id: 1, title: "Kerbin (terrain, true colors)"})
        Map.addKerbalLayer(Bodies.kerbin.biome, {id: 2, title: "Kerbin (biomes)", opacity: 0.3})
    }
}
</script>

<style>

</style>