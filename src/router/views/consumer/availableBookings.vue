<template>
  <div>
    <h3 class="page-title">
      <span class="link" @click="gotoBookings"> Booking List</span> >
      Availability
    </h3>
    <v-table
      :columns="columns"
      :items="availableMachines"
      :loading="tableloader"
    >
      <template #header>
        <th style="width:16.67%">
          Equipment Type
        </th>
        <th style="width:25%">
          Name
        </th>
        <th style="width:25%">
          Serial No.
        </th>
        <th style="width:16.67%">
          Price
        </th>
        <th class="text-center" style="width:16.67%">
          Actions
        </th>
      </template>

      <tr v-for="(el, i) in availableMachines" :key="i">
        <td>
          <span class="mobile-lable">Equipment Type</span>
          {{ el.machineType }}
        </td>
        <td class="mx-width">
          <span class="mobile-lable">Name</span>
          <div class="link" @click="showEquipment(el)">
            {{ el.equipmentName }}
          </div>
        </td>
        <td>
          <span class="mobile-lable">Serial No.</span>
          {{ el.serialNumber }}
        </td>
        <td>
          <span class="mobile-lable">Price</span>
          Kr {{ el.totalCost | locale }}
        </td>
        <td class="text-center">
          <span class="mobile-lable">Actions</span>
          <button type="button" class="orange-trans-btn" @click="onBook(el)"
            >Book Now</button
          >
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
    <small-modal id="confirmBooking">
      <template #header
        >Confirmation
      </template>
      <div>
        <div class="md-table">
          <table class="table-box">
            <tbody>
              <tr>
                <td class="bold">&emsp;&emsp;&emsp;Rental Cost</td>
                <td class="bold">Kr {{ rental | locale }}</td>
              </tr>
              <tr>
                <td>
                  &emsp;&emsp;&emsp;Repair Cost*
                </td>
                <td>Kr {{ aditionalCharges.repair | locale }} (3%) </td>
              </tr>
              <tr>
                <td>&emsp;&emsp;&emsp;Cleaning Fees* </td>
                <td>Kr {{ aditionalCharges.cleaning | locale }} (2%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style="color: #888888" class="mr-t20 text-center"
          >Note: Additional Charges* may be applicable</p
        >
      </div>

      <p class="mr-t20 text-center">Do you want to proceed ? </p>

      <template #buttons>
        <button
          type="button"
          class="black-btn pd-l60 pd-r60 "
          @click="bookMachine"
        >
          <span v-if="buttonLoader" class="fa fa-spinner fa-pulse mr-1"></span>
          Proceed</button
        >
      </template>
    </small-modal>
    <info-modal id="bookingConfirmed" @close="gotoBookings">
      <template #header
        >Booking Success
      </template>
      <h6>Your booking has been confirmed.</h6>
      <h6>Your Booking ID is #{{ orderId }} .</h6>
    </info-modal>
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
  </div>
</template>
<script>
import { consumerMethods } from '@state/helpers'

export default {
  page: {
    title: 'AvailableBookings',
    meta: [{ name: 'description', content: 'AvailableBookings' }],
  },
  components: {},
  data() {
    return {
      rental: 0,
      availableMachines: [],
      page: 1,
      totalPages: 1,
      params: {},
      columns: 5,
      tableloader: false,
      buttonLoader: false,
      machine: {
        machineId: null,
        startDate: JSON.parse(this.$route.query.data).startDate,
        totalDays: JSON.parse(this.$route.query.data).totalDays,
        totalAmount: 0,
      },
      aditionalCharges: {
        repair: 0,
        cleaning: 0,
      },
      orderId: null,
      machineDetails: null,
      imageBaseURL: process.env.VUE_APP_IMG_BASE_URL,
    }
  },
  async created() {
    this.params = JSON.parse(this.$route.query.data)
    await this.getList()
  },

  methods: {
    ...consumerMethods,
    async getList() {
      try {
        this.tableloader = true
        const res = await this.checkAvailability({ data: this.params })
        this.availableMachines = res.result.availableMachines
        this.totalPages = res.result.totalPages
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
    onBook(el) {
      this.machine.machineId = el.Id
      this.rental = el.totalCost
      this.aditionalCharges.repair = Math.floor((3 / 100) * this.rental)
      this.aditionalCharges.cleaning = Math.floor((2 / 100) * this.rental)
      const additionalFess =
        this.aditionalCharges.repair + this.aditionalCharges.cleaning
      this.machine.totalAmount = el.totalCost + additionalFess
      this.$jquery('#confirmBooking').modal({
        backdrop: 'static',
        keyboard: false,
      })
    },
    async bookMachine() {
      try {
        this.buttonLoader = true
        const response = await this.createBooking({ data: this.machine })
        this.buttonLoader = false
        this.orderId = response.result.orderId
        this.$jquery('#confirmBooking').modal('hide')
        setTimeout(() => {
          this.$jquery('#bookingConfirmed').modal({
            backdrop: 'static',
            keyboard: false,
          })
        }, 700)
      } catch (error) {
        this.buttonLoader = false
        this.$toasted.show(error)
      }
    },
    gotoBookings() {
      this.$jquery('#bookingConfirmed').modal('hide')
      this.$router.push({ name: 'consumer_bookings' })
    },
    showEquipment(el) {
      this.machineDetails = JSON.parse(JSON.stringify(el))
      this.$jquery('#equipmentDetails').modal('show')
    },
  },
}
</script>

<style scoped></style>
