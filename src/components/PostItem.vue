<template>
    <div class="post">
        <h2>{{post.title}}</h2>
        <p>{{post.body}}</p>
        <my-button
            class="as-fe"
            @click="$emit('removePost', this.post)"
        >
            Delete
        </my-button>
    </div>
</template>

<script>

export default {
    props: {
        post: {
            type: Object,
            required: true,
        }
    },
    methods: {
        
    },
}
</script>

<style scoped>
    .post {
        padding: 15px;
        border: 2px solid teal;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
    }
</style>