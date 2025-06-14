<script>
import { fetchAddKarma, fetchRemoveVoteKarma, fetchUser } from '../axios';
export default {
    data() {
        return {
            karma: 0
        }
    },
    async beforeMount() {
        this.karma = await fetchUser(this.ownerId).then(user => user.karma);
    },
    props: {
        userId: "",
        ownerId: ""
    },
    methods: {
        async increaseKarma() {
            try {
                const data = await fetchAddKarma(this.userId, this.ownerId);
                if(data == true) {
                    this.karma += 1;
                } else {
                    alert("Вы уже проголосовали за этого пользователя");
                }
            }
            catch (error) {
                console.error("Error increasing karma:", error);
            }
            
        },
        async decreaseKarma() {
            try {
                const data = await fetchRemoveVoteKarma(this.userId, this.ownerId);
                if(data == true) {
                    this.karma -= 1;
                } else {
                    alert("Вы уже проголосовали за этого пользователя");
                }
            }
            catch (error) {
                console.error("Error increasing karma:", error);
            }
        }
    }
}
</script>

<template>
    <section class="karma-display">
        <span>Уровень кармы: {{ karma }}</span>
        <div>
            <button @click="increaseKarma">+</button>
            <button @click="decreaseKarma">-</button>
        </div>
    </section>
</template>

<style scoped>
    div {
        display: flex;
        flex-direction: row;
    }
    .karma-display {
        display: flex;
        align-items: center;
    }
    button {
        cursor: pointer;
        padding: 5px 10px;
        border: none;
        background-color: #007BFF;
        color: white;
        border-radius: 5px;
    }
    button:hover {
        background-color: #0056b3;
    }
</style>