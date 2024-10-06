
<template>
	<input
		type="range"
		:min="min"
		:max="max"
		:step="step"
		:name="name"
		:value="value"
		@input="$emit('input', parseFloat($event.target.value))"
	/>
</template>

<script>
export default {
	props: {
		min: String,
		max: String,
		step: String,
		name: String,
		value: Number,
	},
	emits: ['input']
}
</script>

<style lang="css">

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
}

/* All the same stuff for Firefox */
input[type=range]::-moz-range-thumb {
	height: 10px;
	width: 10px;
	border: none;
	border-radius: 6px;
	background: #ffffff;
	cursor: pointer;
}

input[type=range]::-moz-range-progress,
input[type=range]::-moz-range-track {
	width: 100%;
	height: 4px;
	cursor: pointer;
	background: #333333ab;
	border-radius: 2px;
}

input[type=range]::-moz-range-progress {
	background: #42836a;
}

input[type=range] {
	background: none;
}
</style>