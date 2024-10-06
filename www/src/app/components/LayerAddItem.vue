<template>
    <div class="item-frame">
        <Button><Icon>library_add</Icon>Add Layer</Button>
    </div>
</template>

<script>
import Button from './UI/Button.vue';
import Icon from './UI/Icon.vue';

export default {
    components: {
        Button, 
        Icon
    }
}
</script>

<style>
.item-frame {
    position: relative;
    height: 4em;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #4444;
    border-radius: 5px;
    border: dashed 2px #777;

    margin: .5em 0;
}
</style>