<template>
  <div class="primary-div">
    <TaskList />
  </div>
</template>

<script>
import axios from "axios/dist/axios";
import TaskList from "@/components/TaskList";

export default {
  components: {
    TaskList,
  },
};
</script>

<style scoped></style>
