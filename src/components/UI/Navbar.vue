<template>
    <div class="navbar">
        <h3 @click="$router.push('/')">Vue navbar</h3>
        <div class="navbar__btn">
            <my-button @click="$router.push('/posts')">Posts</my-button>
            <my-button 
                @click="$router.push('/about')"
                style="margin-left: 20px"
            >
                About
            </my-button>
            <my-button @click="$router.push('/store')" style="margin-left: 20px">Store</my-button>
            <my-button @click="$router.push('/composition')" style="margin-left: 20px">Composition</my-button>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    h3:hover{
        cursor: pointer;
    }
    .navbar {
        display: flex;
        height: 50px;
        background-color: rgb(188, 253, 191);
        box-shadow: 2px 2px 4px gray;
        align-items: center;
        padding: 0 15px;
    }

    .navbar__btn {
        margin-left: auto;
    }
</style>    