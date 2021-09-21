<template>
    <input
        class="input"
        type="text"
        :value="modelValue"
        @input="updateInput"
    >
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number],
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped>
    .input {
        width: 100%;
        border: 2px solid teal;
        padding: 10px;
        margin-top: 15px;
        box-sizing: border-box;
    }
</style>