<template>
    <div id="app">
        <header>
            <div>
                <h1>GeoKerbin</h1>
                <span id="version">v{{version}}</span>
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
import version from './lib/version';

export default {
    components: {
        Map,
        LayersMenu,
    },

    data: () => ({
        layers: [],
        version: version.version,
    }),

    mounted() {
        this.layers = OLMap.getLayers();
        console.log(`[App] Geokerbin loaded ! (${version.app} v${version.version})`)
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