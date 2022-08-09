<template>
  <div
    class="w-100 px-3 py-2 my-2 d-flex flex-row flex-wrap justify-content-between align-items-center task-content"
  >
    <label
      @click.self="task.done = !task.done"
      class="d-flex flex-row justify-content-start align-items-center"
    >
      <input v-model="task.done" type="checkbox" class="me-2 custom-checkbox" />
      <span :class="task.done === true ? 'done' : ''">{{ task.text }}</span>
    </label>
    <a
      @click.prevent="$emit('removeTask', task)"
      class="deleteTask d-flex align-items-center justify-content-center"
    >
      <font-awesome-icon icon="fa-solid fa-trash-can" style="" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
  },
};
</script>

<style scoped>
.task-content {
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 5px 10px, rgba(0, 0, 0, 0.02) 0px 5px 5px;
}

.custom-checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid #252727 !important;
  border-radius: 50% !important;
  background-size: 0;
  background-image: url("../assets/check.svg");
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.2s;
  appearance: none;
}

.custom-checkbox:checked {
  background-size: 60%;
  background-color: #252727;
}

.done {
  text-decoration: line-through;
}

.deleteTask {
  width: 28px;
  height: 28px;
  color: #252727;
}

.deleteTask:hover {
  background-color: #252727;
  border-radius: 50%;
  color: white;
}
</style>
