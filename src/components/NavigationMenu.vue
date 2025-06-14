<script>
import router from '../router';
export default {
    data() {
        return {
        }
    },
    methods: {
        toMainPage() {
            router.push('/');
        },
        toThreadsPage() {
            router.push('/threads');
        }
    }
}
</script>

<template>
    <section class="left-absolute" >
        <button @click="toMainPage">Вернуться в главное меню</button>
        <button @click="toThreadsPage">К списку тредов</button>
    </section>
</template>

<style>
.left-absolute {
    position: absolute;
    left: 10px;
    top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(64, 62, 60);
    border-color: rgb(32, 32, 32);
    border-radius: 10px;
    padding: 10px;
    margin-right: 10px;
}
</style>