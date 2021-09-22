<template>
    <div 
        class="dialog"
        v-if="show"
        @click="hideDialog"
    >
        <div 
            @click.stop 
            class="dialog__content"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-dialog',
    props: {
        show: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        }
    },
}
</script>


<style scoped>
    .dialog {
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .7);
    }

    .dialog__content {
        margin: auto;
        background: #fff;
        border-radius: 15px;
        min-height: 50px;
        min-width: 400px;
        padding: 20px;
    }
</style>