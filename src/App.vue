<template>
  <div class="wrapper">
    <h1>Page with posts</h1>
    <div class="btn-wrapper">
        <my-button 
        @click="fetchPosts"
        >
            Get posts
        </my-button>
        <my-button
            @click="showDialog"
        >
            Create post
        </my-button>
    </div>    
    <my-dialog v-model:show="dialogVisible">
      <post-form @createPost="createPost" />
    </my-dialog>
    <post-list :posts="posts" @removePost="removePost" />
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
    //   posts: [
    //     { id: 1, title: "Some title 1", body: "Body of post 1" },
    //     { id: 2, title: "Some title 2", body: "Body of post 2" },
    //     { id: 3, title: "Some title 3", body: "Body of post 3" },
    //   ],
        posts: [],
        dialogVisible: false,
    };
  },
  methods: {
    createPost(post) {
      if (post.title && post.body) {
        this.posts.push(post);
        this.dialogVisible = false
      }
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
        this.dialogVisible = true
    },
    async fetchPosts() {
        // try{
        //     const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        //     console.log(response);
        //     this.posts = response.data
        // }
        // catch(error) {
        //     alert('Error')
        // }
    },
    mounted() {
        this.fetchPosts()
    },
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