<template>
    <button 
        :class="{bare: (this.bare || this.iconOnly) }"
        @click="$emit('click', $event)"
    >
        <slot>Button</slot>
    </button>
</template>

<script>
export default {
    props: {
        bare: Boolean
    },

    data: () => ({
        iconOnly: false
    }),

    mounted() {
        console.log("first child is", this.$slots.default[0].componentOptions?.tag)
        // Make bare if it only has one Icon as child
        if (this.$slots.default.length == 1 && this.$slots.default[0].componentOptions?.tag == "Icon") {
            this.iconOnly = true;
        }
    }
}
</script>

<style>
button {
    padding: 0.25em 0.5em;

    background-color: #666;
    color: white;

    /* font-size: 1rem; */
    font-weight: bold;
    font-family: 'Hanken Grotesk', 'Roboto';

    border: none;
    border-radius: 4px;

    transition: all .1s;
}

button:hover {
    filter: brightness(120%);
}

button:active {
    filter: brightness(80%);
}

button.bare:hover {
    /* background-color: #6664; */
    filter: brightness(80%);
}

button.bare:active {
    filter: brightness(120%);
}

button.bare {
    background-color: transparent;
    box-shadow: none;
    padding: 0;
}

button:has(*) {
    background-color: red;
}
</style>