<template>
    <div id="app">
        <header>
            <h1>GeoKerbin</h1>
            <span id="version">v0.3.0</span>

            <div class="menu" id="menu">
                <div class="menu-indicator-bar"></div>
                <div class="menu-indicator-bar"></div>
                <div class="menu-indicator-bar"></div>
            </div>

            <aside class="sliding-menu hidden">
                
            </aside>
        </header>

        <Map></Map>
    </div>
</template>

<script>
import Map from './components/Map';

export default {
    components: {
        Map
    },
}
</script>

<style>

</style>