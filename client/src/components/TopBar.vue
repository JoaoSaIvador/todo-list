<template>
  <b-navbar
    type="light"
    variant="light"
    class="todo-navbar d-flex flex-row justify-content-between"
  >
    <b-navbar-brand>Minimal Todo List</b-navbar-brand>
    <b-navbar-nav v-if="isHome" class="ml-auto">
      <b-nav-item @click="$router.push('/')">Home</b-nav-item>
      <b-nav-item @click="logout">Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("login");
    },
  },
  computed: {
    isHome() {
      return this.$route.name === "home";
    },
  },
};
</script>

<style scoped>
.todo-navbar {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 14px 28px,
    rgba(0, 0, 0, 0.02) 0px 10px 10px;
  padding-right: 10%;
  padding-left: 10%;
}
</style>
