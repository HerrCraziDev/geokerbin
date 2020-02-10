<template>
    <div class="layer-item-box">
        <v-progress-linear 
            class="layer-loading" 
            dark 
            :indeterminate="indeterminate"
            :active="isLoading"
            :value="(tilesLoaded/tilesLoading) * 100"
            color="#285cbd"
        >
        </v-progress-linear>

        <div class="layer-item">
            <img 
                :src="layer.get('layerIcon')" 
                :alt="layer.get('body') || 'ERROR'" 
                class="layer-icon"
            />

            <v-icon class="layer-toggle-visible" dark dense @click="toggleLayer">
                {{(this.layer.getVisible()) ? 'visibility' : 'visibility_off'}}
            </v-icon>

            <v-icon class="layer-delete" dark dense>delete_forever</v-icon>

            <v-icon class="layer-edit" dark dense>settings</v-icon>

            <h3>{{layer.get('title')}}</h3>

            <span class="layer-info">
                {{this.layer.get('body')}} » {{this.layer.get('type')}} (<i>{{this.layer.get('tilesUrl')}}</i> )
            </span>

            <input class="opacity-slider" type="range" name="opacity" min="0" step="0.01" max="1" v-model="opacity">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        layer: Object
    },

    data: () => ({
        opacity: 0,
        indeterminate: false,
        tilesLoading: 0,
        tilesLoaded: 0,
        isLoading: false
    }),

    watch: {
        opacity: function (val) {
            this.layer.setOpacity(val)
        }
    },

    mounted() {
        this.opacity = this.layer.getOpacity()
        console.log(this.layer.get('title'))

        let source = this.layer.getSource()
        source.on('tileloadstart', this.addLoading)
        source.on('tileloadend', this.addLoaded)
        source.on('tileloaderror', this.addLoaded)
    },

    methods: {
        toggleLayer() {
            this.layer.setVisible( !this.layer.getVisible() )
        },

        addLoading() {
            this.$parent.addLoading()
            this.tilesLoading++
            // this.indeterminate = false
            this.isLoading = true
        },

        addLoaded() {
            this.$parent.addLoaded()
            this.tilesLoaded++;

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
    }
}
</script>

<style>
.layer-item-box {
    margin: 1em 0;
    background-color: #424242d3;

    clear: both;

    border-radius: 4px;
    box-shadow: 1px 1px 5px #00000071;

    overflow: hidden;
}

.layer-item {
    display: grid;
    grid-template-columns: 3em 2em auto 1.5em 1em;
    grid-column-gap: .3em;
    grid-template-rows: 1em 1em auto;
    grid-row-gap: .2em;

    /* align-items: center; */

    padding: 1em;
}

.layer-item h3 {
    grid-area: 1 / 3 / 2 / 4;
    font-size: 1em;
}

.layer-item .opacity-slider {
    grid-area: 3 / 2 / 4 / 4;
    margin-top: .5em;
    margin-left: 1em;
}

.layer-toggle-visible {
    grid-area: 1 / 2 / 2 / 3;
    place-self: center right;
    font-size: .7em;
}

.layer-edit {
    grid-area: 1 / 4 / 2 / 5;
}

.layer-delete {
    grid-area: 1 / 5 / 2 / 6;
}

.layer-item v-icon {
    font-size: .5em;
}

.layer-info {
    grid-area: 2 / 2 / 3 / 5;
    color: grey;
    margin-left: 1em;
    font-size: .9em;
    font-family: 'Roboto';
}

.layer-icon {
    grid-area: 1 / 1 / 4 / 2;
    place-self: center;
    height: 3em;
}
</style>