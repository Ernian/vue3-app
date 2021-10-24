import { ref, computed } from 'vue'

export default function useSortedPosts(posts) {
    const selectedSort = ref('')
    const sortedPosts = computed(() => {
        return [...posts.value].sort((prevPost, nextPost) => {
            return prevPost[selectedSort.value]?.localeCompare(nextPost[selectedSort.value])
        })
    })
    return { selectedSort, sortedPosts }
}