<script>
export default {
  data() {
    return {
      // Data properties can be added here if needed
    };
  },
  methods: {
    
  },
  props: [
    'nickname',
    'description',
    'karma',
    'status'
  ],
};
</script>

<template>
<section>
    <span v-if="nickname != null">{{ nickname }}</span>
    <span v-if="description != null">{{ description }}</span>
    <span v-if="karma != null">Карма: {{ karma }}</span>
    <span v-if="status != null">Статус: {{ status }}</span>
</section>
</template>

<style scoped>
section {
    max-width: 450px;
    max-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
</style>