<template>
    <div id="layersMenu">
        <v-btn dark icon small>
            <v-icon dark @click="toggle">{{(shown) ? 'close' : 'menu'}}</v-icon>
        </v-btn>
        <!-- <button class="icon-btn" id="menuToggle"><i class="material-icons">layers</i> Layers</button> -->
        <aside class="side-menu" :class="(shown) ? 'shown' : ''">
            <h2><v-icon dark>layers</v-icon> Layers</h2>
        </aside>
    </div>

</template>

<script>
export default {
    data: () => ({
        shown: true
    }),

    methods: {
        toggle() {
            this.shown = !this.shown
        }
    }

}
</script>

<style>
.side-menu {
    position: fixed;
    right: -20%;
    top: 0;
    z-index: -10;

    width: 20%;
    height: 100%;

    padding: 1em;

    background-color: #26292ed2;
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