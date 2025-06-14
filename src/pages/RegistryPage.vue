<script>
import { fetchCreateUser } from '../axios';
import router from '../router';
export default {
    data() {
        return {
            nickname: "",
            login: "",
            password: "",
            description: ""
        }
    },
    methods: {
        createAccount(nickname, login, password, description) {
            console.log(login)
            console.log(password)
            console.log(description)
            console.log(nickname)
            const user = {
                id: 0,
                login: login,
                password: password,
                nickname: nickname,
                description: description,
                //karma: 0,
                //statusId: 1,
                //roleId: 1
            }
            console.log(user)
            fetchCreateUser(user)
            router.push('/login');
        },
        cancel() {
            router.back();
        }
    }
 }
</script>

<template>
<span>Ваш ник</span>
<input v-model="this.nickname">
<span>Логин</span>
<input v-model="this.login">
<span>Пароль</span>
<input v-model="this.password">
<span>Описание профиля</span>
<input v-model="this.description">
<button @click="this.createAccount(this.nickname, this.login, this.password, this.description)">Зарегистрироваться</button>
<button @click="this.cancel">Выйти</button>
</template>

<style scoped>
* {
    display: flex;
}
</style>