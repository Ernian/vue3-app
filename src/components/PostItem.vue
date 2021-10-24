<template>
    <div class="post">
        <h2>{{post.title}}</h2>
        <p>{{post.body}}</p>
        <p>ID: {{post.id}}</p>
        <p>likes: {{$store.state.likes}}</p>
        <div class="df ml-a">
            <my-button
                @click="$router.push(`/posts/${post.id}`)"
                class="mr-20"
            >
                Open
            </my-button>
            <my-button
                @click="$emit('removePost', this.post)"
            >
                Delete
            </my-button>
        </div>
        
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