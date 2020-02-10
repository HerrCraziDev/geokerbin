<template>
    <div id="layersMenu">
        <v-progress-linear 
            class="layer-loading"
            absolute top
            height="2px"
            dark 
            :indeterminate="indeterminate"
            :active="isLoading"
            :value="(tilesLoaded/tilesLoading) * 100"
            color="#285cbd"
        >
        </v-progress-linear>

        <v-btn dark icon small>
            <v-icon dark @click="toggle">{{(shown) ? 'close' : 'menu'}}</v-icon>
        </v-btn>

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
        layer: {},
        indeterminate: true,
        tilesLoading: 0,
        tilesLoaded: 0,
        isLoading: true
    }),

    methods: {
        toggle() {
            this.shown = !this.shown
        },

        addLoading() {
            this.tilesLoading++
            this.indeterminate = false
            this.isLoading = true

            console.log('<<<< loading: ' + this.tilesLoading)
        },

        addLoaded() {
            this.tilesLoaded++;
            console.log('>>>> loaded: ' + this.tilesLoaded + '/' + this.tilesLoading)

            if (this.tilesLoaded >= this.tilesLoading) {
                setTimeout(() => {
                    this.isLoading = false
                    setTimeout(() => {
                        this.tilesLoading = 0
                        this.tilesLoaded = 0
                    }, 500);
                }, 500)
            }
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