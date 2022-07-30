<template>
  <div id="app" class="content">
    <TopBar/>
    <router-view/>
  </div>
</template>

<script>

import TopBar from '@/components/TopBar'

export default {
  components: {
    TopBar
  }
}
</script>

<style>
  html,
  body,
  .content {
    background-color: rgb(238, 238, 238);
    height: 100%;
    width: 100%;
  }

  .primary-div {
    height: calc(100% - 56px);
    background-color: rgb(238, 238, 238);
  }

</style>
