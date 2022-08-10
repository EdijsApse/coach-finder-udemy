export default {
  async contactCoach(context, payload) {
    const request = {
      userEmail: payload.email,
      message: payload.message
    }

    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DB_URL}/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(request)
    });
    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.message || 'Cannot contact coach');
      throw err;
    }

    context.commit('addRequest', {
      ...request,
      id: responseData.name
    });
  },
  async fetchRequests(context) {
    const response = await fetch(`${process.env.VUE_APP_FIREBASE_DB_URL}/requests/${context.rootGetters.userId}.json?auth=${context.rootGetters.token}`);
    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.message || 'Couldn\'t fetch requests!');
      throw err;
    }

    const requests = [];

    for (const key in responseData) {
      requests.push({
        ...responseData[key],
        id: key
      })
    }

    context.commit('setRequests', requests);

  }
};