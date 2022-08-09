export default {
  contactCoach(context, payload) {
    const request = {
      id: Date.now().toString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    }
    context.commit('addRequest', request);
  }
};