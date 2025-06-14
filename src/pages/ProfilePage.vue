<script>
import { fetchDeleteUser, fetchEditUser, fetchUser, getCookie, fetchUserThreads, fetchThreadThemes} from '../axios';
import ThreadPreview from '../components/ThreadPreview.vue';
import router from '../router';

export default {
  data() {
    return {
        userId: "",
        nickname: "",
        description: "",
        karma: 0,
        userThreads: new Array,
        threadThemes: new Array
    };
  },
  async beforeMount() {
    this.userId = await getCookie("user_cookie");
    await fetchUser(this.userId).then(user => {
      this.nickname = user.nickname;
      this.description = user.description;
      this.karma = user.karma;
    });
    this.userThreads = await fetchUserThreads(this.userId);
    this.threadThemes = await fetchThreadThemes();
  },
  methods: {
    toThreadsPage() {
        router.push('/threads');
    },
    toLoginPage() {
        router.push('/login');
    },
    toRatingKarmaPage() {
        router.push('/rating-karma');
    },
    async editProfile() {
        const user = await fetchUser(this.userId);
        user.nickname = prompt("Введите новый ник:", user.nickname) || user.nickname;
        user.description = prompt("Введите новое описание профиля:", user.description) || user.description;
        await fetchEditUser(user);
        alert("Профиль успешно обновлен.");
        location.reload();
    },
    async deleteAccount() {
        const result = confirm("Вы уверены, что хотите удалить аккаунт? Это действие необратимо.");
        if (result) {
            await fetchDeleteUser(this.userId)
            alert("Аккаунт удален.");
            router.push('/login');
        } else {
            alert("Удаление аккаунта отменено.");
        }
    },
    async move(threadIndex) {
        await router.push(`/thread/${threadIndex}`);
    }
  },
  components: {
    ThreadPreview
  }
};
</script>

<template>
<header>
    <div class="app-container">
        <section>
            <span>Профиль пользователя</span>
            <span>Ваш ник: {{ nickname }}</span>
            <span>Описание профиля: {{ description }}</span>
            <span>Уровень кармы: {{ karma }}</span>
        </section>
        <section>
            <button @click="editProfile">Редактировать профиль</button>
            <button @click="deleteAccount">Удалить аккаунт</button>
        </section>
        <footer>
            <button @click="toThreadsPage">К тредам</button>
            <button @click="toRatingKarmaPage">К рейтингу кармы</button>
            <button @click="toLoginPage">Выйти</button>
        </footer>
    </div>
</header>
    <div>
        <span v-if="userThreads.length === 0">Нет ваших тредов</span>
        <span v-if="userThreads.length > 0">Всего ваших тредов: {{ userThreads.length }}</span>
        <ThreadPreview
            v-for="(thread) in userThreads"
            :id="thread.id"
            :title="thread.title"
            :description="thread.description"
            :threadTheme="(threadThemes.find((theme) => theme.id === thread.threadThemeId)).title"
            :userIsJoin="(userThreads.find((userThread) => userThread.id === thread.id) !== undefined)"
            @move="this.move"
        />
    </div>
</template>

<style scoped>
header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}
section {
    max-width: 450px;
    max-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    background-color: rgb(64, 62, 60);
    border-color: rgb(32, 32, 32);
    border-radius: 10px;
    padding: 10px;
    margin-right: 10px;
}
.app-container {
    display: flex;
    flex-direction: column;
}
main {
    flex: 1 0 auto;
}
button {
    margin: 5px;
}   
</style>