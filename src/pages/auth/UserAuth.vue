<template>
  <div>
    <base-dialog :show="!!error" title="Action failed!" @close="error = null">
      <p>{{ error }}</p> 
    </base-dialog>
    <base-card>
      <base-spinner v-if="isLoading"></base-spinner>
      <form @submit.prevent="submitForm" v-else>
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">Enter valid email address and password which contains atleast 6 chartacters!</p>
        <base-button>{{ submitFormButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode"
          >{{ switchModeButtonCaption }}</base-button
        >
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null
    };
  },
  computed: {
    isLoginMode() {
      return this.mode === 'login';
    },
    switchModeButtonCaption() {
      return this.isLoginMode ? 'Signup instead' : 'Login instead';
    },
    submitFormButtonCaption() {
      return this.isLoginMode ? 'Login' : 'Sign Up';
    }
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;

      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.lenghth < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;
      try {
        if (this.isLoginMode) {
          await this.$store.dispatch('login', { email: this.email, password: this.password });
        } else {
          await this.$store.dispatch('signup', { email: this.email, password: this.password });
        }
        this.$router.replace('/coaches');
      }
      catch(err) {
        this.error = err.message || 'Failed to authenticate! Try again later!';
      }

      this.isLoading = false;

    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login'
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
