<template>
  <div>
    <div class="row align-items-center body-top-head">
      <div class="col-sm-12">
        <h3 class="page-title">
          Booking List
        </h3>
      </div>
    </div>

    <v-table :columns="columns" :items="bookingsList" :loading="tableloader">
      <template #header>
        <th style="width:10%">
          Booking ID
        </th>
        <th style="width:20%">
          Equipment Name
        </th>
        <th style="width:30%">
          Transaction Hash
        </th>
        <th style="width:20%">
          Start Date
        </th>
        <th style="width:20%">
          End Date
        </th>
      </template>

      <tr v-for="(el, i) in bookingsList" :key="i">
        <td>
          <span class="mobile-lable">Booking ID</span>
          # {{ el.Id }}
        </td>
        <td>
          <span class="mobile-lable">Equipment Name</span>
          <div class="link" @click="showEquipment(el)">
            {{ el.equipmentName }}
          </div>
        </td>

        <td>
          <span class="mobile-lable">Transaction Hash</span>
          <a href="" @click.prevent="getHashDetails(el)">{{
            el.transactionHash
          }}</a>
        </td>
        <td>
          <span class="mobile-lable">Start Date</span>
          {{ el.startDate | MMDDYYYY }}
        </td>
        <td>
          <span class="mobile-lable">End Date</span>
          {{ el.endDate | MMDDYYYY }}
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
    <form-modal id="equipmentDetails">
      <template #header
        >Equipment Details
      </template>
      <div v-if="machineDetails" class="img-container mr-b20">
        <img
          :src="imageBaseURL + machineDetails.imageName"
          alt=""
          class="img-fit"
        />
      </div>
      <div v-if="machineDetails" class="md-table mr-b20 pd-l50">
        <table class="table-box">
          <tbody>
            <tr>
              <td style="width:50%;color:#000;">
                Equipment Name
              </td>
              <td style="width:50%"> {{ machineDetails.equipmentName }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> Equipment Type </td>
              <td style="width:50%"> {{ machineDetails.equipmentType }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> Weight ( Tons ) </td>
              <td style="width:50%"> {{ machineDetails.equipmentWeight }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> Edition </td>
              <td style="width:50%"> {{ machineDetails.edition }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> Serial No. </td>
              <td style="width:50%"> {{ machineDetails.serialNumber }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> level Of Condition </td>
              <td style="width:50%"> {{ machineDetails.levelOfCondition }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> Location </td>
              <td style="width:50%"> {{ machineDetails.location }} </td>
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
    title: 'Bookings',
    meta: [{ name: 'description', content: 'Bookings' }],
  },
  components: { TransactionHash },
  data() {
    return {
      bookingsList: [],
      page: 1,
      totalPages: 1,
      params: {
        page: 1,
        itemsPerPage: 10,
      },
      columns: 6,
      tableloader: false,
      hashDetails: {},
      hashloader: false,
      machineDetails: null,
      imageBaseURL: process.env.VUE_APP_IMG_BASE_URL,
    }
  },
  async created() {
    this.tableloader = true
    await this.getList()
  },
  methods: {
    ...ownerMethods,
    ...generalMethods,
    async getList() {
      try {
        this.tableloader = true
        const res = await this.getOwnerBookings({ data: this.params })
        this.bookingsList = res.data.bookingsList
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
          readType: 'Booking',

          transactionHash: el.transactionHash,
        }
        const response = await this.getTransactionDetails({ data })
        this.hashDetails = response.data
        this.$jquery('#transactionDetails').modal('show')
        this.hashloader = false
      } catch (error) {
        this.hashloader = false

        this.$toasted.show(error)
      }
    },
    showEquipment(el) {
      this.machineDetails = JSON.parse(JSON.stringify(el))
      this.$jquery('#equipmentDetails').modal('show')
    },
  },
}
</script>

<style scoped></style>
