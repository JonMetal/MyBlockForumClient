<script>
import { fetchThreads, fetchThreadThemes, getCookie , fetchUserThreads, fetchUserJoinToThread } from '../axios';
import NavigationMenu from '../components/NavigationMenu.vue';
import ThreadPreview from '../components/ThreadPreview.vue';
import router from '../router';
export default {
    data() {
        return {
            threads: new Array,
            threadThemes: new Array,
            userThreads: new Array
        }
    },
    async beforeMount() {
        this.userId = await getCookie("user_cookie")
        this.userThreads = await fetchUserThreads(this.userId);
        this.threads = await fetchThreads();
        this.threadThemes = await fetchThreadThemes()

        console.log(this.userId)
        console.log("ThreadsPage mounted")
        console.log(this.threads)
        console.log(this.threadThemes)
    },
    methods: {
        async join(threadIndex) {
            await fetchUserJoinToThread(this.userId, threadIndex);
            this.threads.find((thread) => thread.id === threadIndex).userIsJoin = true;
            await router.push(`/thread/${threadIndex}`);       
        },
        async move(threadIndex) {
            await router.push(`/thread/${threadIndex}`);
        },
        async toCreateThreadPage() {
            await router.push('/thread/create');
        }
    },
    components: {
        ThreadPreview,
        NavigationMenu
    }
 }
</script>

<template>
    <NavigationMenu></NavigationMenu>
    <div class="threads-page">
        <div v-if="threads.length === 0">
        <span>Нет тредов</span>  
        </div>
        <span v-if="threads.length > 0">Всего тредов: {{ threads.length }} </span>
        <ThreadPreview
            v-for="(thread) in threads"
            :id="thread.id"
            :title="thread.title"
            :description="thread.description"
            :threadTheme="(threadThemes.find((theme) => theme.id === thread.threadThemeId)).title"
            :userIsJoin="(userThreads.find((userThread) => userThread.id === thread.id) !== undefined)"
            @join="this.join"
            @move="this.move"
        />
    </div>
    <button @click="this.toCreateThreadPage">
        Создать тред
    </button>
</template>

<style scoped>
.threads-page {
    flex-direction: column;
    align-items: flex-start !important;
    text-align: left !important;
    width: 100%;
}
.threads-page span {
    margin-top: 10px;
    margin-right: 10px;
    align-self: flex-start;  /* прижать к левой стороне */
}
</style>