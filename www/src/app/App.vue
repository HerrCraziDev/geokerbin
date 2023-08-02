<template>
    <div id="app">
        <header>
            <div>
                <h1>GeoKerbin</h1>
                <span id="version">v0.4.5</span>
            </div>

            <LayersMenu v-bind:layers="layers"></LayersMenu>
        </header>

        <Map></Map>
    </div>
</template>

<script>
import OLMap from './lib/map';
import Map from './components/Map';
import LayersMenu from './components/LayersMenu';

export default {
    components: {
        Map,
        LayersMenu
    },

    data: () => ({
        layers: []
    }),

    mounted() {
        this.layers = OLMap.getLayers();
    }
}
</script>

<style>
    header {
        /* width: 100%; */

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>