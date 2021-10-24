<template>
    <form @submit.prevent>
        <h3>Create new post</h3>
        <my-input
            placeholder="Title"
            v-model="post.title"
            v-focus
        />
        <my-input
            placeholder="Post"
            v-model="post.body"
        />
        <my-button
            class="as-fe mt-20"
            @click="createPost"
        >
            Add post
        </my-button>
    </form>
</template>

<script>


export default {
    data() {
        return {
            post: {
                title: '',
                body: '',
            }
        }
    },
    methods: {
        createPost(){
            this.post.id = Date.now()
            this.$emit('createPost', this.post)
            this.post = {
                title: '',
                body: '',
            }
        },
    },

}
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
    }
</style>