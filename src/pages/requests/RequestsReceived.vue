<template>
  <section>
    <base-card>
    <header>
      <h2>Received requests</h2>
    </header>
    <ul v-if="hasRequests">
      <request-item v-for="request in receivedRequest" :key="request.id" :email="request.userEmail" :message="request.message"></request-item>
    </ul>
    <h3 v-else>You havent received any requests!</h3>
    </base-card>
  </section>
</template>

<script>
  
  import RequestItem from '../../components/requests/RequestItem';

  export default {
    computed: {
      receivedRequest() {
        console.log(this.$store.getters['requestsModule/requests'])
        return this.$store.getters['requestsModule/requests']
      },
      hasRequests() {
        return this.$store.getters['requestsModule/hasRequests']
      }
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