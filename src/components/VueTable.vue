<template>
  <div class="cus-color-table table-responsive mr-t10">
    <table class="table">
      <thead>
        <slot name="header"></slot>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr>
            <td :colspan="columns">
              <table-loader></table-loader>
            </td>
          </tr>
        </template>
        <template v-if="!loading">
          <slot></slot>
        </template>
        <template v-if="!items.length && !loading">
          <tr>
            <td :colspan="columns">
              <div class="lead">No records found</div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  page: {
    title: 'VueTable',
    meta: [{ name: 'description', content: 'VueTable' }],
  },
  components: {},
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Number,
      default: () => 1,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>

<style scoped></style>
