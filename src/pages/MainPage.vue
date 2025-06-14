<script>
import { getCookie } from '../axios';
import router from '../router';
export default {
    data() {
        return {
        }
    },
    async mounted() {
        if(await getCookie("user_cookie") === "") {
            this.toLoginPage()
        }
        else {
            console.log("User is logged in")
        }
    },
    methods: {
        toThreadsPage() {
            router.push('/threads')
        },
        toLoginPage() {
            router.push("/login")
        },
        toProfilePage() {
            router.push('/profile')
        }
    },
 }
</script>

<template>
    <head>
    </head>
    <header style="display: block;">
        <button @click="toProfilePage"> Перейти в свой профиль</button>
        <button @click="toThreadsPage"> Перейти к списку тредов</button>
        
    </header>
    <div>
        <button @click="toLoginPage"> Авторизация</button>
    </div> 
</template>

<style scoped>

</style>