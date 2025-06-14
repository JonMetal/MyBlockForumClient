<script>
import { fetchLogin, getCookie, fetchUpdateUserStatus } from '../axios';
import router from '../router';
export default {
    data() {
        return {
            login: "",
            password: ""
        }
    },
    methods: {
        async loginAccount(login, password) {
            try {
                await fetchLogin(login, password);
                console.log("Login successful")
                const userId = await getCookie('user_cookie');
                if(userId != null) {
                  fetchUpdateUserStatus(userId, 1);
                } 
                await router.push('/')
            }
            catch {
                alert("Authentication error")
            }
        },
        toRegistryPage() {
            router.push('/registry')
        }
    }
 }
</script>

<template>
<span>Я страница авторизации</span>
<input v-model="this.login">
<input v-model="this.password" type="password">
<button @click="this.loginAccount(this.login, this.password)">Войти</button>
<button @click="this.toRegistryPage">Го регистрироваться</button>
</template>

<style scoped>
* {
    display: flex;
}
</style>