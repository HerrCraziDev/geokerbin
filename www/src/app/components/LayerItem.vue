<template>
    <div class="layer-item-box">
        <progress
            class="layer-loading"
            :class="(isLoading ? 'visible' : 'invisible')"
            :indeterminate="indeterminate"
            :value="(tilesLoaded/tilesLoading) * 100"
            max="100"
        >
        </progress>

        <div class="layer-map-peek">
            <div class="map-peek" :id="'map-peek-'+layer.get('id')"></div>
        </div>

        <div class="layer-item">
            <img 
                :src="layer.get('baseUrl') + layer.get('layerIcon')" 
                :alt="layer.get('body') || 'ERROR'" 
                class="layer-icon"
            />

            <Button class="layer-toggle-visible" @click="toggleLayer">
                <Icon>
                    {{(this.layer.getVisible()) ? 'visibility' : 'visibility_off'}}
                </Icon>
            </Button>

            <Button class="layer-delete"><Icon>delete</Icon></Button>

            <Button class="layer-edit"><Icon>settings</Icon></Button>

            <h3>{{layer.get('title')}}</h3>

            <span class="layer-info">
                {{this.layer.get('body')}} » {{this.layer.get('type')}} (<i>{{this.layer.get('tilesUrl')}}</i> )
            </span>

            <Slider class="opacity-slider" name="opacity" min="0" max="1" step="0.01" v-model="opacity"></Slider>
        </div>
    </div>
</template>

<script>
import Layer from 'ol/layer/Layer';
import Icon from './UI/Icon.vue';
import Button from './UI/Button.vue';
import Map from '../lib/map';
import Slider from './UI/Slider.vue';

export default {
    components: {
        Icon,
        Button,
        Slider,
    },
    
    props: {
        layer: Layer
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
            this.layer.setOpacity(parseFloat(val))
        }
    },

    mounted() {
        this.opacity = this.layer.getOpacity()
        console.log(this.layer.get('title'))

        let source = this.layer.getSource()
        source.on('tileloadstart', this.addLoading)
        source.on('tileloadend', this.addLoaded)
        source.on('tileloaderror', this.addLoaded)

        Map.createMapPeek(this.layer, 'map-peek-'+this.layer.get('id'))
    },

    methods: {
        toggleLayer() {
            console.log("Toggle layer" , this.layer)
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
        },
    }
}
</script>

<style>
.layer-item-box {
    position: relative;
    overflow: hidden;
    clear: both;

    margin: 1em 0;
    
    background-color: #42424288;
    border-radius: 5px;
    box-shadow: 1px 1px 5px #00000071;

    font-size: 12px;
}

.layer-map-peek {
    position: absolute;
    width: 100%;
    height: 100%;
    /* background-color: red; */
    z-index: 1;
}

.map-peek {
    width: 100%;
    height: 100%;
}

.layer-item {
    position: relative;
    z-index: 3;
    display: grid;
    grid-template-columns: 3em 2em auto 1.5em 1em;
    grid-column-gap: .3em;
    grid-template-rows: fit-content(2em) 1em auto;
    grid-row-gap: .2em;

    padding: 1em;
    align-items: center;

    background: linear-gradient(
        to right,
        #2226 40%,
        #2224 60%,
        transparent 100%
    );
}

.layer-map-peek::before {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    content: '';
    backdrop-filter: blur(10px);
    mask: linear-gradient(
        to right,
        black 40%,
        #000000cc 60%,
        transparent 100%
    );
}

.layer-item h3 {
    grid-area: 1 / 3 / 2 / 4;
    font-size: 1em;
    margin: 0;
}

.layer-item .opacity-slider {
    grid-area: 3 / 2 / 4 / 4;
    margin: 0;
    margin-top: .5em;
    margin-left: .4em;
}

.layer-toggle-visible {
    grid-area: 1 / 2 / 2 / 3;
    place-self: center center;
    /* font-size: .7em; */
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
    color: #ddda;
    margin-left: .4em;
    font-size: .9em;
    font-family: 'Roboto';
}

.layer-icon {
    grid-area: 1 / 1 / 4 / 2;
    place-self: center;
    height: 3em;
    margin-right: 0em;
}

.layer-loading {
    position: absolute;
    width: 100%;
    height: 5px;
    margin-top: 0;
    transition: all 0.2s;
    background-color: #666;
}

.layer-loading.invisible {
    opacity: 0;
}
</style>