<script>
import { fetchUser } from '../axios';
    export default {
        data() {
            return {
                senderNickname: "",
                isEdited: false,
                editText: ""
            }
        },
        props: {
            id: "",
            message: "",
            senderId: "",
            userId: ""
        },
        emits: ['delete', 'save'],
        async beforeMount() {
            const sender = await fetchUser(this.senderId);
            this.senderNickname = sender.nickname;
            this.editText = this.message;
        },
        methods: {
            deleteMessage() {
                this.$emit('delete', this.id);
            },
            saveEditedMessage() {
                this.$emit('save', this.id, this.editText);
                this.isEdited = false;
            }
        }
    }
</script>

<template>
    <section>
        <div v-if="this.isEdited == false">
            <div>
                <span v-if="this.senderNickname !== ''">Отправил: {{ this.senderNickname }}</span>
                <span>{{ this.message }}</span>
            </div>
            <div v-if="this.senderId == this.userId">
                <button @click="deleteMessage">Удалить</button>
                <button @click="this.isEdited = true">Редактировать</button>
            </div>
        </div>
        <div v-else-if="this.senderId == this.userId">
            <div>
                <span v-if="this.senderNickname !== ''">Отправил: {{ this.senderNickname }}</span>
                <span>Редактируемое сообщение:</span>
                <input type="text" v-model="this.editText"/>
            </div>
            <button @click="this.isEdited = false">Отменить редактирование</button>
            <button @click="this.saveEditedMessage">Сохранить</button>
        </div>
    </section>
</template>

<style scoped>
    section {
        max-width: 550px;
        max-height: 300px;
        display: block;
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
    div {
        display: flex;
        flex-direction: column;
    }
    span {
        font-size: 8pt;
        max-width: 450px;
        max-height: 300px;
        word-wrap: break-word; 
        margin-right: 20px;
    }
    button {
        font-size: 8pt;
        margin-right: 10px;
        margin-bottom: 10px;;
    }
</style>