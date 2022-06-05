<template>
  <transition v-if="open" name="fade">
    <div class="cusmodal cusmodal-design ">
      <div
        class="cusmodal-dialog  cusmodal-dialog-scrollable "
        :class="{
          'cusmodal-lg': size == 3,
          'cusmodal-md': size == 2,
          'cusmodal-sm': size == 1
        }"
      >
        <div class="cusmodal-content">
          <div class="cusmodal-body">
            <div class="cusmodal-head">
              <h5 id="staticBackdropLabel" class="cusmodal-title"
                ><slot name="header"> </slot>
              </h5>
              <button type="button" class="close cusmodal-close" @click="close">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 28C6.2803 28 0 21.7197 0 14C0 6.2803 6.2803 0 14 0C21.7197 0 28 6.2803 28 14C28 21.7197 21.7197 28 14 28ZM14 1.99994C7.38324 1.99994 1.99994 7.38324 1.99994 14C1.99994 20.6168 7.38324 26.0001 14 26.0001C20.6168 26.0001 26.0001 20.6168 26.0001 14C26.0001 7.38324 20.6168 1.99994 14 1.99994Z"
                    fill="#A3A3A3"
                  />
                  <path
                    d="M19 20C18.7441 20 18.4882 19.9024 18.2929 19.707L8.29304 9.70705C7.90232 9.31633 7.90232 8.68358 8.29304 8.29308C8.68354 7.90258 9.31651 7.90236 9.70701 8.29308L19.7069 18.293C20.0976 18.6837 20.0976 19.3165 19.7069 19.707C19.5117 19.9024 19.256 20 19 20Z"
                    fill="#A3A3A3"
                  />
                  <path
                    d="M8.99992 20C8.744 20 8.48829 19.9024 8.29304 19.7069C7.90232 19.3164 7.90232 18.6834 8.29304 18.2929L18.2929 8.29304C18.6837 7.90232 19.3164 7.90232 19.7069 8.29304C20.0974 8.68354 20.0976 9.31651 19.7069 9.70701L9.70701 19.7069C9.51176 19.9024 9.25584 20 8.99992 20Z"
                    fill="#A3A3A3"
                  />
                </svg>
              </button>
            </div>
            <div class="cusmodal-form mr-t20 mr-b20">
              <slot></slot>
            </div>
            <div class="cusmodal-bottom text-center">
              <slot name="buttons"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  page: {
    title: 'CusModal',
    meta: [{ name: 'description', content: 'CusModal' }],
  },
  components: {},
  props: {
    size: {
      type: Number,
      default: () => 2,
    },
    centered: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
    }
  },
  created() {},
  methods: {
    show() {
      this.open = true
    },
    close() {
      this.open = false
    },
  },
}
</script>

<style scoped>
.cusmodal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

}

.cusmodal-body {
  padding: 20px 40px;
}

.cusmodal-head h5 {
  font-size: 18px;
  color: #404040;
  text-align: center;
  font-family: Saira-SemiBold;
}
.cusmodal-head .cusmodal-close {
  position: absolute;
  right: 20px;
  top: 18px;
}
.cusmodal-close:hover svg path {
  fill: #000000;
}
.cusmodal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 0px;
  border-radius: 0px;
}
.cusmodal-dialog {
  left: auto;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 576px) {
  .cusmodal-dialog {
    margin: 1.75rem auto;
  }
}
@media (min-width: 576px) {
  .cusmodal-sm {
    max-width: 400px;
  }
}
@media (min-width: 576px) {
  .cusmodal-md {
    max-width: 640px;
  }
}
@media (min-width: 576px) {
  .cusmodal-lg {
    max-width: 80rem;
  }
}
.dialog-centered {
  display: flex;

  align-items: center;
  min-height: calc(100% - 1rem);
}
</style>
