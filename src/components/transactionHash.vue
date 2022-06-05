<template>
  <form-modal ref="Hashdetails">
    <template #header
      >Transaction Hash Details
    </template>

    <div class="md-table mr-b20">
      <table class="table-box">
        <tbody>
          <tr>
            <td style="width:30%;color:#000;">
              Block Number
            </td>
            <td style="width:70%"> {{ hash.Block_number }} </td>
          </tr>
          <tr>
            <td style="width:30%;color:#000;"> Contract Address </td>
            <td style="width:70%"> {{ hash.ContractAddress }} </td>
          </tr>
          <tr>
            <td style="width:30%;color:#000;"> Data </td>
            <td style="width:70%"> {{ hash.Data }} </td>
          </tr>
          <tr v-for="(val, key) in hash.value" :key="key">
            <td style="width:30%;color:#000;"> {{ key | capitalise }} </td>
            <td style="width:70%"> {{ val }} </td>
          </tr>
          <tr>
            <td style="width:30%;color:#000;"> Transaction Fees </td>
            <td style="width:70%">
              {{ hash.Transaction_fees ? hash.Transaction_fees : 0 }}
            </td>
          </tr>
          <tr>
            <td style="width:30%;color:#000;"> Time Stamp </td>
            <td style="width:70%">
              {{ (hash.timestamp * 1000) | dateTime }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <template #buttons>
      <button
        type="button"
        class="black-btn pd-l60 pd-r60 "
        data-dismiss="modal"
      >
        OK</button
      >
    </template>
  </form-modal>
</template>
<script>
export default {
  page: {
    title: 'TransactionHash',
    meta: [{ name: 'description', content: 'TransactionHash' }],
  },
  components: {},
  props: {
    hash: {
      type: Object,
      default: () => {
        return {
          RPC_endpoint:
            'https://afoofaadmin.blockchain.azure.com:3200/uXac9s4FwwN2OQiUrjiEsbWS',
          txid:
            '0x25805ed1fa007e9e9a42b49eee4545533f538b0965cf289ef27afdcaa4808b5a',
          Contract_address: '0xDd8aB405D0083cACD2563E8Edc162BE3BaEbB340',
          From: '0x26ac5cD5fb34d468a25ab46fE774A3e8E81A4591',
          Transaction_fees: 0,
          Block_number: 1463,
          timestamp: 1600357187,
          Data:
            '0xc07c3da60000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001',
          channel_id: '',
          key: '2',
          value: {},
          is_delete: '',
        }
      },
    },
  },
  data() {
    return {}
  },

  methods: {},
}
</script>

<style scoped></style>
