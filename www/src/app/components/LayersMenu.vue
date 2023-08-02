<template>
    <div id="layersMenu">
        <progress
            class="layer-loading"
            :class="{hidden: !this.isLoading}"
            :indeterminate="indeterminate"
            :value="(tilesLoaded/tilesLoading) * 100"
        >
        </progress>
        <button class="side-menu-toggle" @click="toggle">{{(shown) ? 'close' : 'menu'}}</button>

        <aside class="side-menu" :class="(shown) ? 'shown' : ''">
            <h2><Icon outlined>layers</Icon>Layers</h2>
            <ul id="layer-list">
                <LayerItem v-for="layer in layers" v-bind:layer="layer" v-bind:key="layer.id"></LayerItem>
                <layer-add-item>
            </ul>
        </aside>
    </div>

</template>

<script>
import LayerAddItem from './LayerAddItem.vue';
import LayerItem from './LayerItem';
import Icon from './UI/Icon.vue';

export default {
    components: {
        LayerItem,
        Icon,
        LayerAddItem
    },

    props: {
        layers: Array
    },

    data: () => ({
        shown: false,
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

            // console.log('<<<< loading: ' + this.tilesLoading)
        },

        addLoaded() {
            this.tilesLoaded++;
            // console.log('>>>> loaded: ' + this.tilesLoaded + '/' + this.tilesLoading)

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

<style scoped>
.side-menu {
    position: fixed;
    right: -20%;
    top: 0;
    z-index: 1;

    width: 28rem;
    height: 100%;

    padding: 1em;

    background-color: #26292ead;
    border-left: solid 1px #ffffff0e;
    opacity: 0;

    backdrop-filter: blur(10px);
    transition: all .2s ease-out , visibility 0s step-start .2s;

    pointer-events: none;
    visibility: hidden;
}

.side-menu h2 {
    font-weight: bold;
    font-size: 1em;
}

.side-menu.shown {
    left: initial;
    right: 0;
    box-shadow: 0 0 30px #16161686, 0 0 15px #1616169d;
    pointer-events: all;
    visibility: visible;
    transition: all .1s ease-out , visibility 0s step-start 0s;
    opacity: 1;
}

.side-menu-toggle {
    position: relative;
    z-index: 10;
}

.layer-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    transition: all 0.2s;
}

.layer-loading.hidden {
    opacity: 0;
}

#layer-list {
    padding: 0;
    margin: 1em 0;
}
</style>