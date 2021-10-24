import axios from "axios"

export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 5,
        totalPages: 0,
        sortOptions: [
            { value: 'title', name: 'For title' },
            { value: 'body', name: 'For body' },
        ],
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((prevPost, nextPost) => {
                return prevPost[state.selectedSort]?.localeCompare(nextPost[state.selectedSort])
            })
        },
        sortedAndSearchPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        },
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, bool) {
            state.isPostLoading = bool
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
        setPage(state, page) {
            state.page = page
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
    },
    actions: {
        async fetchPosts({ state, commit }) {
            try {
                commit('setLoading', true)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
            } catch (error) {
                console.log(error, 'fetchPost')
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({ state, commit }) {
            try {
                commit('setPage', ++state.page)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data])
            } catch (error) {
                console.log(error, 'loadMore')
            }
        },
    },
    namespaced: true,
}