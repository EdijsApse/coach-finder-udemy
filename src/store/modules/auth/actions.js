let timer;

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

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
      context.dispatch('logout');
    }, expiresIn)

    context.commit('setUser', {
      userId: responseData.localId,
      token: responseData.idToken
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    if (token && userId) {
      
      timer = setTimeout(function() {
        context.dispatch('logout');
      }, expiresIn);

      context.commit('setUser', {
        userId: userId,
        token: token
      });
    }
  },
  logout(context) {
    context.commit('setUser', {
      userId: null,
      token: null
    })

    clearTimeout(timer);
      
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
  }
};
