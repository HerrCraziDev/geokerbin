<template>
    <div id="app">
        <header>
            <div>
                <h1>GeoKerbin</h1>
                <span id="version">v0.3.0</span>
            </div>

            <LayersMenu></LayersMenu>
        </header>

        <Map></Map>
    </div>
</template>

<script>
import Map from './components/Map';
import LayersMenu from './components/LayersMenu';

export default {
    components: {
        Map,
        LayersMenu
    },
}
</script>

<style>
    header {
        width: 100%;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>