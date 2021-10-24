<template>
    <div v-if="posts.length">
        <h2 class="header">List of posts</h2>
        <transition-group name="post-list">
            <post-item
            v-for="post of posts"
            :post = "post"
            :key="post.id"
            @removePost="$emit('removePost', post)"
            /> 
        </transition-group>
        
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
    .post-list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .post-list-enter-active,
    .post-list-leave-active {
        transition: all .3s ease;
    }
    .post-list-enter-from,
    .post-list-leave-to {
        opacity: 0;
        transform: translateX(100px);
    }
    .post-list-move {
        transition: transform .5s ease;
    }
</style>