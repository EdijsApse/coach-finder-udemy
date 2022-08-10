export default {
  coaches(state) {
    return state.coaches
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length !== 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    return getters.coaches.some((coach) => coach.id === rootGetters.userId)
  },
  // Returns true if coaches were fetched more then minute ago!
  shouldUpdate(state) {
    const lastFtech = state.lastFetch;
    
    if (!lastFtech) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();

    return (currentTimeStamp - lastFtech) / 1000 > 60;
  }
};