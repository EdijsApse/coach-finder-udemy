<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filters="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="canRegisterAsCoach" :link="true" to="/register"
            >Register as Coach</base-button
          >
          <base-button v-else :link="true" to="/auth?redirect=register"
            >Login to register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches && !isLoading">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            v-bind="coach"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found</h3>
      </base-card>
    </section>
  </div>
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
        career: true,
      },
      isLoading: false,
      error: null,
    };
  },
  created() {
    this.loadCoaches();
  },
  components: {
    'coach-item': CoachListItem,
    'coach-filter': CoachFilter,
  },
  computed: {
    canRegisterAsCoach() {
      return this.isAuthenticated && !this.isCoach && !this.isLoading;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach() {
      return this.$store.getters['coachesModule/isCoach'];
    },
    hasCoaches() {
      return this.$store.getters['coachesModule/hasCoaches'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coachesModule/coaches'];
      return coaches.filter((coach) => {
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
    },
  },
  methods: {
    handleError() {
      this.error = null;
    },
    async loadCoaches(forceRefresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch('coachesModule/loadCoaches', {
          forceRefresh,
        });
      } catch (err) {
        this.error = err.message || 'Something went wrong!';
      }

      this.isLoading = false;
    },
    filterApplies(area, coachAreas) {
      return this.activeFilters[area] === true && coachAreas.includes(area);
    },
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
  },
};
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
