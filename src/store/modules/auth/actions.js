export default {
  async login(context, payload) {
    const formData = {
      ...payload,
      returnSecureToken: true
    };

    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`, {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.error.message || 'Can\'t login! Try again later!');
      throw err;
    }

    context.commit('setUser', {
      userId: responseData.localId,
      token: responseData.idToken,
      tokenExpiration: responseData.expiresIn
    });
  },

  async signup(context, payload) {
    const formData = {
      ...payload,
      returnSecureToken: true
    };

    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`, {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.error.message || 'Can\'t signup! Try again later!');
      throw err;
    }

    context.commit('setUser', {
      userId: responseData.localId,
      token: responseData.idToken,
      tokenExpiration: responseData.expiresIn
    });
  },
};
