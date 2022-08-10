<template>
  <base-dialog :show="!!error" title="Failed fetching requests!" @close="error = null">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
    <header>
      <h2>Received requests</h2>
    </header>
    <base-spinner v-if="isLoading"></base-spinner>
    <ul v-else-if="!isLoading && hasRequests">
      <request-item v-for="request in receivedRequest" :key="request.id" :email="request.userEmail" :message="request.message"></request-item>
    </ul>
    <h3 v-else>You havent received any requests!</h3>
    </base-card>
  </section>
</template>

<script>
  
  import RequestItem from '../../components/requests/RequestItem';

  export default {
    data() {
      return {
        isLoading: false,
        error: null
      }
    },
    computed: {
      receivedRequest() {
        return this.$store.getters['requestsModule/requests']
      },
      hasRequests() {
        return this.$store.getters['requestsModule/hasRequests']
      }
    },
    methods: {
      async fetchRequests() {
        this.isLoading = true;
        try {
          await this.$store.dispatch('requestsModule/fetchRequests');
        } catch(err) {
          this.error = err.message || 'Couldn\t fetch requests! Try again later!'
        }
        this.isLoading = false;
      }
    },
    created() {
      this.fetchRequests();
    },
    components: {
      'request-item': RequestItem
    }
  }
</script>

<style scoped>
  header {
    text-align: center;
  }

  ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
  }

  h3 {
    text-align: center;
  }
</style>