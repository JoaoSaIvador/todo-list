<template>
  <div class="primary-div">
    <b-container class="h-100 d-flex align-items-center">
      <b-container
        class="page-content d-flex flex-column align-items-center bg-light p-5"
      >
        <h2 class="mb-3">Sign up</h2>
        <b-form @submit.prevent="onSubmit">
          <div>
            <b-form-group
              id="username-label"
              label="Username:"
              label-for="username"
            >
              <b-input
                id="username"
                v-model.trim="user.username"
                placeholder="Enter your username"
              ></b-input>
            </b-form-group>
          </div>

          <div class="mt-3">
            <b-form-group id="email-label" label="Email:" label-for="email">
              <b-input
                id="email"
                v-model.trim="user.email"
                placeholder="Enter your email"
              ></b-input>
            </b-form-group>
          </div>

          <div class="mt-3">
            <b-form-group
              id="password-label"
              label="Password:"
              label-for="username"
            >
              <b-input
                id="password"
                v-model.trim="user.password"
                type="password"
                placeholder="Enter your password"
              ></b-input>
            </b-form-group>
          </div>

          <div class="d-flex flex-row justify-content-center">
            <b-button class="mt-3" variant="dark" type="submit">
              Register
            </b-button>
            <b-button
              class="mt-3 ms-2 btn"
              variant="outline-dark"
              @click="$router.push('login')"
            >
              Login
            </b-button>
          </div>
        </b-form>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import axios from "axios/dist/axios";

export default {
  data() {
    return {
      user: {
        username: null,
        password: null,
        email: null,
      },
    };
  },
  methods: {
    onSubmit() {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
            mutation Mutation($registerInput: RegisterInput) {
              registerUser(registerInput: $registerInput) {
                username
                email
                password
                token
              }
            }
          `,
          variables: {
            registerInput: {
              username: this.user.username,
              email: this.user.email,
              password: this.user.password,
            },
          },
        },
      }).then(() => {
        this.$router.push("/");
      });
    },
    onReset() {
      this.user = null;
    },
  },
};
</script>

<style scoped>
.page-content {
  width: 500px;
  height: auto;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 14px 28px,
    rgba(0, 0, 0, 0.05) 0px 10px 10px;
}
</style>
