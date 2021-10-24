<template>
    <div>
        <h1>Page with posts</h1>
        <my-input
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Search"
            v-focus
        />
        <div class="btn-wrapper">
            <my-button @click="fetchPosts" class="mt-20">Get posts</my-button>
            <my-select 
                model-value="selectedSort"
                :options="sortOptions"
                @update:model-value="setSelectedSort"
                class="mt-20"
            />
            <my-button @click="showDialog" class="mt-20">Create post</my-button>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @createPost="createPost" />
        </my-dialog>
        <post-list
            v-if="!isPostLoading"
            :posts="sortedAndSearchPosts"
            @removePost="removePost"
        />
        <h3 v-else>Loading...</h3>
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import axios from "axios"
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            fetchPosts: 'post/fetchPosts',
            loadMorePosts: 'post/loadMorePosts',
        }),
        createPost(post) {
            if (post.title && post.body) {
                this.posts.push(post);
                this.dialogVisible = false;
            }
        },
        removePost(post) {
            this.posts = this.posts.filter((p) => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostLoading: state => state.post.isPostLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchPosts: 'post/sortedAndSearchPosts',
        }),
    },
    mounted() {
        this.fetchPosts()
    },
}
</script>

<style>
    .wrapper {
        padding: 15px;
    }

    .as-fe {
        align-self: flex-end;
    }

    .btn-wrapper {
        display: flex;
        justify-content: space-between;
    }

    .page__wrapper{
        display: flex;
        margin-top: 15px;
    }

    .page {
        border: 1px solid teal;
        padding: 10px;
    }

    .page:hover{
        cursor: pointer;
    }

    .current-page {
        background-color: teal;
        color: white;
        transition: .3s;
    }

    .observer {
        height: 30px;
        background-color: #ccc;
    }
</style>