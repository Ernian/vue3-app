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
        </div>
        <post-list
            v-if="!isPostLoading"
            :posts="sortedAndSearchedPosts"
        />
        <h3 v-else>Loading...</h3>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import usePosts from '@/hooks/usePosts'
import useSortedPost from '@/hooks/useSortedPosts'
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts'

export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'For title'},
                {value: 'body', name: 'For body'},
            ],
        };
    },
    setup(props) {
        const {posts, totalPages, isPostLoading} = usePosts(15)
        const {sortedPosts, selectedSort} = useSortedPost(posts)
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

        console.log('aa')
        console.log(sortedAndSearchedPosts)
        return {
            posts,
            isPostLoading,
            totalPages,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts,
        }
    }
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