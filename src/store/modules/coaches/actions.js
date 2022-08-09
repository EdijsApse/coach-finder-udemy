export default {
  registerCoach(context, data) {
    const coach = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate
    }
    context.commit('registerCoach', coach);
  }
};