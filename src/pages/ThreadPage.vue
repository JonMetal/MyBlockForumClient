<script>
import Message from '../components/Message.vue';
import InputMessage from '../components/InputMessage.vue';
import NavigationMenu from '../components/NavigationMenu.vue';
import { fetchAllStatuses, fetchCreateMessage, fetchEditMessage, fetchDeleteMessage, fetchMessages, getCookie, fetchThread, fetchThreadTheme, fetchUsersFromThread } from '../axios';
import router from '../router';
import KarmaDisplay from '../components/KarmaDisplay.vue';
import ProfilePreview from '../components/ProfilePreview.vue';

export default {
    data() {
        return {
            messages: new Array,
            thread: {},
            threadTheme: {},
            userId: "",
            users: new Array,
            statuses: new Array
        }
    },
    async beforeMount() {
        try {
            this.statuses = await fetchAllStatuses();
            this.users = await fetchUsersFromThread(this.id);
            this.userId = await getCookie("user_cookie");
            this.thread = await fetchThread(this.id);
            this.threadTheme = await fetchThreadTheme(this.thread.threadThemeId);
            this.messages = await fetchMessages(this.id);
            console.log(this.users);
        }
        catch (error) {
            console.error("Error fetching thread or messages:", error);
        }
    },
    methods: {
        async updateMessages() {
            this.messages = await fetchMessages(this.id);
        },
        async deleteMessage(messageId) {
            await fetchDeleteMessage(messageId);
            this.updateMessages()
        },
        async saveEditedMessage(messageId, messageText) {
            const editedMessage = this.messages.find(msg => msg.id === messageId);
            editedMessage.text = messageText;
            const data = await fetchEditMessage(editedMessage);
            console.log(data);
            this.updateMessages()
        },
        async createMessage(messageText) {
            const message = {
                id: 0,
                userId: this.userId,
                threadId: this.id,
                text: messageText
                
            };
            await fetchCreateMessage(message);
            this.updateMessages();
        },
        toMainPage() {
            router.push('/');
        },
        toThreadsPage() {
            router.push(`/threads/${false}`);
        }
    },
    props: {
    id: String
    },
    components: {
        Message,
        InputMessage,
        NavigationMenu,
        KarmaDisplay,
        ProfilePreview
    }
}
</script>

<template>
<header>
    <span>Название: {{ thread.title }}</span>
    <span>Описание: {{ thread.description }}</span>
    <span>Тема: {{ threadTheme.title }}</span>
</header>
<NavigationMenu></NavigationMenu>
<div style="display: flex; flex-direction: row;">
    <div class="app-container">
    <section v-for="message in messages" style="display: flex; flex-direction: row;">
    <Message
        :id="message.id" 
        :message="message.text"
        :senderId="message.userId"
        :userId="this.userId"
        @delete="this.deleteMessage"
        @save="this.saveEditedMessage"
        />
    <KarmaDisplay style="margin-left: 10px; position: relative; right: 0;"
    :ownerId="message.userId"
    :userId="this.userId"
    />
</section>
</div>

<section>
    <ProfilePreview
        v-for="user in users"
        :description=null
        :nickname="user.nickname"
        :karma="user.karma"
        :status="statuses.find((status) => user.statusId == status.id).title"
    />
</section>
</div>

<footer>
    <InputMessage @send="this.createMessage"/>
</footer>

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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    background-color: rgb(64, 62, 60);
    border-color: rgb(32, 32, 32);
    border-radius: 10px;
    padding: 10px;
    margin-right: 10px;
}
footer {
    flex-shrink: 0;
    width: 100%;
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