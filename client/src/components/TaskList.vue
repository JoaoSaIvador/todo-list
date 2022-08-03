<template>
  <b-container class="h-100 d-flex align-items-center">
    <b-container
      class="page-content bg-light d-flex flex-column align-items-center py-5 px-5"
    >
      <h1 style="color: #252727">Tasks</h1>
      <b-form
        @submit.prevent="createTask"
        class="w-100 my-4 d-flex flex-row justify-content-around align-items-center"
      >
        <input
          v-model="taskText"
          placeholder="Enter your task"
          class="me-2 search-bar form-control bg-light"
        />
        <a
          @click.prevent="createTask"
          class="createTask d-flex align-items-center justify-content-center"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
        </a>
      </b-form>
      <div class="w-100 d-flex flex-column align-items-center scroll">
        <Task
          v-for="(task, index) in tasks"
          :key="index"
          :task="task"
          @removeTask="removeTask"
        />
      </div>
    </b-container>
  </b-container>
</template>

<script>
import axios from "axios/dist/axios";
import Task from "@/components/Task";

export default {
  name: "TaskList",
  components: {
    Task,
  },
  data() {
    return {
      taskText: "",
      tasks: [],
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    createTask(event) {
      if (this.taskText != "") {
        axios({
          url: "http://localhost:4000",
          method: "post",
          data: {
            query: `
              mutation ($task: TaskInput) {
                newTask: createTask(task: $task) {
                  text
                  done
                }
              }
            `,
            variables: {
              task: {
                text: this.taskText,
                done: false,
              },
            },
          },
        }).then(() => {
          this.getTasks();
        });

        this.taskText = "";
      }
    },
    getTasks() {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
            {
              getTasks {
                id
                text
                done
              }
            }
          `,
        },
      }).then((response) => {
        this.tasks = response.data.data.getTasks;
      });
    },
    removeTask(task) {
      axios({
        url: "http://localhost:4000",
        method: "post",
        data: {
          query: `
            mutation ($id: ID) {
              removeTask(ID: $id)
            }
          `,
          variables: {
            id: task.id,
          },
        },
      }).then(() => {
        this.tasks.splice(this.tasks.indexOf(task), 1);
      });
    },
  },
};
</script>

<style scoped>
.page-content {
  width: 500px;
  height: 83%;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 14px 28px,
    rgba(0, 0, 0, 0.05) 0px 10px 10px;
}

.scroll {
  max-height: 510px;
  overflow-x: hidden;
  overflow-y: auto;
}

.scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 16px 16px transparent;
  border: solid 6px transparent;
}

.scroll::-webkit-scrollbar {
  width: 16px;
}

.scroll::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 16px 16px #252727;
  border: solid 6px transparent;
  border-radius: 16px;
}

.search-bar {
  border-radius: 0px;
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  border-bottom: 2px solid #252727;
  width: 85%;
}

.form-control:focus {
  border-color: #252727;
  box-shadow: none;
}

.createTask {
  background-color: white;
  border-radius: 50%;
  color: #252727;
  width: 38px;
  height: 38px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 5px 10px, rgba(0, 0, 0, 0.02) 0px 5px 5px;
}

.createTask:hover {
  background-color: #252727;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 15px 15px,
    rgba(0, 0, 0, 0.04) 0px 15px 15px;
}
</style>
