<template>
    <div v-if="posts.length">
        <h2 class="header">List of posts</h2>
        <post-item
            v-for="post of posts"
            :post = "post"
            :key="post.id"
            @removePost="$emit('removePost', post)"
        /> 
    </div>
    <h2 v-else class="header">List of posts is empty</h2>

</template>

<script>
    import PostItem from '@/components/PostItem'

export default {
    components: {
        PostItem,
    },
    props: {
        posts: {
            type: Array,
            required: true,
        }
    },
    methods: {

    },
}
</script>

<style scoped>
    .header {
        margin-top: 20px;
    }
</style>