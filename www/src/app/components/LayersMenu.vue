<template>
    <div id="layersMenu">
        <v-btn dark icon small>
            <v-icon dark @click="toggle">{{(shown) ? 'close' : 'menu'}}</v-icon>
        </v-btn>
        <!-- <button class="icon-btn" id="menuToggle"><i class="material-icons">layers</i> Layers</button> -->
        <aside class="side-menu" :class="(shown) ? 'shown' : ''">
            <h2><v-icon dark>layers</v-icon> Layers</h2>

            <ul id="layer-list">
                <LayerItem v-for="layer in layers" v-bind:layer="layer" v-bind:key="layer.id"></LayerItem>
            </ul>
        </aside>
    </div>

</template>

<script>
import LayerItem from './LayerItem'

export default {
    components: {
        LayerItem
    },

    props: {
        layers: Array
    },

    data: () => ({
        shown: true,
        layer: {}
    }),

    methods: {
        toggle() {
            this.shown = !this.shown
        }
    },

}
</script>

<style>
.side-menu {
    position: fixed;
    right: -20%;
    top: 0;
    z-index: -10;

    width: 22%;
    height: 100%;

    padding: 1em;

    background-color: #26292ee5;
    border-left: solid 1px #424242b9;
    opacity: 0;

    transition: all ease-out .2s;
}

.side-menu h2 {
    font-family: 'Roboto';
    font-weight: bold;
    font-size: 1em;
}

.side-menu.shown {
    left: initial;
    right: 0;
    box-shadow: 0 0 30px #161616a9, 0 0 15px #161616b9;
    opacity: 1;
}

</style>