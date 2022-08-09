<template>
  <section>
    FILTER
  </section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register as a coach</router-link>
    </div>
    <ul v-if="hasCoaches">
      <coach-item v-for="coach in filteredCoaches" :key="coach.id" v-bind="coach"></coach-item>
    </ul>
    <h3 v-else>No coaches found</h3>
  </section>
</template>

<script>
  import CoachListItem from '../../components/coaches/CoachItem';
  export default {
    components: {
      'coach-item': CoachListItem
    },
    computed: {
      hasCoaches() {
        return this.$store.getters['coachesModule/hasCoaches'];
      },
      filteredCoaches() {
        return this.$store.getters['coachesModule/coaches'];
      }
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .controls {
    display: flex;
    justify-content: space-between;
  }
</style>