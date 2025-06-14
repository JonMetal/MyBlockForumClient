<script>
 export default {
    props: ['id', 'title', 'description', 'threadTheme', 'userIsJoin'],
    methods: {
        join() {
            this.$emit("join", this.id)
        },
        move() {
            this.$emit("move", this.id)
        }
    }
 }
</script>

<template>
    <section>
        <div>
        <span>{{ this.title }} |</span>
        <span>{{ this.threadTheme }}</span>      
        </div>
        <span style="font-size: 8pt;">{{ this.description }}</span>
        <button v-if="this.userIsJoin === false" @click="this.join">Присоединиться</button>
        <button v-else @click="this.move">Перейти</button>
    </section>
</template>

<style scoped>
    section {
        max-width: 450px;
        max-height: 200px;
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

    div {
        display: block;
    }
    span {
        margin-right: 20px;
    }
    button {
        margin-right: 10px;
    }
</style>