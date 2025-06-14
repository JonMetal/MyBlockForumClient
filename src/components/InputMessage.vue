<script>
export default {
  data() {
    return {
      inputMessage: ""
    };
  },
  async beforeMount() {
     
  },
  methods: {
    sendMessage() {
      if (this.inputMessage.trim() !== "") {
        this.$emit("send", this.inputMessage);
        this.inputMessage = "";
      }
    },
    cancelInput() {
      this.inputMessage = "";
    }
  }
};
</script>

<template>
    <section>
        <input @keyup.enter="sendMessage" type="text" v-model="inputMessage" placeholder="Введите сообщение" />
        <button @click="sendMessage">Отправить</button>
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
    }
</style>