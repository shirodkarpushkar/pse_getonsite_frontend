<template>
  <transition name="fade" mode="out-in">
    <RouterView :key="$route.fullPath" />
  </transition>
</template>
<script>
export default {
  page: {
    title: 'FullPage',
    meta: [{ name: 'description', content: 'FullPage' }],
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
