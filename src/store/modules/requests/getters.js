export default {
  requests(state, getters, rootState, rootGetters) {
    return state.requests.filter(req => req.coachId === rootGetters.userId);
  },
  hasRequests(state, getters) {
    return getters.requests.length > 0;
  }
};