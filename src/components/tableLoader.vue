<template>
  <div class="tableclass">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.tableclass {
  display: flex;
  height: 50vh;
  align-items: center;
  justify-content: center;
}

.spinner {
  margin: 0 auto;
  height: 64px;
  width: 64px;
  animation: rotate 0.8s infinite linear;
  border: 5px solid #ffe295;
  border-right-color: transparent;
  border-radius: 50%;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
