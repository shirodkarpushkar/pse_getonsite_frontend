<template>
  <div
    class="modal modal-design fade"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog  modal-dialog-scrollable ">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-head">
            <h5 id="staticBackdropLabel" class="modal-title"
              ><slot name="header"></slot
            ></h5>
            <button
              type="button"
              class="close modal-close"
              data-dismiss="modal"
              aria-label="Close"
            >
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
          <div class="modal-form mr-t20 mr-b20 text-center">
            <p><slot></slot></p>
          </div>
          <div class="modal-bottom text-center">
            <button
              class="info-btn pd-l30 pd-r30 mr-2"
              data-dismiss="modal"
              @click="confirm"
              >YES</button
            >
            <button class="danger-btn  pd-l30 pd-r30 " data-dismiss="modal">
              NO
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  page: {
    title: 'ConfirmModal',
    meta: [{ name: 'description', content: 'ConfirmModal' }],
  },
  components: {},
  data() {
    return {}
  },
  created() {},

  methods: {
    confirm() {
      this.$emit('confirm')
    },
  },
}
</script>

<style scoped>
.modal-form p {
  font-size: 1.2rem;
}
</style>
