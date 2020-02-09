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
        Map.addKerbalLayer(Bodies.kerbin.sat)
    }
}
</script>

<style>

</style>