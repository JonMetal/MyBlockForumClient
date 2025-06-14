<script>
import { fetchUsers, fetchAllStatuses } from '../axios';
import NavigationMenu from '../components/NavigationMenu.vue';
import ProfilePreview from '../components/ProfilePreview.vue';
export default {
  data() {
    return {
        users: [],
        statuses: []
    }
  },
  async beforeMount() {
    this.statuses = await fetchAllStatuses();
    this.users = await fetchUsers();
    users.sort((a, b) => b.karma - a.karma);
  },
  methods: {

  },
  components: {
    ProfilePreview,
    NavigationMenu
  }
};
</script>

<template>
<NavigationMenu></NavigationMenu>
<ProfilePreview
    v-for="user in users"
    :nickname="user.nickname"
    :karma="user.karma"
    :description="user.description"
    :status="statuses.find(status => status.id === user.statusId).title"
    />
</template>

<style scoped>

</style>