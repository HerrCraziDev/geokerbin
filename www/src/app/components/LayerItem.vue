<template>
    <div class="layer-item">
        <h3>{{layer.get('title')}}</h3>
        <input type="range" name="opacity" min="0" step="0.01" max="1" v-model="opacity">
    </div>
</template>

<script>
export default {
    props: {
        layer: Object
    },

    data: () => ({
        opacity: 0
    }),

    watch: {
        opacity: function (val) {
            this.layer.setOpacity(val)
        }
    },

    mounted() {
        this.opacity = this.layer.getOpacity()
        console.log(this.layer.get('title'))
    }
}
</script>

<style>
.layer-item {
    margin: 1em 0;
    padding: 1em 1.5em;
    background-color: #424242d3;

    border-radius: 4px;
    box-shadow: 1px 1px 5px #00000071;
}
.layer-item h3 {
    font-size: 1em;
}
</style>