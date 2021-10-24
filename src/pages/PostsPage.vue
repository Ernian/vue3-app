<template>
    <div>
        <h1>Page with posts</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Search"
            v-focus
        />
        <div class="btn-wrapper">
            <my-button @click="fetchPosts" class="mt-20">Get posts</my-button>
            <my-select 
                v-model="selectedSort"
                :options="sortOptions"
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

export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 5,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'For title'},
                {value: 'body', name: 'For body'},
            ],
        };
    },
    methods: {
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
        async fetchPosts() {
            try {
                this.isPostLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data
            } catch (error) {
                alert("Error");
            } finally {
                this.isPostLoading = false;
            }
        },
        async loadMorePosts() {
            try {
                this.page+=1
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data]
            } catch (error) {
                alert("Error");
            }
        },
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((prevPost, nextPost) => {
                return prevPost[this.selectedSort]?.localeCompare(nextPost[this.selectedSort]) 
            })
        },

        sortedAndSearchPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        },
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