<script>
  import { fetchAllStatuses, fetchUpdateUserStatus, getCookie } from './axios';
  import router from './router';
  export default {
    async beforeMount() {
      const statuses = await fetchAllStatuses();
      window.addEventListener('beforeunload', this.handleBeforeUnload);
      const userId = await getCookie('user_cookie');
      if(userId != null) {
        await fetchUpdateUserStatus(userId, statuses[1].id)
      }
    },
    methods: {
      async handleBeforeUnload(event) {
        const statuses = await fetchAllStatuses();
        event.preventDefault();
        const userId = await getCookie('user_cookie');
        if(userId != null) {
          await fetchUpdateUserStatus(userId, statuses[0].id);
        }
      }
    }
  }
</script>

<template>
  <router-view/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
