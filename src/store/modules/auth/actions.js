export default {
  async login(context, payload) {
    await context.dispatch('auth', {
      ...payload,
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`
    })
  },

  async signup(context, payload) {
    await context.dispatch('auth', {
      ...payload,
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`
    })
  },
  async auth(context, payload) {
    const { url, email, password } = payload;

    const formData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const err = new Error(responseData.error.message || 'Authentication failed! Try again!');
      throw err;
    }

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    context.commit('setUser', {
      userId: responseData.localId,
      token: responseData.idToken,
      tokenExpiration: responseData.expiresIn
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        userId: userId,
        token: token,
        tokenExpiration: ''
      });
    }
  },
  logout(context) {
    context.commit('setUser', {
      userId: null,
      token: null,
      tokenExpiration: null
    })
    
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

  }
};
