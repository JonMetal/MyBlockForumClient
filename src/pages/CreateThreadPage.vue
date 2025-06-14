<script>
import { fetchCreateThread, fetchThreadThemes } from '../axios';
import ComboBox from 'proxima-vue/field/combobox';
import router from '../router';
export default {
    data() {
        return {
            threadThemes: new Array,
            threadThemesTitle: new Array,
            selectedTheme: "",
            threadTitle: "",
            threadDescription: ""
        }
    },
    async beforeMount() {
        this.threadThemes = await fetchThreadThemes();
        this.threadThemesTitle = this.threadThemes.map((theme) => {
            return theme.title
        });
        console.log(this.threadThemes);
        console.log(this.threadThemesTitle);
        this.selectedTheme = this.threadThemesTitle[0]; 
    },
    methods: {
        async createThread() {
            try {
                if (this.selectedTheme === null) {
                alert("Выберите тему треда");
                return;
            }
            const selectedThemeId = await this.threadThemes.find((theme) => theme.title === this.selectedTheme).id;
            const thread = {
                id: 0,
                title: this.threadTitle,
                description: this.threadDescription,
                threadThemeId: selectedThemeId
            }
            const data = await fetchCreateThread(thread)
            thread.id = data.id;
            router.push(`/thread/${thread.id}`);
            }
            catch {
                throw new Error("Не удалось создать тред");
            }
        }
    },
    components: {
        ComboBox
    }
 }
</script>

<template>
    <div>
        <span>Название треда</span>
        <input type="text" v-model="this.threadTitle" placeholder="Введите название треда" />
        <span>Описание треда</span>
        <input type="text" v-model="this.threadDescription" placeholder="Введите описание треда" />
    </div>
<div>
    <ComboBox style="color: grey;"
    v-model="this.selectedTheme"
    :options="this.threadThemesTitle"
    label="Выберите тему треда"
    />
</div>

    <button @click="this.createThread">Создать тред</button>
</template>

<style scoped>
    div {
    display: flex;
    flex-direction: column;
    }
</style>