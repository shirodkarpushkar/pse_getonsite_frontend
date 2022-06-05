<template>
  <div id="app">
    <RouterView :key="$route.fullPath" />
  </div>
</template>
<script>
import appConfig from '@src/app.config'

export default {
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
}
</script>

<!-- This should generally be the only global CSS in the app. -->
<style lang="scss">
@import '~nprogress/nprogress.css';
@import '@design';
@import '@assets/scss/bootstrap.scss';
@import './assets/css/style.css';
#nprogress .bar {
  background: $color-link-text;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
