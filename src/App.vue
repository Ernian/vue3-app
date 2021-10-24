<template>
    <navbar></navbar>
    <div class="wrapper">
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from "@/components/UI/Navbar"

export default {
    components:{
        Navbar,
    }
}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .mt-20 {
        margin-top: 20px;
    }
    .df {
        display: flex;
    }
    .ml-a {
        margin-left: auto;
    }
    .mr-20 {
        margin-right: 20px;
    }
</style>