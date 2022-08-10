export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coach = {
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate
    }

    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DB_URL}/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coach)
    });

    if (!response.ok) {
      alert('Something went wrong!')
    }
    
    context.commit('registerCoach', {
      ...coach,
      id: userId
    });
    
  },
  async loadCoaches(context) {
    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DB_URL}/coaches.json`);
    const responseData = await response.json();
    
    if (!response.ok) {
      const err = new Error(responseData.message || 'Failed to fetch');
      throw err;
    }

    const coaches = [];

    for (const key in responseData) {
      coaches.push({
        ...responseData[key],
        id: key
      })
    }
    context.commit('setCoaches', coaches);
  }
};