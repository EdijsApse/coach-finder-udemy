<template>
  <section>
    <coach-filter @change-filters="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button :link="true" to="/register">Register as Coach</base-button>
      </div>
      <ul v-if="hasCoaches">
        <coach-item v-for="coach in filteredCoaches" :key="coach.id" v-bind="coach"></coach-item>
      </ul>
      <h3 v-else>No coaches found</h3>
    </base-card>
  </section>
</template>

<script>
  import CoachListItem from '../../components/coaches/CoachItem';
  import CoachFilter from '../../components/coaches/CoachFilter';
  export default {
    data() {
      return {
        activeFilters: {
          frontend: true,
          backend: true,
          career: true
        }
      }
    },
    components: {
      'coach-item': CoachListItem,
      'coach-filter': CoachFilter
    },
    computed: {
      hasCoaches() {
        return this.$store.getters['coachesModule/hasCoaches'];
      },
      filteredCoaches() {
        const coaches = this.$store.getters['coachesModule/coaches'];
        return coaches.filter(coach => {
          if (this.filterApplies('frontend', coach.areas)) {
            return true;
          }
          
          if (this.filterApplies('backend', coach.areas)) {
            return true;
          }
          
          if (this.filterApplies('career', coach.areas)) {
            return true;
          }

          return false;
        });
      }
    },
    methods: {
      filterApplies(area, coachAreas) {
        return this.activeFilters[area] === true && coachAreas.includes(area);
      },
      setFilters(updatedFilters) {
        this.activeFilters = updatedFilters;
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