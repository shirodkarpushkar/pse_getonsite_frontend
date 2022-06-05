<template>
  <div>
    <div class="row align-items-center body-top-head">
      <div class="col-sm-12">
        <h3 class="page-title">
          Invoice List
        </h3>
      </div>
    </div>
    <v-table :columns="columns" :items="invoiceList" :loading="tableloader">
      <template #header>
        <th style="width:10%">
          Invoice ID
        </th>
        <th style="width:20%">
          Equipment Type
        </th>
        <th style="width:30%">
          Transaction Hash
        </th>
        <th style="width:20%">
          Serial No.
        </th>
        <th style="width:20%">
          Amount
        </th>
      </template>

      <tr v-for="(el, i) in invoiceList" :key="i">
        <td>
          <span class="mobile-lable">Invoice ID</span>
          # {{ el.Id }}
        </td>
        <td>
          <span class="mobile-lable">Equipment Type</span>
          {{ el.equipmentType }}
        </td>
        <td class="mx-width">
          <span class="mobile-lable">Transaction Hash</span>
          <a href="" @click.prevent="getHashDetails(el)">{{
            el.transactionHash
          }}</a>
        </td>
        <td>
          <span class="mobile-lable">Serial No.</span>
          {{ el.serialNumber }}
        </td>
        <td>
          <span class="mobile-lable">Amount</span>
          Kr {{ el.invoiceAmount | locale }}
        </td>
      </tr>
    </v-table>

    <div class="table-pagination">
      <paginate
        v-model="page"
        :page-count="totalPages"
        :margin-pages="0"
        :page-range="5"
        container-class="pagination"
        page-class="page-item"
        page-link-class="page-link-item"
        :disabled-class="'ignore disabled'"
        :click-handler="clickCallback"
      >
      </paginate>
    </div>
    <transaction-hash
      id="transactionDetails"
      :hash="hashDetails"
    ></transaction-hash>
    <loader v-if="hashloader"></loader>
  </div>
</template>
<script>
import { ownerMethods, generalMethods } from '@state/helpers'
import TransactionHash from '@components/transactionHash'

export default {
  page: {
    title: 'Invoices',
    meta: [{ name: 'description', content: 'Invoices' }],
  },
  components: { TransactionHash },
  data() {
    return {
      invoiceList: [],
      page: 1,
      totalPages: 1,
      params: {
        page: 1,
        itemsPerPage: 10,
      },
      columns: 5,
      tableloader: false,
      hashDetails: {},
      hashloader: false,
    }
  },
  created() {
    this.tableloader = true
    this.getList()
  },
  methods: {
    ...ownerMethods,
    ...generalMethods,
    async getList() {
      try {
        this.tableloader = true
        const res = await this.getOwnerInvoices({ data: this.params })
        this.invoiceList = res.data.invoiceList
        this.totalPages = res.data.totalPages
        this.tableloader = false
      } catch (error) {
        this.$toasted.show(error)
        this.tableloader = false
      }
    },
    clickCallback(page) {
      this.page = page
      this.params.page = this.page
      this.getList()
    },
    async getHashDetails(el) {
      try {
        this.hashloader = true
        const data = {
          readType: 'Invoice',
          transactionHash: el.transactionHash,
        }
        const response = await this.getTransactionDetails({ data })
        this.hashDetails = response.result
        this.$jquery('#transactionDetails').modal('show')
        this.hashloader = false
      } catch (error) {
        this.hashloader = false

        this.$toasted.show(error)
      }
    },
  },
}
</script>

<style scoped></style>
