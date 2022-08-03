<template>
  <div class="primary-div">
    <TaskList />
  </div>
</template>

<script>
import TaskList from "@/components/TaskList";

export default {
  name: "HomeView",
  components: {
    TaskList,
  },
};
</script>

<style scoped></style>
