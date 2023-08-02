<template>
    <span class="icon" :class="iconType"><slot/></span>
</template>

<script>
const IconTypes = {
    Normal: 'material-icons',
    Outlined: 'material-icons-outlined',
    Round: 'material-icons-round',
    Sharp: 'material-icons-sharp',
    TwoTone: 'material-icons-two-tone',
};

export default {
    props: {
        name: String,
        type: String,
        outlined: Boolean,
        round: Boolean,
        sharp: Boolean,
        twotone: Boolean,
    },

    data: () => ({
        iconType: 'material-icons'
    }),

    mounted() {
        switch (this.type) {
            case 'outlined':
                this.iconType = IconTypes.Outlined;
                break;

            case 'round':
                this.iconType = IconTypes.Round;
                break;

            case 'sharp':
                this.iconType = IconTypes.Sharp;
                break;
        
            case 'two-tone':
                this.iconType = IconTypes.TwoTone;
                break;

            case 'normal':
            default:
                this.iconType = IconTypes.Normal;
                break;
        }
    }
}
</script>

<style>
.icon {
    /* height: 1em; */
    margin-right: 0.2em;
    font-size: 1.2em;
    vertical-align: -.2em;
}
</style>