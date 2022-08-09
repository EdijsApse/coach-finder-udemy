<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: firstname.isValid === false }">
      <label for="firstname">First Name</label>
      <input type="text" id="firstname" v-model.trim="firstname.value" />
      <p v-if="firstname.isValid === false">Firstname must not be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: lastname.isValid === false }">
      <label for="lastname">Last Name</label>
      <input type="text" id="lastname" v-model.trim="lastname.value" />
      <p v-if="lastname.isValid === false">Lastname must not be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: description.isValid === false }">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model.trim="description.value"></textarea>
      <p v-if="description.isValid === false">Description must not be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: hourlyrate.isValid === false }">
      <label for="hourlyrate">Hour rate</label>
      <input id="hourlyrate" type="number" v-model.number="hourlyrate.value" />
      <p v-if="hourlyrate.isValid === false">Hour rate must not be empty and must be greater then 0!</p>
    </div>
    <div class="form-control" :class="{ invalid: areas.isValid === false }">
      <h3>Areas of expertise</h3>
      <div>
        <input id="frontend" value="frontend" type="checkbox" v-model="areas.value" />
        <label for="frontend">Front-End Development</label>
      </div>
      <div>
        <input id="backend" value="backend" type="checkbox" v-model="areas.value" />
        <label for="backend">Back-End Development</label>
      </div>
      <div>
        <input id="career" value="career" type="checkbox" v-model="areas.value" />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="areas.isValid === false">Please select atleast one checkbox!</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again!</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
  export default {
    emits: ['save-data'],
    data() {
      return {
        firstname: {
          value: '',
          isValid: true,
        },
        lastname: {
          value: '',
          isValid: true,
        },
        hourlyrate: {
          value: 0,
          isValid: true,
        },
        areas: {
          value: [],
          isValid: true,
        },
        description: {
          value: '',
          isValid: true,
        },
        formIsValid: true,
      }
    },
    methods: {
      validateForm() {
        this.formIsValid = true;
        this.firstname.isValid = true;
        this.lastname.isValid = true;
        this.hourlyrate.isValid = true;
        this.areas.isValid = true;
        this.description.isValid = true;

        if (this.firstname.value === '') {
          this.firstname.isValid = false;
          this.formIsValid = false;
        }

        if (this.lastname.value === '') {
          this.lastname.isValid = false;
          this.formIsValid = false;
        }

        if (this.hourlyrate.value <= 0 || !this.hourlyrate.value) {
          this.hourlyrate.isValid = false;
          this.formIsValid = false;
        }

        if (this.areas.value.length === 0) {
          this.areas.isValid = false;
          this.formIsValid = false;
        }

        if (this.description.value === '') {
          this.description.isValid = false;
          this.formIsValid = false;
        }

      },
      submitForm() {
        this.validateForm();

        if (!this.formIsValid) {
          return;
        }

        const formData = {
          first: this.firstname.value,
          last: this.lastname.value,
          rate: this.hourlyrate.value,
          areas: this.areas.value,
          desc: this.description.value
        }

        this.$emit('save-data', formData)
      }
    }
  }
</script>

<style scoped>
  .form-control {
    margin: 0.5rem 0;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  input[type='checkbox'] + label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
  }

  input,
  textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
  }

  input:focus,
  textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
  }

  input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
  }

  input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
  }

  .invalid label {
    color: red;
  }

  .invalid input,
  .invalid textarea {
    border: 1px solid red;
  }
</style>