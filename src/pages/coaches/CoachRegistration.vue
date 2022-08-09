<template>
  <section>
    <base-card>
      <h2>Register as a Coach now</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
  import CoachForm from '../../components/coaches/CoachForm';
  export default {
    components: {
      'coach-form': CoachForm
    },
    methods: {
      saveData(data) {
        this.$store.dispatch('coachesModule/registerCoach', data)
        this.$router.replace('/coaches');
      }
    }
  }
</script>