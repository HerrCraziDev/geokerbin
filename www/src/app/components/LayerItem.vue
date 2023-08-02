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

            <input class="opacity-slider" type="range" name="opacity" min="0" step="0.01" max="1" v-model="opacity">
        </div>
    </div>
</template>

<script>
import Layer from 'ol/layer/Layer';
import Icon from './UI/Icon.vue';
import Button from './UI/Button.vue';

export default {
    components: {
        Icon,
        Button
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
        }
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

.layer-item {
    display: grid;
    grid-template-columns: 3em 2em auto 1.5em 1em;
    grid-column-gap: .3em;
    grid-template-rows: fit-content 1em auto;
    grid-row-gap: .2em;

    /* align-items: center; */

    padding: 1em;
}

.layer-item h3 {
    grid-area: 1 / 3 / 2 / 4;
    font-size: 1em;
    margin: 0;
}

.layer-item .opacity-slider {
    grid-area: 3 / 2 / 4 / 4;
    margin-top: .5em;
    margin-left: 1em;
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