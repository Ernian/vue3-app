<template>
    <div class="wrapper">
        <h1>Page with posts</h1>
        <div class="btn-wrapper">
            <my-button @click="fetchPosts"> Get posts </my-button>
            <my-button @click="showDialog"> Create post </my-button>
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @createPost="createPost" />
        </my-dialog>
        <post-list
            v-if="!isPostLoading"
            :posts="posts" 
            @removePost="removePost"
        />
        <h3 v-else>Loading...</h3>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

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
        fetchPosts() {
            try {
                this.isPostLoading = true
                fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
                    .then((response) => response.json())
                    .then((data) => this.posts = data);
            } catch (error) {
                alert("Error");
            } finally {
                this.isPostLoading = false
            }
        },
    },
    mounted() {
        this.fetchPosts();
    },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

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
</style>